__version__ = "0.5"
function searchable_setup($identifier) {
  // create and add the filter form to the identifier (before computing the cache for searching)
  // > TODO > styles should be moved to common.css after beta tests
  var $form = $("<form>").attr({"id":"searchable_form", "action":"#", "style":"padding: 3px;background: #ff9;"}),
      $label = $("<label for='searchable_input' style='font-weight:bold'>Search this page: </label>"),
      $input = $("<input>").attr({"id":"searchable_input", "type":"text"}),
      $span = $("<span style='color:gray'> (this is a beta feature) <i id='searchable_loading'>Loading...</i></span>"),
      $comment = $("<!--searchable_ignore_start-->")
  $identifier.after($comment).after($form.append($label).append($input).append($span))
  // read variables from divs (since data-* does not work on wikia)
  var outline_separator = $("#searchable_outline_separator").text(),
      outline_separator_parent = $("#searchable_outline_separator_parent").text(),
      search_in = $("#searchable_search_in").text(),
      $WikiArticle = $("#WikiaArticle"),
      $toc = $("#toc *"), // table of contents elements to be excluded from search
      $separator,
      $search_in,
      $blocks,
      $parents,
      $ignored,
      show_all = true,
      data = [],
      $temp
  
  // create outline elements to be searched on $input.keyup() - inspired by http://www.w3.org/TR/html5/sections.html#outlines
  if (outline_separator_parent) {
      $separator = $WikiArticle.find( outline_separator_parent ).not($toc)
      $separator.first().before("<!--searchable_end-->")
      $separator.slice(1).before("<!--searchable_end--><!--searchable_parent_end-->")
      $separator.before("<!--searchable_parent_start-->")
      $WikiArticle.append("<!--searchable_parent_end-->")
      $WikiArticle.html($WikiArticle.html()
          .replace(/<!--searchable_parent_start-->/g, "<div class='searchable_parent'>")
          .replace(/<!--searchable_parent_end-->/g, "</div>")
      )
      $parents = $WikiArticle.find( "div.searchable_parent" )
  }
  if (outline_separator) {
      $separator = $WikiArticle.find( outline_separator ).not($toc)
      if (outline_separator_parent) {
          $parents.each( function () {
              $(this).find( outline_separator ).slice(1).before("<!--searchable_end-->")
          })
      } else {
          $separator.before("<!--searchable_end-->")
      }
      $separator.before("<!--searchable_start-->")
      $WikiArticle.append("<!--searchable_end-->")
      $WikiArticle.html($WikiArticle.html()
          .replace(/<!--searchable_ignore_start-->/g, "<div class='searchable_ignore'>") // this was inserted by $identifier.after(...)
          .replace(/<!--searchable_start-->/g, "<div class='searchable_block'>")
          .replace(/<!--searchable_end-->/g, "</div>")
      )
      $blocks = $WikiArticle.find( "div.searchable_block" )
      $search_in = (search_in) ? $WikiArticle.find(search_in) : $blocks
  } else {
      if (!search_in) {
          search_in = "p, dl, pre"
      }
      if (!outline_separator_parent) {
          $temp = $WikiArticle.find(search_in).first().parentsUntil($WikiArticle)
          if ($temp.length) {
              $temp.before("<!--searchable_end-->")
          } else {
              $WikiArticle.find(search_in).first().before("<!--searchable_end-->")
          }
          
      }
      $WikiArticle.html($WikiArticle.html()
          .replace(/<!--searchable_ignore_start-->/g, "<div class='searchable_ignore'>") // this was inserted by $identifier.after(...)
          .replace(/<!--searchable_end-->/g, "</div>")
      )
      $search_in = $WikiArticle.find(search_in)
      $blocks = $search_in
  }
  
  // cache of lowercase text inside $search_in elements
  $search_in.each( function () {
      // TODO - add alt values from the big images on [[Production_Chains]] to the data
      data.push($(this).text().toLowerCase())
  })
  data_length = data.length
  
  // replace jQuery objects lost after manipulating DOM
  $form = $("#searchable_form")
  $input = $("#searchable_input")
  $parents = $WikiArticle.find( "div.searchable_parent" )
  $ignored = $WikiArticle.find( "div.searchable_ignore" )
  
  // add event handlers to filter list elements
  $input.keyup( function () {
      var search_for = this.value.toLowerCase(),
          filter = new RegExp( search_for ),
          $found,
          $found_blocks,
          $found_parents
      if (search_for) {
          if(show_all) {
              $ignored.hide()
              show_all = false
          }
          $found = $search_in.map( function (i) {
              if (data[i].search(filter) != -1) {
                  return this
              }
          })
          if (outline_separator && search_in) {
              $found_blocks = $found.parents($blocks)
          } else {
              $found_blocks = $found
          }
          $found_blocks.show()
          $blocks.not($found_blocks).hide()
          if (outline_separator_parent) {
              $found_parents = $found.parents($parents)
              $found_parents.show()
              $parents.not($found_parents).hide()
          }
      } else {
          $ignored.show()
          $parents.show()
          $blocks.show()
          show_all = true
      }
      return false
  }).focus( function () {
      $input.select()
  }).click( function () {
      // prevent bubling up to $form.click() = $input.select() while placing cursor by clicking
      return false
  })
  $form.submit( function () {
      // update hash string in url (to copy & paste links to this search)
      var search_for = $input.val().toLowerCase()
      if (search_for.search(/^[a-z]/) != -1) {
          location.hash = search_for
      } else {
          location.hash = null
      }
      return false
  }).click( function () {
      $input.select()
  })
  
  // search for /something_that_is_not_an_ID/ for urls like example.com/mypage#something_that_is_not_an_ID
  hashchange_handler()
  window.onhashchange = hashchange_handler
  $input.select()
  
  // remove "Loading..." text
  $("#searchable_loading").remove()
}
function hashchange_handler () {
  var hash = location.hash,
      $input = $("#searchable_input")
  if (hash) {
      if (!$(hash).length) {
          hash = hash.slice(1).replace(/\//g, "\\")
              .replace(".2A","*") // wikia has a custom escapeURI ...
              .replace(".2B","+")
              .replace(".2F","/")
              .replace(".3F","?")
              .replace(".5C","\\")
          $input.val(hash).keyup()
          $(window).scrollTop(150)
      }
  }
 }

// run the code when document is ready and there is a <div id="searchable_page_identifier"> on the page
$( function () {
  var $identifier = $("#searchable_page_identifier")
  if ($identifier.length) {
    searchable_setup($identifier)
  }
})
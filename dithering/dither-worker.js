class DitherPainter {
  paint(ctx, geometry, properties) {
    let r,
      g,
      b,
      step = 1;
    for (let x = 0; x < geometry.width; x += step) {
      for (let y = 0; y < geometry.height; y += step) {
        r = Math.random() * 255;
        g = Math.random() * 255;
        b = Math.random() * 255;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.01)`;
        ctx.fillRect(x, y, step, step);
      }
    }
  }
}

registerPaint("dither", DitherPainter);

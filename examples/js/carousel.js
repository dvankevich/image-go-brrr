class Carousel {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      console.error(
        `Container with selector "${containerSelector}" not found.`
      );
      return;
    }

    this.wrapContents();
  }

  wrapContents() {
    const frame = document.createElement('div');
    frame.className = 'carousel-frame';

    const strip = document.createElement('div');
    strip.className = 'carousel-strip';

    const children = Array.from(this.container.children);

    children.forEach((child) => {
      strip.appendChild(child);
    });

    frame.appendChild(strip);

    this.container.innerHTML = '';
    this.container.appendChild(frame);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const myCarousel = new Carousel('#my-carousel');
});

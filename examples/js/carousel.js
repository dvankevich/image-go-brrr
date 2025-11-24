class Carousel {
  constructor(containerSelector, options = {}) {
    const defaultOptions = {
      autoplay: true,
      interval: 2000,
      loop: true,
    };
    this.options = { ...defaultOptions, ...options };

    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      console.error(
        `Container with selector "${containerSelector}" not found.`
      );
      return;
    }

    this.isTransitioning = false;

    this.wrapContents();
    this.originalCount = this.strip.children.length;
    this.setupClones();
    this.currentIndex = 1;
    this.autoplayInterval = null;

    this.goToSlide(this.currentIndex, false);

    this.boundTransitionEndHandler = this.handleTransitionEnd.bind(this);
    this.boundMouseEnterHandler = this.handleMouseEnter.bind(this);
    this.boundMouseLeaveHandler = this.handleMouseLeave.bind(this);
    this.boundDotsClickHandler = this.handleDotsClick.bind(this);

    this.strip.addEventListener(
      'transitionend',
      this.boundTransitionEndHandler
    );

    this.container.addEventListener('mouseenter', this.boundMouseEnterHandler);
    this.container.addEventListener('mouseleave', this.boundMouseLeaveHandler);

    this.setupDots();
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  createBlock(tagName, className) {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
  }

  wrapContents() {
    const frame = this.createBlock('div', 'carousel-frame');

    const strip = this.createBlock('div', 'carousel-strip');

    const children = Array.from(this.container.children);

    children.forEach((child) => {
      strip.appendChild(child);
    });

    frame.appendChild(strip);

    this.container.innerHTML = '';
    this.container.appendChild(frame);

    this.strip = strip;
    this.frame = frame;
  }

  setupClones() {
    const first = this.strip.children[0];
    const last = this.strip.children[this.strip.children.length - 1];

    const firstClone = first.cloneNode(true);
    const lastClone = last.cloneNode(true);

    this.strip.appendChild(firstClone);
    this.strip.insertBefore(lastClone, first);
  }

  goToSlide(index, withAnimation = true) {
    if (!this.strip) {
      console.error('Strip element not found. Was it initialized?');
      return;
    }

    if (withAnimation) {
      this.strip.style.transition = 'transform 0.5s ease-in-out';
    } else {
      this.strip.style.transition = 'none';
    }

    this.strip.style.transform = `translateX(-${100 * index}%)`;
  }

  handleTransitionEnd() {
    if (this.currentIndex === this.originalCount + 1) {
      if (this.options.loop) {
        this.currentIndex = 1;
        this.goToSlide(this.currentIndex, false);
      } else {
        this.currentIndex = this.originalCount;
        this.goToSlide(this.currentIndex, false);
        this.stopAutoplay();
      }
      this.isTransitioning = false;
      return;
    }

    if (this.currentIndex === 0) {
      if (this.options.loop) {
        this.currentIndex = this.originalCount;
        this.goToSlide(this.currentIndex, false);
      } else {
        this.currentIndex = 1;
        this.goToSlide(this.currentIndex, false);
        this.stopAutoplay();
      }
      this.isTransitioning = false;
      return;
    }

    this.isTransitioning = false;
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.stopAutoplay();
    this.isTransitioning = true;
    this.currentIndex++;
    this.goToSlide(this.currentIndex);
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  prevSlide() {
    if (this.isTransitioning) return;
    this.stopAutoplay();
    this.isTransitioning = true;
    this.currentIndex--;
    this.goToSlide(this.currentIndex);
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  setupDots() {
    const dotsContainer = this.createBlock('div', 'carousel-dots');
    for (let i = 0; i < this.originalCount; i++) {
      const dots = this.createBlock('button', 'dots-nav');
      dots.dataset.index = `${i}`;
      dots.textContent = 'brr';
      dotsContainer.appendChild(dots);
    }
    this.container.appendChild(dotsContainer);

    this.dotsContainer = dotsContainer;
    dotsContainer.addEventListener('click', this.boundDotsClickHandler);
  }

  handleDotsClick(e) {
    if (e.target.classList.contains('dots-nav')) {
      if (this.isTransitioning) return;

      const dotIndex = parseInt(e.target.dataset.index, 10);
      const targetIndex = dotIndex + 1;

      if (targetIndex === this.currentIndex) return;

      this.stopAutoplay();
      this.isTransitioning = true;
      this.currentIndex = targetIndex;
      this.goToSlide(this.currentIndex);
      if (this.options.autoplay) {
        this.startAutoplay();
      }
    }
  }

  startAutoplay() {
    if (this.autoplayInterval !== null) {
      return;
    }

    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.options.interval);
  }

  stopAutoplay() {
    if (this.autoplayInterval !== null) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }

  handleMouseEnter() {
    if (this.options.autoplay) {
      this.stopAutoplay();
    }
  }

  handleMouseLeave() {
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  destroy() {
    this.stopAutoplay();

    if (this.strip && this.boundTransitionEndHandler) {
      this.strip.removeEventListener(
        'transitionend',
        this.boundTransitionEndHandler
      );
    }

    if (this.container) {
      this.container.removeEventListener(
        'mouseenter',
        this.boundMouseEnterHandler
      );
      this.container.removeEventListener(
        'mouseleave',
        this.boundMouseLeaveHandler
      );
    }

    if (this.dotsContainer && this.boundDotsClickHandler) {
      this.dotsContainer.removeEventListener(
        'click',
        this.boundDotsClickHandler
      );
    }

    this.container = null;
    this.strip = null;
    this.frame = null;
    this.dotsContainer = null;
  }
}

const carousel1 = new Carousel('#my-carousel');

document.getElementById('wrapper').addEventListener('click', (e) => {
  if (e.target.closest('button')) {
    const action = e.target.dataset.action;

    if (action === 'prev') {
      carousel1.prevSlide();
    } else if (action === 'next') {
      carousel1.nextSlide();
    }
  }
});

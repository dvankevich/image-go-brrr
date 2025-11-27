# Image Carousel

## A lightweight, zero-dependency image carousel built with pure Vanilla JavaScript. It provides seamless image cycling with support for autoplay, navigation arrows, and dot indicators, without any bloated frameworks.

[![Demo](https://img.shields.io/badge/Demo-CodePen-black?style=flat-square&logo=codepen)](https://codepen.io/LIGECT/pen/emZrGYG)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/image-go-brrr.svg?style=flat-square)](https://www.npmjs.com/package/image-go-brrr)

## Why This Exists

Because most carousel libraries are overengineered garbage that brings in half of npm just to slide some images. This one does the job without the drama.

## Features

- **Zero Dependencies** — No jQuery, no React, no nothing. Just JavaScript.
- **Autoplay** — Slides advance automatically (configurable interval)
- **Navigation** — Arrow buttons and dot indicators
- **Infinite Loop** — Seamless cycling with cloned slides
- **Pause on Hover** — Autoplay stops when you hover over it
- **Responsive** — Works on whatever screen you throw at it
- **Customizable** — CSS variables for easy styling
- **Lightweight** — Minuscule footprint, fast as hell

## Installation

```bash
npm install image-go-brrr
```

Or if you're into that Yarn life:

```bash
yarn add image-go-brrr
```

## Usage

### HTML

```html
<div class="carousel">
  <img src="image1.jpg" alt="Slide 1" />
  <img src="image2.jpg" alt="Slide 2" />
  <img src="image3.jpg" alt="Slide 3" />
</div>
```

### JavaScript

```javascript
import Carousel from 'image-go-brrr';
import 'image-go-brrr/dist/carousel.css'; // Don't forget the styles

const carousel = new Carousel('.carousel', {
  autoplay: true,
  interval: 3000,
  loop: true,
});
```

**Or if you prefer to include CSS separately in HTML:**

```html
<link rel="stylesheet" href="node_modules/image-go-brrr/dist/carousel.css" />
```

That's it. You're done.

## Configuration Options

| Option   | Type    | Default | Description                       |
| -------- | ------- | ------- | --------------------------------- |
| autoplay | boolean | true    | Enable/disable autoplay           |
| interval | number  | 3000    | Autoplay interval in milliseconds |
| loop     | boolean | true    | Enable/disable infinite loop      |

## Examples

### Default settings

```javascript
import Carousel from 'image-carousel';
const carousel = new Carousel('#my-carousel');
```

### No autoplay

```javascript
const carousel = new Carousel('#my-carousel', { autoplay: false });
```

### No looping

```javascript
const carousel = new Carousel('#my-carousel', { loop: false });
```

### Slower autoplay

```javascript
const carousel = new Carousel('#my-carousel', { interval: 5000 });
```

## Styling

The carousel uses CSS custom properties for easy customization. Override these in your stylesheet:

```css
:root {
  --carousel-width: 100%;
  --carousel-height: 500px;
  --arrow-size: 2.5rem;
  --arrow-color: rgba(255, 255, 255, 0.8);
  --arrow-bg: rgba(0, 0, 0, 0.3);
  --dots-size: 8px;
  --dots-color: rgba(255, 255, 255, 0.4);
  --dots-active-color: #ffffff;
}
```

## API

The `Carousel` instance exposes several methods for manual control and cleanup.

### Methods

#### `nextSlide()`

Moves the carousel forward to the next slide.

This method handles transitioning, pauses autoplay temporarily, and updates the active dot indicator.

```javascript
carousel.nextSlide();
```

#### `prevSlide()`

Moves the carousel backward to the previous slide.

This method handles transitioning, pauses autoplay temporarily, and updates the active dot indicator.

```javascript
carousel.prevSlide();
```

#### `startAutoplay()`

Starts the automatic rotation of slides if the `autoplay` option is enabled.

This method is automatically called when the carousel is initialized (if `autoplay: true`).

```javascript
// Start autoplay manually after a user interaction
carousel.startAutoplay();
```

#### `stopAutoplay()`

Stops the automatic rotation of slides.

This is useful for implementing custom controls or pausing the carousel indefinitely.

```javascript
// Stop autoplay until further notice
carousel.stopAutoplay();
```

#### `destroy()`

Cleans up event listeners and stops autoplay. Use this method to safely remove the carousel instance from memory and prevent leaks when the element is no longer needed (e.g., when navigating away from a page in an SPA).

```javascript
carousel.destroy();
```

## Browser Support

Works in all modern browsers. If you're still supporting IE11, that's your problem, not mine.

## Contributing

Found a bug? Open an issue. Want to add a feature? Submit a PR. Just keep it simple and don't overcomplicate shit.

## Author

GitHub: [@LIGECT](https://github.com/LIGECT)

Email: ligect@gmail.com

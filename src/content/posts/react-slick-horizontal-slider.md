---
title: "React Slick Horizontal Slider"
pubDate: 2024-01-09
description: "A practical guide on developing an efficient, responsive horizontal scroll slider using React Slick, tailored for modern web projects."
author: "Andrew Riefenstahl"
image:
  url: "../../assets/images/react-slick-horizontal-slider.jpg"
  alt: "Illustration of a responsive horizontal slider in action."
tags:
  [
    "React",
    "web development",
    "React Slick",
    "UI components",
    "Gatsby",
    "Nextjs",
  ]
---

## Introduction

Working in a startup often requires adaptability and creative solutions, especially in web development. A common feature that has continually resurfaced in my projects is the need for a horizontal scroll slider. Despite the prevalence of various libraries and frameworks, finding a straightforward, vanilla CSS-based solution has been challenging. Today, I tackled this issue head-on for a landing page that featured multiple information cards. To avoid extensive vertical scrolling, I turned to an old ally: React Slick.

## The Challenge

The primary challenge was incorporating a horizontal scroll slider that is both efficient and aesthetically pleasing. After a thorough online search for a vanilla CSS solution yielded no satisfying results, I decided to create my own using React Slick. This library, while having decent documentation, often presents quirky challenges, especially when dealing with logo carousels and maintaining aspect ratios.

## Installing React Slick

To incorporate React Slick into your project, start by installing it through NPM. In your project directory, execute the following command:

```shell
npm install react-slick --save
```

This command adds React Slick to your project, allowing you to leverage its carousel functionality in your web applications.

Note: In our `HorizontalSlider` component, we're using a different method to include the required CSS for React Slick, which will be detailed in the component section.

## React Slick Horizontal Slider Component

Below is the code for the `HorizontalSlider` component I developed. It uses React Slick to create a responsive, customizable horizontal scroll slider.

### Code Snippet

```jsx
import React from "react";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

const HorizontalSlider = ({ children, className }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, slidesToScroll: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const sliderClassName = `horizontal-slider ${className}`;

  return (
    <div className={sliderClassName}>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Helmet>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default HorizontalSlider;
```

Important that you make sure the parent element for this component has `width: 100%`, and it is likely that the parent or the slide children themselves will need to have a set `height`.

I've included React Helmet to dynamically add the CSS scripts to the head of the page. This is necessary because the slider is a nested child component, and the styles need to be added at the top level of the document. Plus you might not want to add this script to every page on your website.

If you're using `nextjs` you can just use the head component from `next/head`, and come to think of it the latest gatsby may have a different way of handling adding elements to the head - but that maybe at the page component level.

This approach can lead to optimization issues. When the JavaScript loads client-side, it fetches these styles, which happens late in the page load process. To mitigate this, it's advisable to keep these components below the fold to avoid a "flash of unstyled content." Despite these concerns, I haven't noticed significant issues lately.

> **Version Alert**: The CSS links included in the component are specific to the version used at the time of this writing. Always check for the latest version of React Slick to ensure compatibility and access to the most up-to-date features.

```plaintext
https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css
https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css
```

Another huge headache I was having on mobile was that when there's a single card showing and you slide to the next there was no `margin` between them I had to do some digging but here's what I found to fix that.

```css
.horizontal-slider .slick-slide {
  padding: 0 8px; /* Adjust to Taste */
  box-sizing: border-box;
}
```

I'm using a specific selector class on the parent element so that in the case I have multiple sliders across my application these styles won't fight each other.

## Conclusion

This React component demonstrates a practical approach to creating a responsive horizontal slider. It's designed to be easily integrated and customized within various web projects. By sharing this solution, I hope to assist others facing similar challenges and contribute to the web development community.

> Update March 24th, 2024: I started using the `shadcn/ui` component library and then I discovered their carousel component and its underlining technology which is `embra-carousel`. I absolutely loved it and you need to try it! They have great toolset and awesome examples to get you started.

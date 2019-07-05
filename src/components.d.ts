/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  CardItem,
} from './models/cardItem.model';

export namespace Components {
  interface St3dCardCarousel {
    'animationSelectedSlide': boolean;
    'autoloop': { enabled: boolean; seconds: number; direction: string; };
    'controls': { enabled: boolean; };
    'cycle': () => Promise<boolean>;
    'distance': number;
    'initialSlide': number;
    'keyboard': boolean;
    'next': () => Promise<CardItem>;
    'prev': () => Promise<CardItem>;
    'select': (slideId: number) => Promise<CardItem>;
    'slideStyle': {};
    'slides': CardItem[];
    'slidesToShow': number;
  }
  interface TestCarousel {}
}

declare global {


  interface HTMLSt3dCardCarouselElement extends Components.St3dCardCarousel, HTMLStencilElement {}
  var HTMLSt3dCardCarouselElement: {
    prototype: HTMLSt3dCardCarouselElement;
    new (): HTMLSt3dCardCarouselElement;
  };

  interface HTMLTestCarouselElement extends Components.TestCarousel, HTMLStencilElement {}
  var HTMLTestCarouselElement: {
    prototype: HTMLTestCarouselElement;
    new (): HTMLTestCarouselElement;
  };
  interface HTMLElementTagNameMap {
    'st-3d-card-carousel': HTMLSt3dCardCarouselElement;
    'test-carousel': HTMLTestCarouselElement;
  }
}

declare namespace LocalJSX {
  interface St3dCardCarousel extends JSXBase.HTMLAttributes<HTMLSt3dCardCarouselElement> {
    'animationSelectedSlide'?: boolean;
    'autoloop'?: { enabled: boolean; seconds: number; direction: string; };
    'controls'?: { enabled: boolean; };
    'distance'?: number;
    'initialSlide'?: number;
    'keyboard'?: boolean;
    'onCurrentItem'?: (event: CustomEvent<any>) => void;
    'onSelectedItem'?: (event: CustomEvent<any>) => void;
    'onSlideChange'?: (event: CustomEvent<any>) => void;
    'slideStyle'?: {};
    'slides'?: CardItem[];
    'slidesToShow'?: number;
  }
  interface TestCarousel extends JSXBase.HTMLAttributes<HTMLTestCarouselElement> {}

  interface IntrinsicElements {
    'st-3d-card-carousel': St3dCardCarousel;
    'test-carousel': TestCarousel;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}



import { Component, State, h, Element } from '@stencil/core';
import { CardItemsService } from '../../services/fake-card-items.service';

@Component({
  tag: 'test-carousel',
  styleUrl: 'test-carousel.css',
  shadow: false,
})
export class TestCarousel {

  private start: number = 0;
  private end: number = 5;
  private items: any;
  @State() initialSlide: number = 3;
  @State() activeItem: number = 1;
  @State() slides: any;
  @State() autoloop = {
    enabled: false,
    seconds: 2000,
    direction: 'right'
  };
  @State() slidesToShow: number = 6;
  @State() keyboard: boolean = false;
  @State() distance: number = 200;
  @State() animationSelectedSlide: boolean = true;
  @State() slideStyle = {
  };
  @State() allowSwipeSlide = {
    prev: true,
    next: true
  }

  @Element() htmlEl: HTMLElement;

  componentWillLoad() {
    this.items = CardItemsService.getAll();
    this.getCurrentSlides();
  }

  componentDidLoad() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).getActiveIndex().then((activeIndex) => {
      console.log("Active index: " + activeIndex);
    });
    (cardCarouselElement as any).isBeginning().then((result) => {
      console.log("isBeginning: " + result);
    });
    (cardCarouselElement as any).isEnd().then((result) => {
      console.log("isEnd: " + result);
    });
    (cardCarouselElement as any).getPreviousIndex().then((index) => {
      console.log("Previous index slide: " + index);
    });
    (cardCarouselElement as any).getNextIndex().then((index) => {
      console.log("Next index slide: " + index);
    });
    (cardCarouselElement as any).length().then((length) => {
      console.log("Slides length: " + length);
    });
  }

  getCurrentSlides() {
    if (this.start === this.items.length) {
        this.start = 0;
        this.end = 5;
    }
    this.slides = [];
    for (let i = this.start; i <= this.end; i++) {
        //this.slides.push(this.items[i]);
        this.slides = [
          ...this.slides,
          this.items[i]
        ];
    }

    this.start = this.end + 1;
    if ((this.start + this.end) < this.items.length) this.end = this.start + this.end;
    else this.end = this.items.length - 1;
  }

  handleClick() {
    this.getCurrentSlides();
  }

  handleClickAutoLoop() {
    console.log('handleClickAutoLoop');
    this.autoloop = {...this.autoloop, enabled: !this.autoloop.enabled};
    console.log('autoloop', this.autoloop);
  }

  currentItem(ev) {
    this.activeItem = ev.detail;
  }

  prevSlide() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).prev();
  }

  nextSlide() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).next();
  }

  cycle() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).cycle();
  }

  goToSlide() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).select(4);
  }

  slideChange(ev) {
    console.log(ev.detail);
  }

  resetSlide() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).slideReset();
  }

  render() {
    let buttonClass = 'button';
    return (
      <div>
        <h3>Stencil component for testing an experimental 3D card carousel Web Component.</h3>
        <p>Initial slide: {this.initialSlide} </p>
        <p>Current slide: {this.activeItem} </p>
        <st-3D-card-carousel slides={this.slides} autoloop={this.autoloop} initialSlide={this.initialSlide} slidesToShow={this.slidesToShow}
        slideStyle={this.slideStyle} animationSelectedSlide={this.animationSelectedSlide} keyboard={this.keyboard} distance={this.distance}
        allowSwipeSlide={this.allowSwipeSlide} onCurrentItem={ev => this.currentItem(ev)} onSlideChange={ev => this.slideChange(ev)}></st-3D-card-carousel>
        <button class={buttonClass} onClick={this.handleClick.bind(this)}>Load more</button>
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={this.handleClickAutoLoop.bind(this)}>AutoLoop</button>
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={this.prevSlide.bind(this)}>Prev Slide</button>
        <button class={buttonClass} onClick={this.nextSlide.bind(this)}>Next Slide</button>
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={this.goToSlide.bind(this)}>Go to slide 4</button>
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={this.resetSlide.bind(this)}>Reset slide to initial slide</button>
      </div>
    );
  }
}

import { Component, State, h } from '@stencil/core';
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
  @State() slides: any;

  componentWillLoad() {
    this.items = CardItemsService.getAll();
    this.getCurrentSlides();
  }

  componentDidLoad() {
  }

  getCurrentSlides() {
    if (this.start == this.items.length) {
        this.start = 0;
        this.end = 5;
    }
    this.slides = [];
    for (var i = this.start; i <= this.end; i++) {
        //this.slides.push(this.items[i]);
        this.slides = [
            ...this.slides,
            this.items[i]
          ]
    }

    this.start = this.end + 1;
    if ((this.start + this.end) < this.items.length) this.end = this.start + this.end;
    else this.end = this.items.length - 1;
  }

  handleClick() {
    this.getCurrentSlides();
  }

  render() {
    let buttonClass = 'button';
    return (
      <div>
        <h3>Stencil component for testing an experimental 3D card carousel Web Component.</h3>
        <st-3D-card-carousel slides={this.slides}></st-3D-card-carousel>
        <button class={buttonClass} onClick={this.handleClick.bind(this)}>Load more</button>
      </div>
    );
  }
}
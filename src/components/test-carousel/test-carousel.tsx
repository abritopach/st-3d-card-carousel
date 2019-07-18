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

  resetIndex() {
    this.start = 0;
    this.end = 5;
  }

  updateIndex() {
    this.start = this.end + 1;
    if (this.items.length - 1 - this.end > this.slidesToShow) {
      this.end = this.end + this.slidesToShow;
    }
    else{
      this.end = (this.items.length - 1 - this.end) + this.end;
    }
    if (this.start === this.items.length) this.end = this.start;
  }

  getCurrentSlides() {
    if (this.start >= this.items.length) {
        this.resetIndex();
    }
    this.slides = [];
    for (let i = this.start; i <= this.end; i++) {
        //this.slides.push(this.items[i]);
        this.slides = [
          ...this.slides,
          this.items[i]
        ];
    }
    this.updateIndex();
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

  appendSlide() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');

    const newSlides = [
    {
      id: Math.floor(Math.random() * 100),
      title: 'User ' + Math.random().toString(36).substr(2, 4),
      description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
      subtitle: {
        text: 'Spain',
        icon: "fa fa-flag"
      },
      color: '#e67e22',
      currentPlacement: 0,
      imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
      backgroundImgUrl: 'https://ak2.picdn.net/shutterstock/videos/19300069/thumb/9.jpg'
    },
    {
        id: Math.floor(Math.random() * 100),
        title: 'User ' + Math.random().toString(36).substr(2, 4),
        description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
        subtitle: {
          text: 'Spain',
          icon: "fa fa-flag"
        },
        color: '#e74c3c',
        currentPlacement: 0,
        imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
        backgroundImgUrl: 'http://oxygennacdn1.oxygenna.com/wp-content/uploads/2017/01/header-image-6.jpg'
    },
    {
      id: Math.floor(Math.random() * 100),
      title: 'User ' + Math.random().toString(36).substr(2, 4),
      description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
      subtitle: {
        text: 'Spain',
        icon: "fa fa-flag"
      },
      color: '#e67e22',
      currentPlacement: 0,
      imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
      backgroundImgUrl: 'https://ak2.picdn.net/shutterstock/videos/19300069/thumb/9.jpg'
    },
    {
        id: Math.floor(Math.random() * 100),
        title: 'User ' + Math.random().toString(36).substr(2, 4),
        description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
        subtitle: {
          text: 'Spain',
          icon: "fa fa-flag"
        },
        color: '#e74c3c',
        currentPlacement: 0,
        imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
        backgroundImgUrl: 'http://oxygennacdn1.oxygenna.com/wp-content/uploads/2017/01/header-image-6.jpg'
    },
    ];

    /*
    const newSlides = {
      id: 18,
      title: 'User 18',
      description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
      subtitle: {
        text: 'Spain',
        icon: "fa fa-flag"
      },
      color: '#e67e22',
      currentPlacement: 0,
      imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
      backgroundImgUrl: 'https://ak2.picdn.net/shutterstock/videos/19300069/thumb/9.jpg'
    }
    */


    if (Array.isArray(newSlides)) {
      this.items = [...this.items, ...newSlides];
    }
    else {
      this.items.push(newSlides);
    }

    this.resetSlide();
    this.resetIndex();
    this.slides = [...this.items];

   this.updateIndex();

    (cardCarouselElement as any).appendSlide(newSlides).then((slides) => {
      console.log("new slides: " + slides);
    });
  }

  prependSlide() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');

    const newSlides = [
    {
      id: Math.floor(Math.random() * 100),
      title: 'User ' + Math.random().toString(36).substr(2, 4),
      description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
      subtitle: {
        text: 'Spain',
        icon: "fa fa-flag"
      },
      color: '#e67e22',
      currentPlacement: 0,
      imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
      backgroundImgUrl: 'https://ak2.picdn.net/shutterstock/videos/19300069/thumb/9.jpg'
    },
    {
        id: Math.floor(Math.random() * 100),
        title: 'User ' + Math.random().toString(36).substr(2, 4),
        description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
        subtitle: {
          text: 'Spain',
          icon: "fa fa-flag"
        },
        color: '#e74c3c',
        currentPlacement: 0,
        imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
        backgroundImgUrl: 'http://oxygennacdn1.oxygenna.com/wp-content/uploads/2017/01/header-image-6.jpg'
    }
    ];


    if (Array.isArray(newSlides)) {
      this.items = [...newSlides, ...this.items];
    }
    else {
      this.items.unshift(newSlides);
    }

    this.resetSlide();
    this.resetIndex();
    this.slides = [...this.items];

    this.updateIndex();
    (cardCarouselElement as any).prependSlide(newSlides).then((slides) => {
      console.log("new slides: " + slides);
    });
  }

  render() {
    let buttonClass = 'button';
    return (
      <div>
        <h3>Stencil component for testing an experimental 3D card carousel Web Component.</h3>
        <p>Initial slide: {this.initialSlide} </p>
        <p>Current slide: {this.activeItem} </p>
        <p>Slides length: {this.items.length} </p>
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
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={this.appendSlide.bind(this)}>Append four slides</button>
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={this.prependSlide.bind(this)}>Prepend two slides</button>
      </div>
    );
  }
}

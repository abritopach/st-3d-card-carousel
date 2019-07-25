import { Component, State, h, Element } from '@stencil/core';
import { CardItemsService } from '../../services/fake-card-items.service';

@Component({
  tag: 'test-carousel',
  styleUrl: 'test-carousel.css',
  shadow: false,
})
export class TestCarousel {

  @State() items: any;
  @State() initialSlide: number = 3;
  @State() activeItem: number = 1;
  @State() slides: any;
  @State() autoloop = {
    enabled: false,
    seconds: 2000,
    direction: 'right',
    stopOnLastSlide: false
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
  @State() moreSlds = false;
  @State() reloadSlds = false;

  @Element() htmlEl: HTMLElement;

  componentWillLoad() {
    this.items = CardItemsService.getAll();
    this.slides = CardItemsService.getAll();
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
    this.moreSlides();
  }

  handleClick() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).loadMore().then((newSlides) => {
      console.log("loadMore newSlides: ", newSlides);
    });
  }

  handleClickAutoLoop() {
    this.cycle();
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

  moreSlides() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    (cardCarouselElement as any).moreSlides().then((moreSlides) => {
      this.moreSlds = moreSlides;
    });
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

    (cardCarouselElement as any).appendSlide(newSlides).then((slides) => {
      console.log("appendSlide::new slides: ", slides);
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

    (cardCarouselElement as any).prependSlide(newSlides).then((slides) => {
      console.log("prependSlide::new slides: ", slides);
    });
  }

  addSlide() {
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
      this.items.splice(2, 0, ...newSlides)
    }
    else {
      this.items.splice(2, 0, newSlides)
    }

    (cardCarouselElement as any).addSlide(2, newSlides).then((slides) => {
      console.log("addSlide::new slides: ", slides);
    });
  }

  removeSlide(indexSlides) {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');

    if (Array.isArray(indexSlides)) {
      const copyItems = this.items;
      indexSlides.map(si => {
        this.items = this.items.filter(item => item !== copyItems[si]);
      });
    }
    else {
      this.items.splice(indexSlides, 1);
    }

    (cardCarouselElement as any).removeSlide(indexSlides).then((slides) => {
      console.log("removeSlide::new slides: ", slides);
    });

  }

  removeAllSlides() {
    const cardCarouselElement = document.querySelector('st-3D-card-carousel');
    this.items = [];
    this.initialSlide = 0;
    this.activeItem = 0;
    (cardCarouselElement as any).removeAllSlides().then((slides) => {
      console.log("removeAllSlides::slides: ", slides);
      // this.slides = [...CardItemsService.getAll()];
      this.reloadSlds = true;
    });
  }

  reloadSlides() {
    this.items = [...CardItemsService.getAll()];
    this.slides = [...CardItemsService.getAll()];
    this.reloadSlds = false;
  }

  reachEndSlides(ev) {
    console.log(ev.detail);
  }

  reachBeginningSlides(ev) {
    console.log(ev.detail);
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
        allowSwipeSlide={this.allowSwipeSlide} onCurrentItem={ev => this.currentItem(ev)} onSlideChange={ev => this.slideChange(ev)}
        onReachEndSlides={ev => this.reachEndSlides(ev)} onReachBeginningSlides={ev => this.reachBeginningSlides(ev)}></st-3D-card-carousel>
        { this.moreSlds
          ? <button class={buttonClass} onClick={this.handleClick.bind(this)}>Load more</button>
          : null
        }
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
        <button class={buttonClass} onClick={this.prependSlide.bind(this)}>Prepend two slides</button>
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={this.addSlide.bind(this)}>Add slides at index 2</button>
        <button class={buttonClass} onClick={() => this.removeSlide([0, 4, 5])}>Remove slides at index [0, 4, 5]</button>
        <br></br>
        <br></br>
        <button class={buttonClass} onClick={() => this.removeAllSlides()}>Remove all slides</button>
        { this.reloadSlds
          ? <button class={buttonClass} onClick={() => this.reloadSlides()}>Reload slides</button>
          : null
        }
      </div>
    );
  }
}

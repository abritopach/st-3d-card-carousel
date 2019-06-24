import { Component, h, Prop, Event, EventEmitter/*, Listen*/, Element } from '@stencil/core';
import { CardItem } from '../../models/cardItem.model';
import 'hammerjs';

import { CardItemsService } from '../../services/fake-card-items.service';

@Component({
  tag: 'st-3d-card-carousel',
  styleUrl: 'st-3d-card-carousel.css',
  shadow: true,
})
export class St3dCardCarousel  {

  private items: CardItem[] = [];
  private readonly tz: number = 250;
  private currentDeg: number = 0;
  private currentSlide: number = 1;
  private autoloopTask = null;
  @Prop() slides: CardItem[] = [];
  @Prop() autoloop = {
    enabled: false,
    seconds: 2000
  };
  @Prop() initialSlide: number = 1;
  @Prop() slidesToShow: number = 6;
  @Event() selectedItem: EventEmitter;
  @Event() currentItem: EventEmitter;
  /*
  @Listen('selectedItem')
  selectedItemHandler(event: CustomEvent) {
    console.log('@Listen selectedItemHandler', event.detail);
  }
  @Listen('currentItem')
  currentItemHandler(event: CustomEvent) {
    console.log('@Listen currentItemHandler', event.detail);
  }
  */
  @Element() htmlEl: HTMLElement;

  componentWillLoad() {
    console.log('St3dCardCarousel::componentWillLoad() | method called');

    if (this.slides.length === 0) {
      this.items = CardItemsService.getAll();
    }
    else {
      this.items = this.slides;
    }

    let degree = 0;
    this.items = this.items.slice(0, this.slidesToShow);
    this.items.map((item) => {
        item.currentPlacement = degree;
        degree = degree + 60;
    });
  }

  componentDidLoad() {
    console.log('St3dCardCarousel::componentDidLoad() | method called');

    this.checkAutoLoop();
    this.checkInitialSlide();

    // let carousel = this.htmlEl.querySelector('.carousel');
    // let carousel = document.getElementById('carousel');
    let carousel = this.htmlEl.shadowRoot.querySelector('.carousel') as HTMLElement;

    if ((typeof carousel !== 'undefined') && (carousel !== null)) {
      this.listenSwipeHammerEvent(carousel);
    }
  }

  componentWillUpdate() {
    console.log('St3dCardCarousel::componentWillUpdate() | method called');
    this.checkAutoLoop();
    if ((this.slides != null) && (this.slides.length != 0)) {
      this.items = this.slides;
      let degree = 0;
      this.items.map((item) => {
        item["currentPlacement"] = degree;
        degree = degree + 60;
      });
    }
  }

  onHandleClick(item: CardItem) {
    console.log('St3dCardCarousel::onHandleClick() | method called', item);
    this.selectedItem.emit(item);
    this.applyResizeStyle(item);
    setTimeout(() => {
      this.resetResizeStyle(item);
    },3000);
  }

  applyStyle() {
    // let ele = this.htmlEl.querySelector('.carousel');
    let ele = this.htmlEl.shadowRoot.querySelector('.carousel');
    ele.setAttribute("style", "-webkit-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "-moz-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "-o-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "transform: rotateY(" + this.currentDeg + "deg)");
  }

  applyResizeStyle(item: CardItem) {
    // console.log('St3dCardCarousel::applyResizeStyle(item) | method called', item);
    // let ele = this.htmlEl.querySelector('.slide-item' + item.id);
    let ele = this.htmlEl.shadowRoot.querySelector('.slide-item' + item.id);
    ele.classList.add("slide-item-animation");
  }

  resetResizeStyle(item: CardItem) {
    // console.log('St3dCardCarousel::resetResizeStyle(item) | method called', item);
    // let ele = this.htmlEl.querySelector('.slide-item' + item.id);
    let ele = this.htmlEl.shadowRoot.querySelector('.slide-item' + item.id);
    ele.classList.remove("slide-item-animation");
  }

  checkAutoLoop() {
    if (this.autoloop.enabled) {
      this.autoloopTask = setInterval(() => {
        this.currentDeg = this.currentDeg + 60;
        this.applyStyle();
      }, this.autoloop.seconds); // Fires every 2 seconds by default. } }
    } else {
      if (this.autoloopTask) clearInterval(this.autoloopTask);
    }
  }

  checkInitialSlide() {
    if ((this.initialSlide !== 1) && (this.initialSlide <= this.slidesToShow)) {
      this.selectSlide(this.initialSlide);
    }
    if (this.initialSlide > this.slidesToShow) {
      console.log('St3dCardCarousel ERROR: Initial slide is greater than the number of slides to show.')
    }
  }

  listenSwipeHammerEvent(carousel) {
    let mc = new Hammer(carousel);

    /*
    let mc = new Hammer.Manager(carousel, {
      recognizers: [
        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
        [Hammer.Swipe,{ direction: Hammer.DIRECTION_ALL }],
      ]
    });
    */
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    mc.on("swipeleft swiperight", (ev => {
      if (ev.type == "swipeleft") {
        this.currentSlide += 1;
        if (this.currentSlide > this.slidesToShow) {
          this.currentSlide = 1;
        }
        this.currentDeg = this.currentDeg - 60;
        this.applyStyle();
      }
      if (ev.type == "swiperight") {
        this.currentSlide -= 1;
        if (this.currentSlide === 0) {
          this.currentSlide = this.slidesToShow;
        }
        this.currentDeg = this.currentDeg + 60;
        this.applyStyle();
      }
      // console.log("currentSlide", this.currentSlide);
      this.currentItem.emit(this.currentSlide);
    }).bind(this));
  }

  selectSlide(slideId: number) {
    if (this.currentSlide !== slideId) {
      this.currentDeg = - this.items[slideId - 1].currentPlacement;
      this.applyStyle();
      this.currentSlide = slideId;
      this.currentItem.emit(this.currentSlide);
    }
  }

  render() {
    const items = this.items.map((item, index) => {
        let divStyle = {
          'background-color': item.color,
          'transform': 'rotateY(-'+item.currentPlacement+'deg)  translateZ('+this.tz+'px)',
          '-webkit-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+this.tz+'px)'
        };
        let iconStyles = {
          color: 'white'
        };
        let myClass = 'carousel-slide-item slide-item' + item.id;
        return (
          <div class={myClass} style={divStyle} onClick={ () => this.onHandleClick(this.items[index])}>
          {item.imgUrl ? <img src={item.imgUrl}/> :  []}
          <h2>{item.title}</h2>
          {item.subtitle && item.subtitle.icon && item.subtitle.text ?
            <p><i style={iconStyles} class={item.subtitle.icon}></i> {item.subtitle.text}</p>
            : null
          }
          {item.subtitle && !item.subtitle.icon && item.subtitle.text  ?
            <p>{item.subtitle.text}</p>
            : null
          }
          {
            !item.description
            ? null
            : (
              <p>{item.description}</p>
            )
          }
          <div>
          {item.footer
            ? [<div class="left">{item.footer.values.leftValue} <i style={iconStyles} class={item.footer.icons.leftIcon}></i></div>,
              <div class="right">{item.footer.values.rightValue} <i style={iconStyles} class={item.footer.icons.rightIcon}></i></div>
              ]
            : [
            ]
          }
          </div>
          </div>
        );
      });
    return (
        [<div class="carousel-container">
            <div id="carousel" class="carousel">
                {items}
            </div>
        </div>]
    )
  }
}

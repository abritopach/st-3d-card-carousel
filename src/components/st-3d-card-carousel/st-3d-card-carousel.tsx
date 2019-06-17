import { Component, h, Prop, Event, EventEmitter/*, Listen*/, Element } from '@stencil/core';
import { CardItem } from '../../models/cardItem.model';
// import * as Hammer from 'hammerjs';

import { CardItemsService } from '../../services/fake-card-items.service';

@Component({
  tag: 'st-3d-card-carousel',
  styleUrl: 'st-3d-card-carousel.css',
  shadow: false,
})
export class St3dCardCarousel  {

  private items: CardItem[] = [];
  private readonly tz: number = 250;
  private currentDeg: number = 0;
  private autoloopTask = null;
  @Prop() slides: CardItem[] = [];
  @Prop() autoloop = {
    enabled: false,
    seconds: 2000
  };
  @Event() selectedItem: EventEmitter;
  /*
  @Listen('selectedItem')
  selectedItemHandler(event: CustomEvent) {
    console.log('@Listen selectedItemHandler', event.detail);
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
    this.items = this.items.slice(0, 6);
    this.items.map((item) => {
        item.currentPlacement = degree;
        degree = degree + 60;
    });
  }

  componentDidLoad() {
    console.log('St3dCardCarousel::componentDidLoad() | method called');

    this.checkAutoLoop();

    // let carousel = this.htmlEl.querySelector('.carousel');
    // let carousel = this.htmlEl.shadowRoot.querySelector('.carousel') as HTMLElement;
    let carousel = document.getElementById('carousel');

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
    let ele = this.htmlEl.querySelector('.carousel');
    ele.setAttribute("style", "-webkit-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "-moz-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "-o-transform: rotateY(" + this.currentDeg + "deg)");
    ele.setAttribute("style", "transform: rotateY(" + this.currentDeg + "deg)");
  }

  applyResizeStyle(item: CardItem) {
    // console.log('St3dCardCarousel::applyResizeStyle(item) | method called', item);
    let ele = this.htmlEl.querySelector('.slide-item' + item.id);
    ele.classList.add("slide-item-animation");
  }

  resetResizeStyle(item: CardItem) {
    // console.log('St3dCardCarousel::resetResizeStyle(item) | method called', item);
    let ele = this.htmlEl.querySelector('.slide-item' + item.id);
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

    mc.on("swipeleft swiperight", (function(ev) {
      if (ev.type == "swipeleft") {
        this.currentDeg = this.currentDeg - 60;
        this.applyStyle();
      }
      if (ev.type == "swiperight") {
        this.currentDeg = this.currentDeg + 60;
        this.applyStyle();
      }
    }).bind(this));
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

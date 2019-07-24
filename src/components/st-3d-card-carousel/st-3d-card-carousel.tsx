import { Component, h, Prop, Event, EventEmitter, Listen, Element, Method } from '@stencil/core';
import { CardItem } from '../../models/cardItem.model';
import 'hammerjs';

import { CardItemsService } from '../../services/fake-card-items.service';

@Component({
  tag: 'st-3d-card-carousel',
  styleUrl: 'st-3d-card-carousel.css',
  shadow: true,
})
export class St3dCardCarousel  {

  private start: number = 0;
  private end: number = 5;
  private items: CardItem[] = [];
  private copySlides: CardItem[] = [];
  private tz: number = 250;
  private currentDeg: number = 0;
  private currentSlide: number = 1;
  private autoloopTask = null;
  private timer = 0;
  private prevent = false;
  @Prop() slides: CardItem[] = [];
  @Prop() autoloop = {
    enabled: false,
    seconds: 2000,
    direction: 'right',
    stopOnLastSlide: false
  };
  @Prop() initialSlide: number = 1;
  @Prop() slidesToShow: number = 6;
  @Prop() keyboard: boolean = false;
  @Prop() distance: number;
  @Prop() animationSelectedSlide: boolean = true;
  @Prop() controls = {
    enabled: false,
    position: 'top',
    text: ['prev', 'next']
  }
  /*
    width: '200px',
    height: 'auto',
    border: 'none',
    'border-radius': '10px',
    'opacity': '0.95',
    'color': 'white'
    */
  @Prop() slideStyle = {
  };
  @Prop() axis: string = 'horizontal';
  @Prop() allowSwipeSlide = {
    prev: true,
    next: true
  }
  @Event() selectedItem: EventEmitter;
  @Event() currentItem: EventEmitter;
  @Event() slideChange: EventEmitter;
  @Event() slideDoubleTap: EventEmitter;
  @Event() reachEndSlides: EventEmitter;
  @Event() reachBeginningSlides: EventEmitter;
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

  @Listen('keydown', { target: 'document' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.keyboard) {
      if (ev.key === 'ArrowLeft'){
        this.swipeLeftSlide();
      }
      if (ev.key === 'ArrowRight'){
        this.swipeRightSlide();
      }
    }
  }

  @Method()
  async prev(): Promise<CardItem> {
    this.swipeRightSlide();
    return this.slides[this.currentSlide];
  }

  @Method()
  async next(): Promise<CardItem> {
    this.swipeLeftSlide();
    return this.slides[this.currentSlide];
  }

  @Method()
  async cycle(): Promise<boolean> {
    this.autoloop.enabled = !this.autoloop.enabled;
    this.checkAutoLoop();
    return this.autoloop.enabled;
  }

  @Method()
  async select(slideId: number | string): Promise<CardItem> {
    this.selectSlide(slideId);
    return this.slides[slideId];
  }

  @Method()
  async getActiveIndex(): Promise<number> {
    return this.currentSlide - 1;
  }

  @Method()
  async getPreviousIndex(): Promise<number> {
    return this.currentSlide === 0 ? this.slidesToShow - 1 : this.currentSlide - 1;
  }

  @Method()
  async getNextIndex(): Promise<number> {
    return this.currentSlide === this.slidesToShow ? 0 : this.currentSlide + 1;
  }

  @Method()
  async isBeginning(): Promise<boolean> {
    return this.currentSlide === 0;
  }

  @Method()
  async isEnd(): Promise<boolean> {
    return this.currentSlide === this.slidesToShow;
  }

  @Method()
  async length(): Promise<number> {
    return this.items.length;
  }

  @Method()
  async slideReset(): Promise<CardItem> {
    this.selectSlide(this.initialSlide);
    this.slideChange.emit({message: 'slide changed', currentSlide: this.currentSlide});
    return this.slides[this.initialSlide];
  }

  @Method()
  async appendSlide(slides: CardItem | CardItem[]): Promise<CardItem[]> {

    this.resetIndex();
    this.slides = [...this.copySlides.slice(0, this.slidesToShow)];

    if (Array.isArray(slides)) {
      this.copySlides = [...this.copySlides, ...slides];
    }
    else {
      this.copySlides.push(slides);
    }

    this.updateIndex();
    return this.copySlides;
  }

  @Method()
  async prependSlide(slides: CardItem | CardItem[]): Promise<CardItem[]> {

    this.resetIndex();

    if (Array.isArray(slides)) {
      this.copySlides = [...slides, ...this.copySlides,];
    }
    else {
      this.copySlides.unshift(slides);
    }

    this.slides = [...this.copySlides.slice(0, this.slidesToShow)];
    this.updateIndex();
    return this.copySlides;
  }

  @Method()
  async addSlide(index: number, slides: CardItem | CardItem[]) {

    this.resetIndex();

    if (Array.isArray(slides)) {
      this.copySlides.splice(index, 0, ...slides);
    }
    else {
      this.copySlides.splice(index, 0, slides);
    }

    this.slides = [...this.copySlides.slice(0, this.slidesToShow)];

    this.updateIndex();
    return this.copySlides;
  }

  @Method()
  async removeSlide(slideIndex: number | number[]): Promise<CardItem[]> {

    this.resetIndex();

    if (Array.isArray(slideIndex)) {
      const copyItems = this.copySlides;
      slideIndex.map(si => {
        this.copySlides = this.copySlides.filter(item => item !== copyItems[si]);
      });
    }
    else {
      this.copySlides.splice(slideIndex, 1);
    }

    this.slides = [...this.copySlides.slice(0, this.slidesToShow)];

    this.updateIndex();
    return this.copySlides;
  }

  @Method()
  async loadMore(): Promise<CardItem[]> {
    return this.getCurrentSlides();
  }

  @Method()
  async moreSlides(): Promise<boolean> {
    return this.copySlides.length > this.slidesToShow  ? true : false;
  }

  componentWillLoad() {
    console.log('St3dCardCarousel::componentWillLoad() | method called');

    if (this.slides.length === 0) {
      this.items = [...this.items, ...CardItemsService.getAll()];
      this.copySlides = [...this.items];
    }
    else {
      // this.items = this.slides;
      this.copySlides = [...this.slides];
      this.items = [...this.getCurrentSlides()];
      // this.copySlides = this.items;
    }

    this.checkDistance();

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
    // console.log('St3dCardCarousel::componentWillUpdate() | method called');
  }

  componentDidUpdate() {
    this.checkDistance();
    if ((this.slides != null) && (this.slides.length != 0)) {
      this.items = [...this.slides];
      this.slides = [];
      let degree = 0;
      this.items = this.items.slice(0, this.slidesToShow);
      this.items.map((item) => {
        item["currentPlacement"] = degree;
        degree = degree + 60;
      });
    }
  }

  onHandleClick(item: CardItem) {
    this.timer = setTimeout(() => {
      if (!this.prevent) {
        console.log('St3dCardCarousel::onHandleClick() | method called', item);
        this.selectedItem.emit(item);
        if (this.animationSelectedSlide) {
          this.applyResizeStyle(item);
          setTimeout(() => {
            this.resetResizeStyle(item);
          },3000);
        }
      }
      this.prevent = false;
    }, 200);
  }

  onHandleDoubleClick(item: CardItem) {
    console.log('St3dCardCarousel::onHandleDoubleClick() | method called', item);
    clearTimeout(this.timer);
    this.prevent = true;
    this.slideDoubleTap.emit(item);
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
    /*
    console.log('applyResizeStyle ele', ele);
    ele.setAttribute('style', 'background-color: rgb(231, 76, 60); transform: rotateY(0) translateZ(250px);');
    */
    ele.classList.add("slide-item-animation");
  }

  resetResizeStyle(item: CardItem) {
    // console.log('St3dCardCarousel::resetResizeStyle(item) | method called', item);
    // let ele = this.htmlEl.querySelector('.slide-item' + item.id);
    let ele = this.htmlEl.shadowRoot.querySelector('.slide-item' + item.id);
    /*
    ele.setAttribute('style', 'background-color: rgb(231, 76, 60); transform: rotateY(120deg) translateZ(250px);');
    console.log('resetResizeStyle ele', ele);
    */
    ele.classList.remove("slide-item-animation");
  }

  checkDistance() {
    if ((this.distance !== null) && (typeof this.distance !== 'undefined')) {
      this.tz = this.distance;
    }
  }

  checkAutoLoop() {
    if (this.autoloopTask === null && this.autoloop.enabled) {
      this.autoloopTask = setInterval(() => {
        if (this.autoloop.direction === 'left') {
          this.swipeLeftSlide();
        }
        else {
          this.swipeRightSlide();
        }
      }, this.autoloop.seconds); // Fires every 2 seconds by default. } }
    } else {
      if (this.autoloopTask) {
        clearInterval(this.autoloopTask);
        this.autoloopTask = null;
      }
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
        this.swipeLeftSlide();
      }
      if (ev.type == "swiperight") {
        this.swipeRightSlide();
      }
    }).bind(this));
  }

  swipeLeftSlide() {
    if (this.allowSwipeSlide.next) {
      this.currentSlide += 1;
      if (this.currentSlide > this.slidesToShow) {
        this.currentSlide = 1;
      }
      this.currentDeg = this.currentDeg - 60;
      this.applyStyle();
      this.isFirstOrLastSlide();
      if (!this.autoloop.enabled) {
        this.currentItem.emit(this.currentSlide);
        this.slideChange.emit({message: 'slide changed', currentSlide: this.currentSlide});
      }
    }
  }

  swipeRightSlide() {
    if (this.allowSwipeSlide.prev) {
      this.currentSlide -= 1;
      if (this.currentSlide === 0) {
        this.currentSlide = this.slidesToShow;
      }
      this.currentDeg = this.currentDeg + 60;
      this.applyStyle();
      this.isFirstOrLastSlide();
      if (!this.autoloop.enabled) {
        this.currentItem.emit(this.currentSlide);
        this.slideChange.emit({message: 'slide changed', currentSlide: this.currentSlide});
      }
    }
  }

  getSlideIndex(slideId: string) {
    switch(slideId) {
      case 'prev': {
        return this.currentSlide - 1;
      }
      case 'next': {
        return this.currentSlide + 1;
      }
      case 'first': {
        return 0;
      }
      case 'last': {
        return this.slidesToShow;
      }
      default: {
         break;
      }
   }
  }

  selectSlide(slideId: number | string) {

    if (typeof slideId === "string") {
      slideId = this.getSlideIndex(slideId);
    }

    if (this.currentSlide !== slideId) {
      let index = slideId - 1;
      if (slideId === 0) index = 0;
      this.currentDeg = - this.items[index].currentPlacement;
      this.applyStyle();
      this.currentSlide = slideId;
      this.currentItem.emit(this.currentSlide);
      this.isFirstOrLastSlide();
    }
  }

  onHandleClickArrowLeft() {
    console.log('St3dCardCarousel::onHandleClickArrowLeft() | method called');
    this.swipeLeftSlide();
  }

  onHandleClickArrowRight() {
    console.log('St3dCardCarousel::onHandleClickArrowRight() | method called');
    this.swipeRightSlide();
  }

  showControls(position) {
    if (!this.controls.enabled) {
      return null;
    }
    if (this.controls.position !== position) {
      return null;
    }
    let controlsClass = this.controls.position === 'bottom' ? 'controls controls-bottom' : 'controls';
    return (
      <div class={controlsClass}>
        <i class="icon icon-arrow icon-arrow-left" onClick={ () => this.onHandleClickArrowLeft()}></i>
        <i class="icon icon-arrow icon-arrow-right" onClick={ () => this.onHandleClickArrowRight()}></i>
      </div>
    );
  }

  isFirstOrLastSlide() {
    this.getActiveIndex().then((activeIndex) => {
      if (activeIndex === 0) {
        this.reachBeginningSlides.emit({message: 'reach beginning slides', currentSlide: this.currentSlide, activeIndex: activeIndex});
      }
      if (activeIndex === 5) {
        this.reachEndSlides.emit({message: 'reach end slides', currentSlide: this.currentSlide, activeIndex: activeIndex});
        if (this.autoloop.enabled && this.autoloop.stopOnLastSlide) {
          clearInterval(this.autoloopTask);
          this.autoloopTask = null;
        }
      }
    });
  }

  resetIndex() {
    this.start = 0;
    this.end = 5;
  }

  updateIndex() {
    this.start = this.end + 1;
    if (this.copySlides.length - 1 - this.end > this.slidesToShow) {
      this.end = this.end + this.slidesToShow;
    }
    else{
      this.end = (this.copySlides.length - 1 - this.end) + this.end;
    }
    if (this.start === this.copySlides.length) this.end = this.start;
  }

  getCurrentSlides() {
    if (this.start >= this.copySlides.length) {
      this.resetIndex();
    }

    this.slides = this.copySlides.slice(this.start, this.end + 1);

    this.updateIndex();
    return this.slides;
  }

  render() {
    const items = this.items.map((item, index) => {
        let divStyle = {
          'background-color': item.color,
          'transform': 'rotateY(-'+item.currentPlacement+'deg)  translateZ('+this.tz+'px)',
          '-webkit-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+this.tz+'px)',
        };
        let iconStyles = {
          color: 'white'
        };
        let myClass = 'carousel-slide-item slide-item' + item.id;
        if (this.slideStyle) divStyle = {...divStyle, ...this.slideStyle}
        return (
          <div class={myClass} style={divStyle} onClick={ () => this.onHandleClick(this.items[index])} onDblClick={ () => this.onHandleDoubleClick(this.items[index])}>
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
              <p class={'slide-description'}>{item.description}</p>
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
        [
        this.showControls('top')
        ,
        <div class="carousel-container">
            <div id="carousel" class="carousel">
                {items}
            </div>
        </div>,
        this.showControls('bottom')
        ]
    )
  }
}

import { Component, h } from '@stencil/core';

@Component({
  tag: 'st-3d-card-carousel',
  styleUrl: 'st-3d-card-carousel.css',
  shadow: true,
})
export class St3dCardCarousel  {

    private items: any[];
    private readonly tz: number = 250;

    componentWillLoad() {
        console.log('St3dCardCarousel::componentWillLoad() | method called');
        this.items = [
            {
                id: 1,
                title: 'User 1',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#1abc9c',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'http://oxygennacdn3.oxygenna.com/wp-content/uploads/2015/11/18.jpg',
                footer: {
                  icons: {
                      leftIcon: "fa fa-users",
                      rightIcon: "fa fa-comments"
                  },
                  values: {
                      leftValue:12,
                      rightValue: 4
                  }
                }
            },
            {
                id: 2,
                title: 'User 2',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#e67e22',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/d2/7b/4f/d27b4fa995194a0c77b8871a326a7c0b.jpg'
            },
            {
                id: 3,
                title: 'User 3',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#e74c3c',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://i.imgur.com/AMf9X7E.jpg'
            },
            {
                id: 4,
                title: 'User 4',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#2c3e50',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'http://oxygennacdn2.oxygenna.com/wp-content/uploads/2015/06/small.jpg'
            },
            {
                id: 5,
                title: 'User 5',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#2980b9',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://newevolutiondesigns.com/images/freebies/google-material-design-wallpaper-1.jpg'
            },
            {
                id: 6,
                title: 'User 6',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#9b59b6',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://i.ytimg.com/vi/GpTrOahC6jI/maxresdefault.jpg'
            },
            {
                id: 7,
                title: 'User 7',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#81C784',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'http://www.templatemonsterblog.es/wp-content/uploads/2016/04/1-9-2.jpg'
            },
            {
                id: 8,
                title: 'User 8',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#CDDC39',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://cms-assets.tutsplus.com/uploads/users/41/posts/25951/image/material-design-3.jpg',
            },
            {
                id: 9,
                title: 'User 9',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#FF9800',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://cms-assets.tutsplus.com/uploads/users/41/posts/25951/image/material-design-background-1.jpg'
            },
            {
                id: 10,
                title: 'User 10',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#795548',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'http://www.vactualpapers.com/web/wallpapers/1-pattern-35-color-schemes-material-design-wallpaper-series-image11/2560x1440.jpg'
            },
            {
                id: 11,
                title: 'User 11',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#90A4AE',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://www.smashingmagazine.com/wp-content/uploads/2015/07/Ultimate-Material-Lollipop-Collection1.png'
            },
            {
                id: 12,
                title: 'User 12',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#D50000',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://s-media-cache-ak0.pinimg.com/736x/c2/bd/3a/c2bd3ae483f9617e6f71bc2a74b60b5a.jpg'
            },
            {
                id: 13,
                title: 'User 13',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#1abc9c',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'http://www.vactualpapers.com/web/wallpapers/material-design-hd-background-by-vactual-papers-wallpaper-84/thumbnail/lg.jpg'
            },
            {
                id: 14,
                title: 'User 14',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#e67e22',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'https://ak2.picdn.net/shutterstock/videos/19300069/thumb/9.jpg'
            },
            {
                id: 15,
                title: 'User 15',
                description: 'Wait a minute. Wait a minute, Doc. Uhhh...',
                subtitle: {
                  text: 'Spain',
                  icon: "fa fa-flag"
                },
                color: '#e74c3c',
                isSelected: false,
                imgUrl: 'https://www.resa.es/wp-content/uploads/2015/07/icon-user-default.png',
                backgroundImgUrl: 'http://oxygennacdn1.oxygenna.com/wp-content/uploads/2017/01/header-image-6.jpg'
            },
        ];
        let degree = 0;
        this.items.map((item) => {
            item["currentPlacement"] = degree;
            degree = degree + 60;
        });
    }

    componentDidLoad() {
        console.log('St3dCardCarousel::componentDidLoad() | method called');
    }

    componentWillUpdate() {
        console.log('St3dCardCarousel::componentWillUpdate() | method called');
    }

    render() {
        const items = this.items.map((item) => {
            let divStyle = {
              'background-color': item.color,
              'transform': 'rotateY(-'+item.currentPlacement+'deg)  translateZ('+this.tz+'px)',
              '-webkit-transform': 'rotateY('+item.currentPlacement+'deg)  translateZ('+this.tz+'px)'
            };
            let myClass = 'carousel-slide-item slide-item' + item.id;
            return (
              <div class={myClass} style={divStyle}>
              {item.imgUrl ? <img src={item.imgUrl}/> :  []}
              <h2>{item.title}</h2>
              {item.subtitle.icon ?
                <p><i class={item.subtitle.icon}></i> {item.subtitle.text}</p>
                : <p>{item.subtitle.text}</p>
              }
              <p>{item.description}</p>
              <div>
              {item.footer
                ? [<div class="left">{item.footer.values.leftValue} <i class={item.footer.icons.leftIcon}></i></div>,
                  <div class="right">{item.footer.values.rightValue} <i class={item.footer.icons.rightIcon}></i></div>
                  ]
                : [
                ]
              }
              </div>
              </div>
            );
          });
        return (
            <div class="carousel-container">
                <div class="carousel">
                    {items}
                </div>
            </div>
        )
    }
}

export interface CardItem {
    id: number;
    title: string;
    description?: string;
    subtitle?: {
        text: string;
        icon?: string;
    };
    color: string;
    imgUrl: string;
    backgroundImgUrl?: string;
    footer?: {
        icons: {
            leftIcon: string;
            rightIcon: string;
        },
        values: {
            leftValue: number;
            rightValue: number;
        }
    },
    currentPlacement: number;
}

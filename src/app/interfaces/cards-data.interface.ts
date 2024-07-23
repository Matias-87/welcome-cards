export interface Cards extends CardsData {
    id: string;
}

export interface CardsData {
    bgColor: string;
    textColor: string;
    underlineColor: string;
    borderColor: string;
    textTitle: string;
    bgButtonColor: string;
    iconColor: string;
    underlineCheck: boolean;
    borderCheck: boolean;
    titleAlign: string;
    roundedCheck: boolean;
    backContent: [
        {
            textTitleBack: string,
            textContentBack: string,
            underlineBackTitle: boolean
        }
    ];
    backgroundContent: {
        color1: string,
        color2: string,
        bgGradient: boolean
    }
}

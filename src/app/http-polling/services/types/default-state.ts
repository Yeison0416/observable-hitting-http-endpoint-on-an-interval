export type DefaultState = {
    type: string; // "http-polling"
    header: Header;

    buttons: {
        type: string; // "buttons"
        buttons: {
            buttonData: {
                type: string; // "button"
                ariaLabel: string;
                label: string;
                id: string;
            };
        }[];
    };

    radioButtons: {
        type: string; // "radio-buttons"
        buttons: {
            buttonData: {
                type: string; // "radio-button"
                groupName: string;
                label: string;
                value: string;
                id: string;
                checked?: boolean;
            };
        }[];
    };

    richText: {
        type: string; // "rich-texts"
        text: string;
        id?: string;
    };

    richText1: {
        type: string; // "rich-texts"
        text: string;
        id?: string;
    };

    picture: {
        type: string; // "picture"
        media: {
            type: string; // "image"
            sources: {
                default: {
                    url: string;
                };
            };
            alt: string;
            ariaLabel: string;
        };
    };
};

export type Header = {
    type: string; // "header"
    title: string;
};

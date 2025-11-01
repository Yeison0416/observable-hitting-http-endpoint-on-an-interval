export type DefaultState = {
    type: string;
    header: Header;
    buttons: {
        type: string;
        buttons: {
            type: string;
            ariaLabel: string;
            label: string;
        }[];
    };
    radioButtons: {
        type: string;
        buttonsType: string;
        groupName: string;
        buttons: {
            type: string;
            label: string;
            value: string;
            id: string;
            checked?: boolean;
        }[];
    };
    richTexts: {
        type: string;
        headerData: Header;
        text: string;
    };
};

export type Header = {
    type: string;
    title: string;
};

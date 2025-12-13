import { DomElements } from '../types/dom-elements/dom-elements';

export function getDomElements(): DomElements {
    return {
        pollingStatus: document.getElementById('polling-status') as HTMLElement,
        catsCheckBox: document.getElementById('cats-check-box') as HTMLElement,
        meatsCheckBox: document.getElementById('meats-check-box') as HTMLElement,
        startButton: document.getElementById('start') as HTMLElement,
        stopButton: document.getElementById('stop') as HTMLElement,
        richText: document.querySelector('.rich-text:has(#text)') as HTMLElement,
        richTextSpan: document.querySelector('.rich-text:has(#text) span') as HTMLElement,
        picture: document.querySelector('.picture__image') as HTMLElement,
    };
}

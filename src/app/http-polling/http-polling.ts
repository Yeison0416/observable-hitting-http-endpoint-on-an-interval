import { exhaustMap, fromEvent, map, tap } from 'rxjs';
import template from './http-polling.hbs';

import { createDefaultState } from './state/default-state.state';
import { DefaultState } from './services/types/default-state';
import { DomElements } from '../../types/dom-elements/dom-elements';
import { getDomElements } from '../../utils/get-dom-elements';
import { pollingState as PollingState } from './state/polling.state';
import type { RequestCategory } from '../../types/request-category/request-category';
import { selectionState$ } from './state/selection.state';

type HttpPolling = {
    start: () => void;
};

export function HttpPolling(appRootNode: HTMLElement): HttpPolling {
    const MEAT_API = 'meatApi' as const;
    const CAT_API = 'catApi' as const;

    const defaultStateData = createDefaultState();
    let domElements: DomElements | null = null;
    const pollingState = PollingState();

    const initStateDataPromise: Promise<DefaultState> = (async () => {
        await defaultStateData.init();
        return defaultStateData.getState();
    })();

    const updatePollingStatusNode = (status: string): void => {
        if (domElements?.pollingStatus) {
            domElements.pollingStatus.innerText = status;
        }
    };

    const updateTextNode = (meatParagraph: string): void => {
        if (domElements?.richTextSpan) {
            domElements.richTextSpan.innerHTML = meatParagraph;
        }
    };

    const updatePictureNode = (imageUrl: string): void => {
        if (domElements?.picture) {
            domElements.picture.setAttribute('src', imageUrl);
        }
    };

    function updateDom(data: string): void {
        const updateDomFunction = selectionState$.getState() === MEAT_API ? updateTextNode : updatePictureNode;
        updateDomFunction(data);
    }

    async function renderInitialMarkUp() {
        try {
            const initStateData = await initStateDataPromise;
            appRootNode.innerHTML = template(initStateData);
        } catch (error) {
            appRootNode.innerHTML = '<p>Failed to load data. Please try again later.</p>';
            throw error;
        }
    }

    function catsCheckBoxClickHandler(): void {
        if (!domElements) return;

        fromEvent(domElements?.catsCheckBox, 'click')
            .pipe(map(() => CAT_API as RequestCategory))
            .subscribe((requestCategory: RequestCategory) => {
                domElements?.richText.classList.remove('active');
                domElements?.picture.classList.remove('picture--hide');
                selectionState$.update(requestCategory);
            });
    }

    function meatsCheckBoxClickHandler(): void {
        if (!domElements) return;

        fromEvent(domElements?.meatsCheckBox, 'click')
            .pipe(map(() => MEAT_API as RequestCategory))
            .subscribe((requestCategory: RequestCategory) => {
                domElements?.richText.classList.add('active');
                domElements?.picture.classList.add('picture--hide');
                selectionState$.update(requestCategory);
            });
    }

    function startButtonsClickHandlers(): void {
        if (!domElements?.startButton) return;

        fromEvent(domElements.startButton, 'click')
            .pipe(
                tap(() => {
                    updatePollingStatusNode('Polling started...');
                }),
                exhaustMap(() => pollingState.startPolling())
            )
            .subscribe((data: string) => {
                updateDom(data);
            });
    }

    function stopButtonsClickHandlers(): void {
        if (!domElements?.stopButton) return;

        fromEvent(domElements.stopButton, 'click')
            .pipe(
                tap(() => {
                    updatePollingStatusNode('Polling stopped...');
                })
            )
            .subscribe(() => {
                pollingState.stopPolling();
            });
    }

    // lifecycle pattern fetch data → render HTML → select elements → attach listeners
    async function initializeUI() {
        await renderInitialMarkUp();
        domElements = getDomElements();
        catsCheckBoxClickHandler();
        meatsCheckBoxClickHandler();
        startButtonsClickHandlers();
        stopButtonsClickHandlers();
    }

    async function start() {
        await initializeUI();
    }

    const state = {
        start,
    };

    return Object.assign({}, state);
}

import { fromEvent } from 'rxjs';
import template from './http-polling.hbs';

import { createDefaultState } from './state/default-state.state';
import { DefaultState } from './services/types/default-state';
import { DomElements } from '../../types/dom-elements/dom-elements';
import { getDomElements } from '../../utils/get-dom-elements';

type HttpPolling = {
    start: () => void;
};

export function HttpPolling(appRootNode: HTMLElement): HttpPolling {
    const defaultStateData = createDefaultState();
    let domElements: DomElements | null = null;

    const initStateDataPromise: Promise<DefaultState> = (async () => {
        await defaultStateData.init();
        return defaultStateData.getState();
    })();

    async function renderInitialMarkUp() {
        try {
            const initStateData = await initStateDataPromise;
            appRootNode.innerHTML = template(initStateData);
        } catch (error) {
            appRootNode.innerHTML = '<p>Failed to load data. Please try again later.</p>';
            throw error;
        }
    }

    function checkBoxClickHandler() {
        if (!domElements) return;

        fromEvent(domElements?.catsCheckBox, 'click').subscribe(() => {
            domElements?.text.classList.remove('active');
            domElements?.picture.classList.remove('picture--hide');
        });

        fromEvent(domElements?.meatsCheckBox, 'click').subscribe(() => {
            domElements?.text.classList.add('active');
            domElements?.picture.classList.add('picture--hide');
        });
    }

    // lifecycle pattern fetch data → render HTML → select elements → attach listeners
    async function initializeUI() {
        await renderInitialMarkUp();
        domElements = getDomElements();
        checkBoxClickHandler();
    }

    async function start() {
        await initializeUI();
    }

    const state = {
        start,
    };

    return Object.assign({}, state);
}

import template from './http-polling.hbs';
import { createDefaultState } from './state/default-state.state';
import { DefaultState } from './services/types/default-state';
import { loadESLint } from 'eslint';

type HttpPolling = {
    start: () => void;
};

export function HttpPolling(appRootNode: HTMLElement): HttpPolling {
    let initStateData: DefaultState | null = null;
    const defaultStateData = createDefaultState();

    async function loadDefaultStateData() {
        await defaultStateData.init();
        initStateData = defaultStateData.getState();
    }

    function renderInitialMarkUp() {
        if (!initStateData) {
            appRootNode.innerHTML = '<p>Failed to load data. Please try again later.</p>';
            return;
        }

        appRootNode.innerHTML = template(initStateData);
    }

    async function setInitMarkUp() {
        await loadDefaultStateData();
        renderInitialMarkUp();
    }

    async function start() {
        await setInitMarkUp();
    }

    const state = {
        start,
    };

    return Object.assign({}, state);
}

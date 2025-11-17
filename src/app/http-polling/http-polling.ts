import template from './http-polling.hbs';
import { createDefaultState } from './state/default-state.state';
import { DefaultState } from './services/types/default-state';

type HttpPolling = {
    start: () => void;
};

export function HttpPolling(appRootNode: HTMLElement): HttpPolling {
    const defaultStateData = createDefaultState();

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
        }
    }

    async function start() {
        await renderInitialMarkUp();
    }

    const state = {
        start,
    };

    return Object.assign({}, state);
}

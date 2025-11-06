import { getDefaultState } from '../services/end-points/default-state-api.service';
import type { DefaultState } from '../services/types/default-state';

export function createDefaultState() {
    let defaultState: DefaultState | null = null;

    async function init() {
        try {
            defaultState = await getDefaultState();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function getState() {
        return defaultState;
    }

    return {
        init,
        getState,
    };
}

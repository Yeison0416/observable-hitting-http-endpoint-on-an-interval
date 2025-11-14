import { httpGet } from '../api/http-client';
import type { DefaultState } from '../types/default-state';

export async function getDefaultState(): Promise<DefaultState> {
    return await httpGet<DefaultState>('/default-state');
}

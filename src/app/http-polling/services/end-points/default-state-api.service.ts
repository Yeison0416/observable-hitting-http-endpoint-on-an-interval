import type { DefaultState } from '../types/default-state';
import { getUrl } from '../../../../utils/get-url';
import { httpGet } from '../api/http-client';

export async function getDefaultState(): Promise<DefaultState> {
    const url = getUrl('defaultStateApi');
    return await httpGet<DefaultState>(url);
}

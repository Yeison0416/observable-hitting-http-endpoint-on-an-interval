import { getUrl } from '../../../../utils/get-url';
import { httpGet } from '../api/http-client';
import type { CatState } from '../types/cat.state';

export async function getCats(): Promise<CatState> {
    const url = getUrl('catApi');
    return await httpGet<CatState>(url);
}

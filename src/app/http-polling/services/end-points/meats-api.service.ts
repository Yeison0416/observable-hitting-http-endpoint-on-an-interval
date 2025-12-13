import { getUrl } from '../../../../utils/get-url';
import { httpGet } from '../api/http-client';
import type { MeatParagraph } from '../types/meat.state';

export async function getMeats(): Promise<MeatParagraph> {
    const url = getUrl('meatApi');
    return await httpGet<MeatParagraph>(url);
}

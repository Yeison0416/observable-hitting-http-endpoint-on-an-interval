type UrlId = 'defaultStateApi' | 'meatApi' | 'catApi';

export function getUrl(urlId: UrlId): string {
    const urls: Record<UrlId, string> = {
        defaultStateApi: 'api/default-state',
        meatApi: 'https://baconipsum.com/api/?type=meat-and-filler',
        catApi: 'https://api.thecatapi.com/v1/images/search?limit=1',
    };

    return urls[urlId];
}

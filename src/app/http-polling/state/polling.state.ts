import type { CatState } from '../services/types/cat.state';
import { getCats } from '../services/end-points/cats-api.service';
import { RequestCategory } from '../../../types/request-category/request-category';
import { selectionState$ } from './selection.state';
import { getMeats } from '../services/end-points/meats-api.service';
import type { MeatParagraph } from '../services/types/meat.state';
import { from, Observable, Subject, switchMap, takeUntil, timer } from 'rxjs';

// Ensure CatState has the correct property
export function pollingState() {
    const MEAT_API = 'meatApi' as const;

    let requestCategory: RequestCategory;

    const stopPolling$ = new Subject<void>();

    selectionState$.subscribe((category: RequestCategory) => {
        requestCategory = category;
    });

    const fetchCatsData: () => Observable<string> = () => {
        return from(
            getCats()
                .then((catData: CatState) => catData[0].url)
                .catch((error) => {
                    console.error('Error fetching cats data:', error);
                    return 'Error fetching cats data';
                })
        );
    };

    const fetchMeatsData: () => Observable<string> = () => {
        return from(
            getMeats()
                .then((meatsData: MeatParagraph) => String(meatsData))
                .catch((error) => {
                    console.error('Error fetching meats data:', error);
                    return 'Error fetching meats data';
                })
        );
    };

    const fetchFunctions: Record<RequestCategory, () => Observable<string>> = {
        meatApi: fetchMeatsData,
        catApi: fetchCatsData,
    };

    function requestData(): Observable<string> {
        return fetchFunctions[requestCategory]();
    }

    function startPolling(interval: number = 5000): Observable<string> {
        return timer(0, interval).pipe(
            switchMap(() => requestData()),
            takeUntil(stopPolling$)
        );
    }

    function stopPolling(): void {
        stopPolling$.next();
    }

    const state = {
        startPolling,
        stopPolling,
    };

    return Object.assign({}, state);
}

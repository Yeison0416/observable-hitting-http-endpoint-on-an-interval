import { BehaviorSubject } from 'rxjs';
import { RequestCategory } from '../../../types/request-category/request-category';

function selectionState(RequestCategory: RequestCategory) {
    const requestCategorySubject$ = new BehaviorSubject<RequestCategory>(RequestCategory);

    const state = {
        subscribe: (callback: (requestCategory: RequestCategory) => void) => requestCategorySubject$.subscribe(callback),
        getState: () => requestCategorySubject$.getValue(),
        update: (newRequestCategory: RequestCategory) => requestCategorySubject$.next(newRequestCategory),
    };

    return Object.assign({}, state);
}

export const selectionState$ = selectionState('catApi');

import { Action } from '@ngrx/store';
import { Toolbar } from './model';

export enum ToolbarActionTypes {
    ADD_TOOLBAR = '[TOOLBAR] ADD'
}

export function addLinksToolbar(model: Toolbar) {
    return {
        type: ToolbarActionTypes.ADD_TOOLBAR,
        payload: model
    };
}

export class ToolbarLinkAddAction implements Action {
    readonly type = ToolbarActionTypes.ADD_TOOLBAR;
    constructor(public payload: Toolbar) { }
}

export type All =
    ToolbarLinkAddAction;

import * as ToolbarActions from './action';
import { ToolbarActionTypes } from './action';
import { Toolbar } from './model';

export type Action = ToolbarActions.All;

export interface State {
  toolbarLinks: Toolbar[];
}

export const initialState: State = {
  toolbarLinks: []
};

export function toolbarReducer(
  state = initialState,
  action: ToolbarActions.All
): State {
  switch (action.type) {
    case ToolbarActionTypes.ADD_TOOLBAR: {
      state.toolbarLinks.push(action.payload);
      return Object.assign({}, state);
    }
    default: {
      return state;
    }
  }
}

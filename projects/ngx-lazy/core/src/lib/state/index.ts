import { toolbarReducer } from './reducer';
import { Toolbar } from './model';
export { addLinksToolbar } from './action';

export const ROOT_REDUCER: IRootReducer = {
  toolbar: toolbarReducer
};

export interface IRootReducer {
  toolbar: any;
}

export interface AppState {
  toolbar: Toolbar[];
}

import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { commonReducer, ICommonSliceState } from './reducers';

export interface IState {
  common: ICommonSliceState,
}

export const reducers: ActionReducerMap<IState> = {
  common: commonReducer,
};


export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];

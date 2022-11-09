import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { commonReducer, ICommonSliceState } from './reducers';
import { boardReducer, IBoardSliceState } from './reducers/boards-reducer';

export interface IState {
  common: ICommonSliceState,
  boards: IBoardSliceState,
}

export const reducers: ActionReducerMap<IState> = {
  common: commonReducer,
  boards: boardReducer,
};


export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];

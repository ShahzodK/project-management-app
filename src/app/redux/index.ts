import {
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { commonReducer, ICommonSliceState } from './reducers';
import { boardReducer, IBoardSliceState } from './reducers/boards-reducer';
import { ICurrentBoardSliceState, currentBoardReducer } from './reducers/current-board-reducer';
import { currentColumnsReducer, ICurrentColumnsSliceState } from './reducers/current-columns-reducer';

export interface IState {
  common: ICommonSliceState,
  boards: IBoardSliceState,
  currentBoard: ICurrentBoardSliceState,
  currentColumns: ICurrentColumnsSliceState,
}

export const reducers: ActionReducerMap<IState> = {
  common: commonReducer,
  boards: boardReducer,
  currentBoard: currentBoardReducer,
  currentColumns: currentColumnsReducer,
};


export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];

import { AuthRoutePaths } from '../../auth/models/routes.model';
import { AppRoutePaths } from '../models/routes.model';

export const FullRoutePaths = {
  LOGIN: `${AppRoutePaths.AUTH}/${AuthRoutePaths.LOGIN}`,
  SIGN_UP: `${AppRoutePaths.AUTH}/${AuthRoutePaths.SIGN_UP}`,
  BOARD: `${AppRoutePaths.BOARD}/:id`,
  EDIT_PROFILE: AppRoutePaths.EDIT_PROFILE,
  MAIN: AppRoutePaths.MAIN,
};

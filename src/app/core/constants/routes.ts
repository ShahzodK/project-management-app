import { AuthRoutePaths } from '../../auth/enums/routes.enum';
import { AppRoutePaths } from '../enums/routes.enum';

export const FullRoutePaths = {
  LOGIN: `${AppRoutePaths.AUTH}/${AuthRoutePaths.LOGIN}`,
  SIGN_UP: `${AppRoutePaths.AUTH}/${AuthRoutePaths.SIGN_UP}`,
  BOARD: `${AppRoutePaths.BOARD}/:id`,
  EDIT_PROFILE: AppRoutePaths.EDIT_PROFILE,
  MAIN: AppRoutePaths.MAIN,
};

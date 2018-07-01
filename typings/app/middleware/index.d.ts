// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import Access from '../../../app/middleware/access';
import CheckJwt from '../../../app/middleware/checkJwt';
import ErrorHandler from '../../../app/middleware/errorHandler';
import NotFoundHandler from '../../../app/middleware/notFoundHandler';
import UserDeserialize from '../../../app/middleware/userDeserialize';
import Uuid from '../../../app/middleware/uuid';

declare module 'egg' {
  interface IMiddleware {
    access: typeof Access;
    checkJwt: typeof CheckJwt;
    errorHandler: typeof ErrorHandler;
    notFoundHandler: typeof NotFoundHandler;
    userDeserialize: typeof UserDeserialize;
    uuid: typeof Uuid;
  }
}

import { Dispatch, Middleware, MiddlewareAPI } from 'redux';

const exists = (action: any): boolean => action !== undefined && action !== null;

const isObject = (action: any): boolean => exists(action) && typeof action === 'object';

const actionToPlainObjectConverter: Middleware = ({ getState, dispatch }: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (isObject(action)) {
    return next({ ...action });
  }

  throw new Error(`action must be an object: ${JSON.stringify(action)}`);
};

export default actionToPlainObjectConverter;

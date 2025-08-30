// timerMiddleware.js
import { resetRequests } from "./counterSlice.js";

let reduxTimer = null;

const timerMiddleware = store => next => action => {
  if (action.type === resetRequests.type) {
    if (reduxTimer) {
      clearTimeout(reduxTimer);
    }

    reduxTimer = setTimeout(() => {
      store.dispatch(resetRequests());
    }, 1000 * 60); // دقيقة
  }

  return next(action);
};

export default timerMiddleware;

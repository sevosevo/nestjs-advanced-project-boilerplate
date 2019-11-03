import { combineReducers } from 'redux';
import { registerReducer } from './register.reducer';
import { alertReducer } from './alert.reducer';

export const rootReducer = combineReducers({
    register: registerReducer,
    alert: alertReducer
});
export default rootReducer;
export type AppState = ReturnType<typeof rootReducer>;
import { all } from 'redux-saga/effects';
import { registerSaga } from './register.saga';

export default function* () {
    yield all([
        registerSaga()
    ]);
}
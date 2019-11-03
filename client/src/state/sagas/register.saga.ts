import { take, fork, call, cancel, put, delay, cancelled } from 'redux-saga/effects';
import { REGISTER_REQUEST, REGISTER_FAIL, REGISTER_STOP_REQUEST } from '../constants';
import { register_success, register_fail, register_stop_run } from '../actions/register.action';
import { UserForm } from '../interfaces/register.interface';
import { createAlert } from '../thunks/alert.thunk';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';

function _register(username: string, email: string, password: string) {
    return axios.post('/api/auth/register', {
        username,
        email,
        password
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
function* registerUser(username: string, email: string, password: string) {
    try {

        yield delay(3000);

        const response = yield call(_register, username, email, password);

        yield put(register_success(response.body.token));

    } catch (error) {

        const messages = errorHandler(error);
        
        yield put(register_fail(messages));

    } finally {
        if (yield cancelled()) {

            yield put(register_stop_run());

        }
    }
}
export function* registerSaga() {
    while (true) {

        const { formData: { username, email, password } }: { formData: UserForm } = yield take(REGISTER_REQUEST);

        const task = yield fork(registerUser, username, email, password);

        const action = yield take([REGISTER_FAIL, REGISTER_STOP_REQUEST]);

        const id = uuidv4();

        if (action.type === REGISTER_STOP_REQUEST) {

            yield cancel(task);

            if (action.sendAlert)

                yield put(createAlert({
                    id,
                    message: 'Register process stopped',
                    classToHave: 'btn btn-warning',
                    expiresIn: 4000
                }));

        }

        if (action.type === REGISTER_FAIL) 

            yield put(createAlert({
                id,
                message: 'Register failed',
                classToHave: 'btn btn-danger',
                expiresIn: 4000
            }));
        
    }
}

import { UserState } from '../interfaces/register.interface';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_STOP_RUN } from '../constants';
import { Reducer, AnyAction } from 'redux';

const initialState = {
    userInfo: null,
    isFetching: false,
    errors: []
};

export const registerReducer: Reducer<UserState, AnyAction> = (state = initialState, action: any) => {
    switch(action.type) {
        case REGISTER_REQUEST: {
            return {
                ...state,
                userInfo: null,
                isFetching: true
            }
        }
        case REGISTER_SUCCESS: {
            return {
                userInfo: action.user,
                isFetching: false,
                errors: []
            }
        }
        case REGISTER_FAIL: {
            return {
                userInfo: null,
                isFetching: false,
                errors: action.messages
            }
        }
        case REGISTER_STOP_RUN: {
            return {
                ...state,
                isFetching: false,
                errors: []
            }
        }
    }
    return state;
};
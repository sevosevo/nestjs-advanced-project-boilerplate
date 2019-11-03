import { REGISTER_FAIL, REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_STOP_REQUEST, REGISTER_STOP_RUN } from '../constants';
import { Action } from "redux";

export interface User {
    email: string;
    username: string;
};

export interface UserForm extends User {
    password: string;
};

export interface UserState {
    userInfo: User | null;
    isFetching: boolean;
    errors: any[];
};

export interface RegisterRequestAction extends Action<typeof REGISTER_REQUEST> {
    formData: UserForm;
};

export interface RegisterSuccessAction extends Action<typeof REGISTER_SUCCESS> {
    token: string;
};

export interface RegisterFailAction extends Action<typeof REGISTER_FAIL> { 
    messages: any[];
};

export interface RegisterStopAction extends Action<typeof REGISTER_STOP_REQUEST> {
    sendAlert: boolean;
};

export interface RegisterStopRunAction extends Action<typeof REGISTER_STOP_RUN> { };
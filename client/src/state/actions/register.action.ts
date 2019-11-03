import { RegisterRequestAction, UserForm, RegisterStopAction, RegisterFailAction, RegisterSuccessAction, RegisterStopRunAction } from "../interfaces/register.interface";
import { REGISTER_REQUEST, REGISTER_STOP_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, REGISTER_STOP_RUN } from "../constants";



export const register = (formData: UserForm): RegisterRequestAction => ({
    type: REGISTER_REQUEST,
    formData: formData
});

export const register_stop = (sendAlert: boolean = true): RegisterStopAction => ({
    type: REGISTER_STOP_REQUEST,
    sendAlert
});

export const register_success = (token: string): RegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    token
});

export const register_fail = (messages: any[]): RegisterFailAction => ({
    type: REGISTER_FAIL,
    messages 
});

export const register_stop_run = (): RegisterStopRunAction => ({
    type: REGISTER_STOP_RUN
});
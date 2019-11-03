import { Action } from "redux";
import { CREATE_ALERT, REMOVE_ALERT } from '../constants';

export interface AlertState {
    alerts: Array<AlertForm>;
}

export interface AlertForm {
    expiresIn: number;
    classToHave: string;
    message: string;
    id: string;
};

export interface CreateAlertAction extends Action<typeof CREATE_ALERT>{
    alert: AlertForm;
};

export interface DeleteAlertAction extends Action<typeof REMOVE_ALERT>{
    id: string;
}


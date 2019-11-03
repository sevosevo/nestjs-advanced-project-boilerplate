import { Dispatch } from "react";
import { AlertForm, CreateAlertAction, DeleteAlertAction, AlertState } from "../interfaces/alert.interface";
import { CREATE_ALERT, REMOVE_ALERT } from "../constants";
import { ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

const createAlertActionCreator: ActionCreator<CreateAlertAction> = (message: string, classToHave: string, id: string, expiresIn) => ({
    type: CREATE_ALERT,
    alert: {
        expiresIn,
        id,
        classToHave,
        message
    }
});
const clearAlertActionCreator: ActionCreator<DeleteAlertAction> = (id: string) => ({
    type: REMOVE_ALERT,
    id
});

export const createAlert: ActionCreator<
ThunkAction<void, AlertState, {}, AnyAction>
> = ({message, expiresIn, classToHave, id} : AlertForm) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(createAlertActionCreator(message, classToHave, id));
    setTimeout(() => {
        dispatch(clearAlertActionCreator(id));
    }, expiresIn);
}
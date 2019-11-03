import { AlertState } from '../interfaces/alert.interface';
import { Reducer, AnyAction } from 'redux';
import { CREATE_ALERT, REMOVE_ALERT } from '../constants';

const initialState = {
    alerts: []
};

export const alertReducer: Reducer<AlertState, AnyAction> = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_ALERT: {
            return {
                alerts: [
                    ...state.alerts,
                    action.alert   
                ]
            }
        }
        case REMOVE_ALERT: {
            return {
                alerts: state.alerts.filter(alert => alert.id !== action.id)
            }
        } 
    }
    return state;
};
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../state/reducers/root.reducer';
import { AlertState } from '../../state/interfaces/alert.interface';
import { Alert } from './Alert';

interface Props {
    alert: AlertState
}

const mapStateToProps = (state: AppState) => ({
    alert: state.alert
});

export const Alerts = connect(mapStateToProps)(function Alerts({alert}) {
    return (
        <div className="container text-center">
            {
                alert.alerts.map(alert => <Alert {...alert}/>)
            }
        </div>
    )
} as React.FC<Props>);

export default Alerts;
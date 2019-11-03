import { AlertForm } from "../../state/interfaces/alert.interface"
import React from 'react';

export const Alert: React.FC<AlertForm> = ({ classToHave, message }) => {
    return (
        <div className={classToHave}>
            {
                message
            }
        </div>
    )
}
export default Alert;
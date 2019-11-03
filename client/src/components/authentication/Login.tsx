import React, { ChangeEvent, createRef } from 'react';
import { FormChange } from '../../interfaces/formChange.interface';

interface State {
    email: string;
    password: string;
}
interface Props { }


export class Login extends React.Component<Props, State> implements FormChange {

    modalRef = createRef<HTMLDivElement>();

    state = {
        email: '',
        password: ''
    };

    handleFormChange = (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ev.target.name]: ev.target.value
        } as Pick<State, keyof State>);
    };

    handleSubmit = (ev: React.FormEvent<HTMLInputElement>) => {
        if (this.modalRef.current) {
            $(this.modalRef.current).modal('hide');
        }
    };

    render() {
        const { email, password } = this.state;
        return (
            <div className="modal" role="dialog" id="login" ref={this.modalRef}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="email1">Email:</label>
                                        <input id="email1" type="text" name="email" value={email} onChange={this.handleFormChange} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password1">Password:</label>
                                        <input id="password1" type="password" name="password" value={password} onChange={this.handleFormChange} className="form-control" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="button" className="btn btn-primary" value="Login" onClick={this.handleSubmit} />
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};

export default Login;


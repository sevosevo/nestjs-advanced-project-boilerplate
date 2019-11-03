import React, { ChangeEvent, createRef, RefObject } from 'react';
import { FormChange } from '../../interfaces/formChange.interface';
import { connect } from 'react-redux';
import { AppState } from '../../state/reducers/root.reducer';
import { UserState } from '../../state/interfaces/register.interface';
import { register, register_stop } from '../../state/actions/register.action';
import { Alerts } from '../alert/Alerts';

interface State {
    username: string;
    password: string;
    email: string;
}
interface Props {
    register: typeof register;
    register_stop: typeof register_stop;
    reg: UserState;
}

const mapStateToProps = (state: AppState) => ({
    reg: state.register
});
const mapDispatchToProps = { register, register_stop };

export const Register = connect(mapStateToProps, mapDispatchToProps)(class Register extends React.Component<Props, State> implements FormChange {

    modalRef: RefObject<HTMLDivElement> = createRef();

    state = {
        username: '',
        password: '',
        email: ''
    };

    handleFormChange = (ev: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [ev.target.name]: ev.target.value
        } as Pick<State, keyof State>);
    };

    handleClose = (ev: React.FormEvent<HTMLButtonElement>) => {
        if (this.modalRef.current) {
            $(this.modalRef.current).modal('hide');
        }
    };

    handleSubmit = (ev: React.FormEvent<HTMLButtonElement>) => {
        this.props.register(this.state);
    };

    loading = <div className="bg-warning text-center">
        <img className="mr-2" src="/loading.gif" alt="this slowpoke moves" width="35px" />
        Please wait while we register you...
        <button className="btn btn-link ml-2" onClick={() => this.stopRegister(true)}>
            Stop
        </button>
    </div>;

    stopRegister = (bool: boolean) => {
        if (this.props.reg.isFetching)
            this.props.register_stop(bool);
    }

    render() {
        const { username, password, email } = this.state;
        return (
            <div className="modal" role="dialog" id="register" ref={this.modalRef}>
                <div className="mt-4">
                    <Alerts />
                </div>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Register</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.stopRegister(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username">Username:</label>
                                        <input id="username" type="text" name="username" className="form-control" value={username} onChange={this.handleFormChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email2">Email:</label>
                                        <input id="email2" type="text" name="email" className="form-control" value={email} onChange={this.handleFormChange} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password2">Password:</label>
                                        <input id="password2" type="password" name="password" className="form-control" value={password} onChange={this.handleFormChange} />
                                    </div>
                                </form>
                            </div>
                            {
                                this.props.reg.errors.length > 0 && <div>
                                    {
                                        this.props.reg.errors.map(error => <small className="text-danger" style={{ display: 'block' }}>{error}</small>)
                                    }
                                </div>
                            }
                        </div>
                        {
                            this.props.reg.isFetching ? this.loading : null
                        }
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Register</button>
                            <button type="button" className="btn btn-secondary" onClick={() => this.stopRegister(false)} data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

export default Register;

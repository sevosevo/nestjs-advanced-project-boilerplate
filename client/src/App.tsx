import React from 'react';
import { 
    BrowserRouter, 
    Route, 
    Switch 
} from 'react-router-dom';
import { MainNav } from './components/navigation/MainNav';
import { Profile } from './components/profile/Profile';
import { Provider } from 'react-redux';
import store from './store';

export const App: React.FC = () => (
    <Provider store={store}>
        <BrowserRouter>
        <MainNav/>
            <Switch>
                <Route path="/profile/me" component={Profile} />
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default App;

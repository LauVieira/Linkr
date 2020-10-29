import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Header from '../components/Header';
import LoginPage from '../pages/LoginPage';
import Timeline from '../pages/Timeline';
import UserPage from '../pages/UserPage';
import {UserContextProvider} from '../contexts/UserContext';

export default function App () {
    return (    
        <Router>
            <Switch>
                <UserContextProvider>
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/timeline' exact>
                        <Header />
                        <Timeline />
                    </Route>
                    <Route path='/user/:id' exact>
                        <Header />
                        <UserPage />
                    </Route>
                </UserContextProvider>
            </Switch>
        </Router>
    );
}
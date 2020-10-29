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
import MyPostsPage from '../pages/MyPosts';

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
                    <Route path='/my-posts' exact>
                        <Header />
                        <MyPostsPage />
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

/*
 src/components/App.js    |  6 +++++
 src/components/Header.js |  2 +-
 src/pages/MyPosts.js     | 60 ++++++++++++++++++++++++++++++++++++++++++++++++
 src/pages/UserPage.js    |  2 +-

 */
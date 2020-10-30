import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HashtagPage from '../pages/HashtagPage';
import Header from '../components/Header';
import LoginPage from '../pages/LoginPage';
import MyPostsPage from '../pages/MyPostsPage';
import TimelinePage from '../pages/TimelinePage';
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
                        <TimelinePage />
                    </Route>
                    <Route path='/my-posts' exact>
                        <Header />
                        <MyPostsPage />
                    </Route>
                    <Route path='/user/:id' exact>
                        <Header />
                        <UserPage />
                    </Route>
                    <Route path='/hashtag/:hashtag' exact>
                        <Header />
                        <HashtagPage />
                    </Route>
                </UserContextProvider>
            </Switch>
        </Router>
    );
}
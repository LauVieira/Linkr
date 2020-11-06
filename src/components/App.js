import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import HashtagPage from '../pages/HashtagPage';
import LoginPage from '../pages/LoginPage';
import MyLikesPage from '../pages/MyLikesPage';
import MyPostsPage from '../pages/MyPostsPage';
import TimelinePage from '../pages/TimelinePage';
import UserPage from '../pages/UserPage';
import { UserContextProvider } from '../contexts/UserContext';
import { FollowingContextProvider } from '../contexts/FollowingContext';

export default function App () {
    
    return (    
        <Router>
            <Switch>
                <UserContextProvider>
                    <FollowingContextProvider>
                        <Route path='/' exact component={LoginPage} />
                        <Route path='/timeline' exact component={TimelinePage} />
                        <Route path='/my-likes' exact component={MyLikesPage} />
                        <Route path='/my-posts' exact component={MyPostsPage} />
                        <Route path='/user/:id' exact component={UserPage} />
                        <Route path='/hashtag/:hashtag' exact component={HashtagPage} />
                    </FollowingContextProvider>
                </UserContextProvider>
            </Switch>
        </Router>
    );
}
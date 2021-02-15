import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import Home from './Home'
import MakeMeeting from './MakeMeeting';
import Meeting from './Meeting';

function App() {
  return (
    <main>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/make" component={MakeMeeting} />
            <Route path="/meeting/:meetCode" component={Meeting} />
        </Switch>
    </main>
)
}

export default App;

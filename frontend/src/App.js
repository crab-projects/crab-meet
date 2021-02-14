import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home'
import MakeMeeting from './MakeMeeting';

function App() {
  return (
    <main>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/make" component={MakeMeeting} />
        </Switch>
    </main>
)
}

export default App;

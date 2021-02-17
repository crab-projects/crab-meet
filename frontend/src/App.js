import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Home, MakeMeeting, Meeting, MeetingLogin } from './pages/index.js';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/make" component={MakeMeeting} />
        <Route path="/meetingLogin/:meetingID" component={MeetingLogin} />
        <Route
          path="/meeting/:meetingID/password/:password"
          component={Meeting}
        />
      </Switch>
    </main>
  );
}

export default App;

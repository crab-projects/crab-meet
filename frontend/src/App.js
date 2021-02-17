import React from "react";
import { Route, Switch, useParams } from "react-router-dom";

import Home from "./Home";
import MakeMeeting from "./MakeMeeting";
import MeetingLogin from "./MeetingLogin";
import Meeting from "./Meeting";

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

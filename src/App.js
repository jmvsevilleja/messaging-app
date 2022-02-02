import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SSO from './Login/sso'
import NectusLogin from './Login/nectus'
import Login from './Login';
import Chat from './Chat';
import NectusChat from './Chat/Nectus';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/*" element={
            <>
              <Login />
            </>
          }>
          </Route>
          <Route exact path="/login" element={
            <>
              <SSO />
            </>
          }>
          </Route>
          <Route path="nectus-login/*" element={
            <>
              <NectusLogin />
            </>
          }></Route>
          <Route path="chat/*" element={
            <>
              <Chat />
            </>
          }>
          </Route>
          <Route path="nectus-chat/*" element={
            <>
              <NectusChat />
            </>
          }>
          </Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SSO from './Login/sso'
import NectusLogin from './Login/nectus'
import Login from './Login';
import Chat from './Chat';
import Email from './Email';
import NectusChat from './Chat/Nectus';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<SSO />}></Route>
          <Route exact path="/nectus-login" element={<NectusLogin />}></Route>
          <Route exact path="/chat" element={<Chat />}></Route>
          <Route exact path="/email" element={<Email />}></Route>
          <Route exact path="/nectus-chat" element={<NectusChat />}></Route>
          <Route exact path="/*" element={<Login />}></Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;

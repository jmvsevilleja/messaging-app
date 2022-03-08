import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SSO from './Login/sso'
import NectusLogin from './Login/nectus'
import Login from './Login';
import Chat from './Chat';
import Gmail from './Gmail';
import Outlook from './Outlook';
import Icloud from './Icloud';
import Clinica from './Clinica';
import NectusChat from './Chat/Nectus';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsAndCondition from './Pages/TermsAndCondition';
import Disclaimer from './Pages/Disclaimer';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/login" element={<SSO />}></Route>
          <Route exact path="/nectus-login" element={<NectusLogin />}></Route>
          <Route exact path="/chat" element={<Chat />}></Route>
          <Route exact path="/gmail" element={<Gmail />}></Route>
          <Route exact path="/outlook" element={<Outlook />}></Route>
          <Route exact path="/icloud" element={<Icloud />}></Route>
          <Route exact path="/clinica" element={<Clinica />}></Route>
          <Route exact path="/nectus-chat" element={<NectusChat />}></Route>
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route exact path="/terms-and-condition" element={<TermsAndCondition />}></Route>
          <Route exact path="/disclaimer" element={<Disclaimer />}></Route>
          <Route exact path="/*" element={<Login />}></Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;

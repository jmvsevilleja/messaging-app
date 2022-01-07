import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SSO from './Login/sso'
import Login from './Login';
import Chat from './Chat';
import './App.css';

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
          <Route path="chat/*" element={
            <>
              <Chat />
            </>
          }>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

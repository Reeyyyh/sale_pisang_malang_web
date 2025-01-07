import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar selalu ditampilkan */}
        <div className="container mt-4">
          <Switch>
            <Route exact path="/" render={() => <div><h1>Halaman Utama</h1></div>} />
            <Route path="/login" render={() => <div><h1>Login Page</h1></div>} />
            <Route path="/register" render={() => <div><h1>Register Page</h1></div>} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

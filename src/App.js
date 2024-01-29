import React, { useState } from 'react';
import Registration from './components/Auth/Registration';
import Login from './components/Auth/Login';
import Dashboard from './components/Auth/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [currentScreen, setCurrentScreen] = useState(null);

  const switchToRegistration = () => {
    setCurrentScreen('registration');
  };

  const switchToLogin = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {currentScreen ? (
            <div className="form-container">
              <Routes>
                <Route
                  path="/"
                  element={
                    currentScreen === 'registration' ? (
                      <Registration switchToLogin={switchToLogin} />
                    ) : (
                      <Login onLogin={handleLogin} />
                    )
                  }
                />
              </Routes>
            </div>
          ) : (
            <div className="button-container">
              <button onClick={switchToRegistration}>Inscription</button>
              <button onClick={switchToLogin}>Connexion</button>
            </div>
          )}
        </header>
       
      </div>
    </Router>
  );
}

export default App;

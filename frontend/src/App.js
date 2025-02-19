import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RideBooking from './pages/RideBooking';
import RideHistory from './pages/RideHistory';
import Profile from './pages/Profile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<RideBooking />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

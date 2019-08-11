import React from 'react';
import Home from './components/Home';
import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Home />
      </div>
    </div>
  );
}

export default App;
import React from 'react';
import Header from './components/Header';
import Arena from './components/Arena';

const App = () => {
  return (
    <div>
      <Header/>
      <div className="main-container">
        <Arena/>
      </div>
    </div>
  );
};

export default App;
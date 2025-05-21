import React from'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateRoom from './pages/CreateRoom';
import JoinRoom from './pages/JoinRoom';
function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CreateRoom/>}></Route>
            <Route path='/join' element={<JoinRoom/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

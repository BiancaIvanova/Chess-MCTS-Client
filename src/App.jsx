import { useState, useEffect } from 'react'
import api from '.api/axiosConfig'

import './App.css'
import { GitHubLink, DarkTheme } from './FloatingUI';
import Chessboard from './Chessboard';

function App()
{
  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <>
    <Chessboard/>
    <GitHubLink/>
    {/* <DarkTheme toggleTheme={toggleTheme} /> */}
    </>
  )
}

export default App

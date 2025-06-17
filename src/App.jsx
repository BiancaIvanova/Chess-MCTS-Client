import { useState, useEffect } from 'react'
import api from '.api/axiosConfig'

import './App.css'
import { GitHubLink, SideMenuButton, ThemeToggle } from './FloatingUI';
import Chessboard from './Chessboard';
import ControlPanel from './ControlPanel';

function App()
{
  return (
    <>
      <div className="app-main">
        <div className="board-wrapper">
          <Chessboard/>
        </div>
        <ControlPanel/>
      </div>
      
      <GitHubLink/>
      <ThemeToggle/>
      <SideMenuButton/>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import api from '.api/axiosConfig'

import './App.css'
import { GitHubLink, ThemeToggle } from './FloatingUI';
import Chessboard from './Chessboard';

function App()
{
  return (
    <>
    <Chessboard/>
    <GitHubLink/>
    <ThemeToggle/>
    </>
  )
}

export default App

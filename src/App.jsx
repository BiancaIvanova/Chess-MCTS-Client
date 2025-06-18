import { useState } from 'react'
import './App.css'
import { GitHubLink, SideMenuButton, ThemeToggle } from './FloatingUI';
import Chessboard from './Chessboard';
import ControlPanel from './ControlPanel';
import ErrorDisplay from './ErrorDisplay';
import { useUIState } from './UIStateContext';
 
function App() {
  const { blocked } = useUIState(); // blocked = show loading/error
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
      {/* Show overlay when in 'blocked' state */}
      {blocked && (
        <ErrorDisplay
          loading={loading}
          message={errorText || ''}
          subMessage={errorText ? 'If this message persists, check your API server or try refreshing.' : ''}
          showMessage={showMessage}
        />
      )}

      <div
        className="app-main"
        style={{ visibility: blocked ? 'hidden' : 'visible' }}
        aria-hidden={blocked ? 'true' : 'false'}
      >
        <div className="board-wrapper">
          <Chessboard setLoading={setLoading} setErrorText={setErrorText} setShowMessage={setShowMessage} />
        </div>
        <ControlPanel />
      </div>

      {/* Keep floating UI elements always visible and able to be interacted with */}
      <GitHubLink/>
      <ThemeToggle/>
      {!blocked && <SideMenuButton/>}
    </>
  )
}
 
export default App

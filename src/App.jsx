import { useState } from 'react';
import './App.css';
import { GitHubLink, SideMenuButton, ThemeToggle } from './floating/FloatingUI';
import Chessboard from './ui/Chessboard';
import ControlPanel from './ui/ControlPanel';
import SideMenu from './ui/SideMenu';
import ErrorDisplay from './status/ErrorDisplay';
import { useUIState } from './status/UIStateContext';

function App() {
  const { blocked } = useUIState();

  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('play');

  const handleSelectPage = (page) => {
    setCurrentPage(page);
    console.log('Selected page:', page);
  };

  return (
    <>
      {blocked && (
        <ErrorDisplay
          loading={loading}
          message={errorText || ''}
          subMessage={errorText ? 'If this message persists, check your API server or try refreshing.' : ''}
          showMessage={showMessage}
        />
      )}

      <SideMenu
        open={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        onSelectPage={handleSelectPage}
      />

      <div
        className="app-main"
        style={{ visibility: blocked ? 'hidden' : 'visible' }}
        aria-hidden={blocked ? 'true' : 'false'}
      >
        <Chessboard
          setLoading={setLoading}
          setErrorText={setErrorText}
          setShowMessage={setShowMessage}
        />

        <ControlPanel currentPage={currentPage} />
      </div>

      <GitHubLink />
      <ThemeToggle />

      {!blocked && (
        <SideMenuButton
          onClick={() => setSideMenuOpen(!sideMenuOpen)}
        />
      )}
    </>
  );
}

export default App;
import { useState } from 'react';
import './App.css';
import { GitHubLink, SideMenuButton, ThemeToggle } from './floating/FloatingUI';
import Chessboard from './ui/Chessboard';
import ControlPanel from './ui/ControlPanel';
import SideMenu from './ui/SideMenu';
import StartGameDialog from './ui/StartGameDialog';
import ErrorDisplay from './status/ErrorDisplay';
import { useUIState } from './status/UIStateContext';
import { startGame } from './api/gameApi';

function App() {
  const { blocked } = useUIState();

  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('play');
  const [startGameDialogOpen, setStartGameDialogOpen] = useState(false);

  const handleSelectPage = (page) => {
    if (page === 'play') {
      setStartGameDialogOpen(true);
      return;
    }

    setCurrentPage(page);
    console.log('Selected page:', page);
  };

  const handleStartGame = async (settings) => {
    try {
      await startGame(settings);

      setCurrentPage('play');
      setStartGameDialogOpen(false);
    } catch (error) {
      setErrorText('Unable to start game');
      setShowMessage(true);
    }
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

      <StartGameDialog
        open={startGameDialogOpen}
        onClose={() => setStartGameDialogOpen(false)}
        onStartGame={handleStartGame}
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
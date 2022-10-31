/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import logo from '../logo.svg';
import '../App.css';
import getMediaUrl from '../utils/helpers/getMediaUrl';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={`${getMediaUrl(logo)}`} className='App-logo' alt='logo' />
        <p>Hello, World!</p>
        <p>I'm a Popup!</p>
      </header>
    </div>
  );
}

export default App;

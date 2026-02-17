import React from 'react';
import './App.css';
import './styles/MediaLibrary.css';
import Header from './components/Header';
import UploadButton from './components/UploadButton';
import StatsPanel from './components/StatsPanel';
import SearchBar from './components/SearchBar';
import Notice from './components/Notice';
import MediaGrid from './components/MediaGrid';
import mockMedia from './data/mockMedia';

function App() {
  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <div className="page-top">
          <div className="page-left">
            <h1 className="page-title">Media Library</h1>
            <div className="page-sub">Storage for images, videos, logos, and backgrounds. Media must be used inside a Slide to be scheduled.</div>
          </div>
          <div className="page-right">
            <UploadButton />
          </div>
        </div>

        <StatsPanel items={mockMedia} />
        <Notice />
        <SearchBar />
        <MediaGrid items={mockMedia} />
      </main>
    </div>
  );
}

export default App;

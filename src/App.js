import React, { useEffect, useState } from 'react';
import './App.css';
import './styles/MediaLibrary.css';
import Header from './components/Header';
import UploadButton from './components/UploadButton';
import StatsPanel from './components/StatsPanel';
import SearchBar from './components/SearchBar';
import Notice from './components/Notice';
import MediaGrid from './components/MediaGrid';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './Services/Store/Store';
import { getAllMedia } from './Services/Slice/GetMediaSlice';
import { fetchToken } from './Services/Slice/AuthSlice';

function AppContent() {
  const dispatch = useDispatch();
  const { mediaList } = useSelector((state) => state.GetMedia);
  const user = JSON.parse(sessionStorage.getItem("liferayUser"));
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchToken());
  }, []);

  useEffect(() => {
    if (user?.groups?.[0]?.id) {
      dispatch(getAllMedia({ groupId: user.groups[0].id }));
    }
  }, [dispatch]);

  return (
    <>
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

        <StatsPanel items={mediaList || []} />
        <Notice />
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <MediaGrid items={(mediaList || []).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))} />
      </main>
    </>
  );
}

function App() {
  return (
    <div className="app-root">
      <Provider store={store}>
        <AppContent />
      </Provider>
    </div>
  );
}

export default App;

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
import { getAllMedia } from './Services/Slices/GetMediaSlice';
import { fetchToken } from './Services/Slices/AuthSlice';
import DisplayNav from "./components/DisplayNav";
import { LanguageProvider, useTranslation } from './Services/Localization/Localization';

function AppContent() {
  const { t, lang, setLanguage } = useTranslation();
  const dispatch = useDispatch();
  const { mediaList } = useSelector((state) => state.GetMedia);
  const { token, expiresIn, status, error } = useSelector((state) => state.auth);
  const user = JSON.parse(sessionStorage.getItem("liferayUser")) || {
    "userId": "24608",
    "fullName": "admin lahore",
    "email": "admin@lahore.com",
    "groups": [
      {
        "id": "24593",
        "name": "Municipility One"
      }
    ]
  };
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  useEffect(() => {
    if (token && expiresIn) {
      const refreshTime = (expiresIn - 60) * 1000;
      if (refreshTime > 0) {
        const timer = setTimeout(() => {
          console.log("Token expiring soon, refreshing...");
          dispatch(fetchToken());
        }, refreshTime);

        return () => clearTimeout(timer);
      }
    }
  }, [token, expiresIn, dispatch]);

  useEffect(() => {
    if (user?.groups?.[0]?.id && token) {
      dispatch(getAllMedia({ groupId: user.groups[0].id }));
    }
  }, [dispatch, token]);

  const isBootstrappingAuth = !token && (status === 'idle' || status === 'loading');
  if (isBootstrappingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 600 }}>Loading...</div>
      </div>
    );
  }

  if (!token && status === 'failed') {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#b91c1c' }}>
        <div>Failed to load token{error ? `: ${error}` : ''}</div>
      </div>
    );
  }

  return (
    <>
      <DisplayNav user={user} />
      <main className="container-fluid mt-3 pb-5">
        <div className="page-top">
          <div className="page-left">
            <h1 className="page-title">{t('mediaLibrary')}</h1>
            <div className="page-sub">{t('mediaLibraryDescription')}</div>
          </div>
          <div className="page-right">
            <UploadButton user={user} />
          </div>
        </div>

        <StatsPanel items={mediaList || []} />
        <Notice />
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <MediaGrid user={user} items={(mediaList || []).filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))} />
      </main>
    </>
  );
}

function App() {
  return (
    <LanguageProvider> {/* ✅ Wrap everything with LanguageProvider */}
      <Provider store={store}>
        <div className="app-root">
        <AppContent />
        </div>
      </Provider>
    </LanguageProvider>
  );
}

export default App;
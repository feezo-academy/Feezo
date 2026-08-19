import { useLocation } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import App from './App.jsx';

// App.jsx owns its own <Routes> internally with absolute paths
// (/home, /students, /admin/... etc.), so we deliberately do NOT nest a
// new <Routes>/<Route path="/*"> around it here — that would change how
// its paths are matched. Instead we just decide, before App ever mounts,
// whether this request is for the public landing page or the app itself.
// Nothing inside App.jsx or its existing routes is touched.
export default function RootRouter() {
  const location = useLocation();
  if (location.pathname === '/welcome') {
    return <LandingPage />;
  }
  return <App />;
}

import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Cover from './pages/Cover';
import About from './pages/About';
import Project from './pages/Project';
import Learning from './pages/Learning';
import Exhibits from './pages/Exhibits';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Cover />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/exhibits" element={<Exhibits />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

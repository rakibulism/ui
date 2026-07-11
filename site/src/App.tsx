import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { Home } from './pages/Home';
import { Components } from './pages/Components';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
      </Route>
    </Routes>
  );
}

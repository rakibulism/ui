import { Route, Routes } from 'react-router-dom';
import { Layout } from './layout';
import { Home } from './pages/Home';
import { Components } from './pages/Components';
import { DocsLayout } from './pages/DocsLayout';
import { DocsIndex } from './pages/DocsIndex';
import { ComponentDoc } from './pages/ComponentDoc';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsIndex />} />
          <Route path="components/:slug" element={<ComponentDoc />} />
        </Route>
      </Route>
    </Routes>
  );
}

import { NavLink, Outlet } from 'react-router-dom';
import { CATALOG } from '../catalog';

export function DocsLayout() {
  return (
    <div className="docs-shell">
      <aside className="docs-sidebar">
        <div className="docs-sidebar-label">Components</div>
        <nav className="docs-sidebar-nav">
          {CATALOG.map((entry) => (
            <NavLink
              key={entry.id}
              to={`/docs/components/${entry.id}`}
              className={({ isActive }) => 'docs-sidebar-link' + (isActive ? ' docs-sidebar-link-active' : '')}
            >
              {entry.name}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="docs-content">
        <Outlet />
      </div>
    </div>
  );
}

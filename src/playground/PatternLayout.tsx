import { useMemo, useState } from 'react';
import type { PatternRoute } from './routes';

function groupRoutesByCategory(routes: PatternRoute[]) {
  return routes.reduce<Record<string, PatternRoute[]>>((groups, route) => {
    groups[route.category] = [...(groups[route.category] ?? []), route];
    return groups;
  }, {});
}

export function PatternLayout({ routes }: { routes: PatternRoute[] }) {
  const [selectedSlug, setSelectedSlug] = useState(routes[0]?.slug ?? '');
  const selectedRoute = useMemo(() => routes.find((route) => route.slug === selectedSlug) ?? routes[0], [routes, selectedSlug]);
  const Example = selectedRoute.Component;
  const groupedRoutes = useMemo(() => groupRoutesByCategory(routes), [routes]);

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Pattern navigation">
        <div className="brand-block">
          <span className="eyebrow">Frontend Patterns Lab</span>
          <h1>실무 패턴 플레이북</h1>
        </div>
        <nav className="pattern-nav">
          {Object.entries(groupedRoutes).map(([category, categoryRoutes]) => (
            <section key={category}>
              <h2>{category}</h2>
              {categoryRoutes.map((route) => (
                <button key={route.slug} className={route.slug === selectedRoute.slug ? 'active' : ''} onClick={() => setSelectedSlug(route.slug)}>
                  {route.title}
                </button>
              ))}
            </section>
          ))}
        </nav>
      </aside>
      <section className="content-panel">
        <header className="pattern-header">
          <span className="eyebrow">{selectedRoute.category}</span>
          <h2>{selectedRoute.title}</h2>
          <p>{selectedRoute.summary}</p>
        </header>
        <Example />
      </section>
    </main>
  );
}

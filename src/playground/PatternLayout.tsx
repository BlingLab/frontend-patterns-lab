import { useMemo, useState } from 'react';
import type { PatternRoute } from './routes';

function groupRoutesByCategory(routes: PatternRoute[]) {
  return routes.reduce<Record<string, PatternRoute[]>>((groups, route) => {
    groups[route.category] = [...(groups[route.category] ?? []), route];
    return groups;
  }, {});
}

type Tab = 'example' | 'bad';

export function PatternLayout({ routes }: { routes: PatternRoute[] }) {
  const [selectedSlug, setSelectedSlug] = useState(routes[0]?.slug ?? '');
  const [activeTab, setActiveTab] = useState<Tab>('example');

  const selectedRoute = useMemo(
    () => routes.find((r) => r.slug === selectedSlug) ?? routes[0],
    [routes, selectedSlug],
  );
  const groupedRoutes = useMemo(() => groupRoutesByCategory(routes), [routes]);

  function selectPattern(slug: string) {
    setSelectedSlug(slug);
    setActiveTab('example');
  }

  const Example = selectedRoute.Component;
  const BadCase = selectedRoute.BadCase;

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Pattern navigation">
        <div className="brand-block">
          <span className="eyebrow">Frontend Patterns Lab</span>
          <h1>React 실무 패턴</h1>
        </div>
        <nav className="pattern-nav">
          {Object.entries(groupedRoutes).map(([category, categoryRoutes]) => (
            <section key={category}>
              <h2>{category}</h2>
              {categoryRoutes.map((route) => (
                <button
                  key={route.slug}
                  className={route.slug === selectedRoute.slug ? 'active' : ''}
                  onClick={() => selectPattern(route.slug)}
                >
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
          <span className="english-title">{selectedRoute.englishTitle}</span>
          <p>{selectedRoute.summary}</p>
        </header>

        {selectedRoute.whyMatters && (
          <div className="insight-box">
            <h4>왜 필요한가</h4>
            <p>{selectedRoute.whyMatters}</p>
            {selectedRoute.keyPoints && selectedRoute.keyPoints.length > 0 && (
              <ul className="key-points">
                {selectedRoute.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {BadCase && (
          <div className="tab-bar">
            <button
              className={`tab-btn${activeTab === 'example' ? ' active' : ''}`}
              onClick={() => setActiveTab('example')}
            >
              좋은 예
            </button>
            <button
              className={`tab-btn${activeTab === 'bad' ? ' active' : ''}`}
              onClick={() => setActiveTab('bad')}
            >
              나쁜 예
            </button>
          </div>
        )}

        {activeTab === 'example' || !BadCase ? <Example /> : <BadCase />}
      </section>
    </main>
  );
}

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
  const [query, setQuery] = useState('');

  const selectedRoute = useMemo(
    () => routes.find((r) => r.slug === selectedSlug) ?? routes[0],
    [routes, selectedSlug],
  );
  const filteredRoutes = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('ko-KR');

    if (!keyword) return routes;

    return routes.filter((route) =>
      [route.title, route.englishTitle, route.category, route.summary]
        .join(' ')
        .toLocaleLowerCase('ko-KR')
        .includes(keyword),
    );
  }, [query, routes]);
  const groupedRoutes = useMemo(() => groupRoutesByCategory(filteredRoutes), [filteredRoutes]);

  function selectPattern(slug: string) {
    setSelectedSlug(slug);
    setActiveTab('example');
  }

  const Example = selectedRoute.Component;
  const BadCase = selectedRoute.BadCase;
  const routeId = selectedRoute.slug.replace(/[^a-z0-9_-]/gi, '-');
  const exampleTabId = `${routeId}-example-tab`;
  const badTabId = `${routeId}-bad-tab`;
  const panelId = `${routeId}-panel`;

  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Pattern navigation">
        <div className="brand-block">
          <span className="eyebrow">Frontend Patterns Lab</span>
          <h1>React 실무 패턴</h1>
        </div>
        <label className="nav-search">
          <span>패턴 검색</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="예: 상태, memo, form"
          />
        </label>
        <p className="result-count">{filteredRoutes.length}개 패턴</p>
        <nav className="pattern-nav">
          {filteredRoutes.length === 0 ? (
            <p className="empty-nav">검색 결과가 없습니다.</p>
          ) : (
            Object.entries(groupedRoutes).map(([category, categoryRoutes]) => (
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
            ))
          )}
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
          <div className="tab-bar" role="tablist" aria-label={`${selectedRoute.title} 예제 비교`}>
            <button
              id={exampleTabId}
              role="tab"
              aria-selected={activeTab === 'example'}
              aria-controls={panelId}
              className={`tab-btn${activeTab === 'example' ? ' active' : ''}`}
              onClick={() => setActiveTab('example')}
            >
              좋은 예
            </button>
            <button
              id={badTabId}
              role="tab"
              aria-selected={activeTab === 'bad'}
              aria-controls={panelId}
              className={`tab-btn${activeTab === 'bad' ? ' active' : ''}`}
              onClick={() => setActiveTab('bad')}
            >
              나쁜 예
            </button>
          </div>
        )}

        <div
          id={panelId}
          className="demo-panel"
          role={BadCase ? 'tabpanel' : undefined}
          aria-labelledby={BadCase ? (activeTab === 'example' ? exampleTabId : badTabId) : undefined}
        >
          {activeTab === 'example' || !BadCase ? <Example /> : <BadCase />}
        </div>
      </section>
    </main>
  );
}

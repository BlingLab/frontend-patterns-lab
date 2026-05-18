import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

type EmptyMode = 'first-use' | 'filtered';

export default function EmptyStateExample() {
  const [mode, setMode] = useState<EmptyMode>('first-use');

  const isFiltered = mode === 'filtered';

  return (
    <Card title="빈 상태" eyebrow="UI 상태 표현 / 좋은 예">
      <p>빈 이유를 구분하고, 사용자가 다음에 할 수 있는 행동을 바로 제공합니다.</p>
      <div className="demo-row" role="group" aria-label="빈 상태 유형">
        <button className={`button small${!isFiltered ? '' : ' secondary'}`} type="button" onClick={() => setMode('first-use')}>
          최초 빈 상태
        </button>
        <button className={`button small${isFiltered ? '' : ' secondary'}`} type="button" onClick={() => setMode('filtered')}>
          필터 결과 없음
        </button>
      </div>
      <div className="demo-box">
        <strong>{isFiltered ? '조건에 맞는 프로젝트가 없습니다.' : '아직 프로젝트가 없습니다.'}</strong>
        <p>
          {isFiltered
            ? '검색어와 상태 필터를 초기화하면 더 많은 프로젝트를 볼 수 있습니다.'
            : '첫 프로젝트를 만들면 일정, 담당자, 진행 상태를 한 화면에서 관리할 수 있습니다.'}
        </p>
        <button className="button small" type="button">
          {isFiltered ? '필터 초기화' : '프로젝트 만들기'}
        </button>
      </div>
      <div className="example-surface">
        <div>
          <strong>빈 이유 분리</strong>
          <span>최초 빈 상태와 필터 결과 없음을 서로 다른 문구와 액션으로 다룹니다.</span>
        </div>
        <div>
          <strong>다음 행동</strong>
          <span>사용자가 빈 화면에서 바로 벗어날 수 있는 create/reset 액션을 제공합니다.</span>
        </div>
      </div>
    </Card>
  );
}

import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

export default function PropsGetterBadCase() {
  const [on, setOn] = useState(false);

  return (
    <Card title="props getter 패턴" eyebrow="컴포넌트 조합 / 나쁜 예">
      <p>호출부가 접근성 props와 내부 이벤트를 매번 직접 조합합니다.</p>
      <div className="example-surface">
        <div>
          <strong>즐겨찾기</strong>
          <button
            className="button"
            aria-pressed={on}
            onClick={() => {
              console.log('analytics: favorite clicked');
              setOn((value) => !value);
            }}
          >
            {on ? '즐겨찾는 중' : '즐겨찾기'}
          </button>
        </div>
        <div>
          <strong>문제</strong>
          <span>다른 화면에서 aria-pressed나 이벤트 순서를 빠뜨리기 쉽습니다.</span>
        </div>
      </div>
    </Card>
  );
}

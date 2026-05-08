import { useState, useRef } from 'react';
import { Card } from '../../../shared/components/Card';

export default function UseThrottleBadCase() {
  const rawCount = useRef(0);
  const [, forceUpdate] = useState(0);

  // ❌ throttle 없이 모든 이벤트 처리
  function handleEvent() {
    rawCount.current += 1;
    forceUpdate((n) => n + 1);
    // 실제로는 여기서 DOM 조작, 상태 업데이트, API 호출이 일어남
  }

  function simulateScrollEvents() {
    for (let i = 0; i < 20; i++) {
      setTimeout(handleEvent, i * 50);
    }
  }

  return (
    <Card title="throttle 훅" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>
        스크롤 이벤트가 50ms 간격으로 20번 발생하면 <strong>20번 모두 처리</strong>됩니다.
        실제 scroll/mousemove는 초당 60번 이상 발생합니다.
        throttle 없이 DOM 조작이나 API 호출을 하면 프레임 드랍이 생깁니다.
      </p>
      <div style={{ marginTop: 16 }}>
        <button className="button" onClick={simulateScrollEvents}>이벤트 20개 발생 시뮬레이션</button>
        <div style={{ marginTop: 12, fontSize: 14 }}>
          <p style={{ margin: 0, color: '#dc2626', fontWeight: 600 }}>throttle 없이 처리됨</p>
          <p style={{ margin: '4px 0 0' }}>이벤트 횟수: <strong style={{ color: '#dc2626' }}>{rawCount.current}회</strong></p>
        </div>
        <p style={{ fontSize: 13, color: '#dc2626', marginTop: 8 }}>
          ⚠ 20번 이벤트가 모두 처리됩니다. 실제 앱에서는 수백 번의 불필요한 연산이 발생합니다.
        </p>
      </div>
    </Card>
  );
}

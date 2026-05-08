import { useState, useRef, useCallback } from 'react';
import { Card } from '../../../shared/components/Card';

function useThrottle<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
  const lastCall = useRef(0);
  return useCallback((...args: T) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      fn(...args);
    }
  }, [fn, delay]);
}

export default function UseThrottleExample() {
  const [scrollY, setScrollY] = useState(0);
  const [throttledY, setThrottledY] = useState(0);
  const rawCount = useRef(0);
  const throttledCount = useRef(0);
  const [, forceUpdate] = useState(0);

  const throttledHandler = useThrottle(() => {
    throttledCount.current += 1;
    setThrottledY(window.scrollY);
    forceUpdate((n) => n + 1);
  }, 200);

  function handleScroll() {
    rawCount.current += 1;
    setScrollY(window.scrollY);
    throttledHandler();
  }

  function simulateScrollEvents() {
    for (let i = 0; i < 20; i++) {
      setTimeout(handleScroll, i * 50); // 50ms 간격으로 20번 이벤트
    }
  }

  return (
    <Card title="throttle 훅" eyebrow="훅과 로직 재사용 / 좋은 예">
      <p>
        스크롤 이벤트가 50ms 간격으로 20번 발생해도 <strong>200ms마다 최대 1번</strong>만 처리합니다.
        버튼을 눌러 20개의 이벤트를 시뮬레이션하세요.
      </p>
      <div style={{ marginTop: 16 }}>
        <button className="button" onClick={simulateScrollEvents}>이벤트 20개 발생 시뮬레이션</button>
        <div style={{ marginTop: 12, display: 'flex', gap: 24, fontSize: 14 }}>
          <div>
            <p style={{ margin: 0, color: '#dc2626', fontWeight: 600 }}>throttle 없이</p>
            <p style={{ margin: '4px 0 0' }}>이벤트 횟수: <strong>{rawCount.current}회</strong></p>
          </div>
          <div>
            <p style={{ margin: 0, color: '#16a34a', fontWeight: 600 }}>throttle 적용</p>
            <p style={{ margin: '4px 0 0' }}>실행 횟수: <strong>{throttledCount.current}회</strong></p>
          </div>
        </div>
        <p style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>
          20번 이벤트 중 throttle이 최대 {Math.ceil(20 * 50 / 200)}번만 실행됩니다 (200ms 간격).
        </p>
      </div>
    </Card>
  );
}

import { ReactNode, useState } from 'react';
import { Card } from '../../../shared/components/Card';

type ToggleStateProps = {
  children: (state: { on: boolean; toggle: () => void }) => ReactNode;
};

function ToggleState({ children }: ToggleStateProps) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn((value) => !value);

  return <>{children({ on, toggle })}</>;
}

export default function RenderPropsExample() {
  return (
    <Card title="렌더 프롭스" eyebrow="컴포넌트 조합 / 좋은 예">
      <p>ToggleState는 상태와 명령만 제공하고, 렌더링은 호출부 함수가 결정합니다.</p>
      <ToggleState>
        {({ on, toggle }) => (
          <div className="example-surface">
            <div>
              <strong>상태 표시</strong>
              <span>{on ? '기능이 활성화되어 있습니다.' : '기능이 비활성화되어 있습니다.'}</span>
            </div>
            <div>
              <strong>액션</strong>
              <button className="button" onClick={toggle}>
                {on ? '끄기' : '켜기'}
              </button>
            </div>
          </div>
        )}
      </ToggleState>
    </Card>
  );
}

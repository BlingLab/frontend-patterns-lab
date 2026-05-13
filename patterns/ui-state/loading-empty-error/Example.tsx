import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { StateView } from './StateView';
import type { ListState } from './StateView';

const states: ListState[] = ['loading', 'error', 'empty', 'success'];
const invoices = ['INV-1024 결제 완료', 'INV-1025 검토 중', 'INV-1026 발송 대기'];

export default function LoadingEmptyErrorExample() {
  const [state, setState] = useState<ListState>('success');

  function retry() {
    setState('loading');
    window.setTimeout(() => setState('success'), 600);
  }

  return (
    <Card title="로딩/빈 상태/에러" eyebrow="UI 상태 표현 / 좋은 예">
      <p>요청 상태를 하나의 모델로 두고 loading, error, empty, success를 같은 위치에서 분기합니다.</p>
      <div className="demo-row" role="group" aria-label="상태 선택">
        {states.map((item) => (
          <button
            className={`button small${state === item ? '' : ' secondary'}`}
            type="button"
            key={item}
            onClick={() => setState(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <StateView
        state={state}
        errorMessage="네트워크가 불안정해 청구서 목록을 가져오지 못했습니다."
        onRetry={retry}
        onCreate={() => setState('success')}
      >
        <div className="demo-box">
          {invoices.map((invoice) => (
            <div className="list-item" key={invoice}>
              <span>{invoice}</span>
              <span className="badge badge-green">정상</span>
            </div>
          ))}
        </div>
      </StateView>
      <div className="example-surface">
        <div>
          <strong>명시적 상태</strong>
          <span>불가능한 조합 없이 현재 화면 상태가 하나로 결정됩니다.</span>
        </div>
        <div>
          <strong>복구 행동</strong>
          <span>에러에는 다시 시도, 빈 상태에는 생성 액션처럼 다음 행동을 둡니다.</span>
        </div>
      </div>
    </Card>
  );
}

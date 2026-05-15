import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

export default function DuplicatedLoadingStateBadCase() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isError, setIsError] = useState(false);

  function startRequest() {
    setIsLoading(true);
  }

  function markSuccess() {
    setIsSuccess(true);
  }

  function markError() {
    setIsError(true);
  }

  return (
    <Card title="중복 로딩 상태" eyebrow="안티패턴 / 나쁜 예">
      <p>같은 요청을 여러 boolean으로 나누면 이전 상태를 끄는 코드를 빠뜨리기 쉽습니다.</p>
      <div className="demo-box">
        <div className="demo-row">
          <button className="button small secondary" type="button" onClick={startRequest}>
            요청 시작
          </button>
          <button className="button small" type="button" onClick={markSuccess}>
            성공 표시
          </button>
          <button className="button danger small" type="button" onClick={markError}>
            실패 표시
          </button>
        </div>
        <div className="demo-row">
          <span className="state-chip">isLoading={String(isLoading)}</span>
          <span className="state-chip">isSuccess={String(isSuccess)}</span>
          <span className="state-chip">isError={String(isError)}</span>
        </div>
        {isLoading && <p role="status">저장 중입니다...</p>}
        {isSuccess && <p className="badge badge-green">저장이 완료되었습니다.</p>}
        {isError && <p role="alert" className="badge badge-red">서버 저장에 실패했습니다.</p>}
      </div>
      <div className="example-surface">
        <div>
          <strong>충돌 상태</strong>
          <span>요청 시작과 실패 표시를 누르면 저장 중, 완료, 실패가 동시에 나타납니다.</span>
        </div>
        <div>
          <strong>문제 지점</strong>
          <span>각 boolean을 따로 끄고 켜야 해서 불가능한 조합을 타입으로 막지 못합니다.</span>
        </div>
      </div>
    </Card>
  );
}

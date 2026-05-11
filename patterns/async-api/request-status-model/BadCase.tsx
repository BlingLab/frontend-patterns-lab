import { useState } from 'react';
import { Button } from '../../../shared/components/Button';
import { Card } from '../../../shared/components/Card';

export default function RequestStatusModelBadCase() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  function createImpossibleState() {
    setIsLoading(true);
    setIsSuccess(true);
    setIsError(true);
  }

  function reset() {
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  }

  return (
    <Card title="요청 상태 모델" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>요청 상태를 여러 boolean으로 쪼개면 동시에 true가 될 수 없는 값들도 표현됩니다.</p>

      <div className="demo-box">
        <div className="demo-row">
          <span className="badge badge-gray">isLoading: {String(isLoading)}</span>
          <span className="badge badge-gray">isSuccess: {String(isSuccess)}</span>
          <span className="badge badge-gray">isError: {String(isError)}</span>
        </div>

        {isLoading && <p>로딩 중입니다.</p>}
        {isSuccess && <p>성공했습니다.</p>}
        {isError && <p className="field-error">실패했습니다.</p>}

        <div className="demo-row">
          <Button onClick={createImpossibleState}>불가능한 상태 만들기</Button>
          <Button className="button secondary" onClick={reset}>초기화</Button>
        </div>
      </div>
    </Card>
  );
}

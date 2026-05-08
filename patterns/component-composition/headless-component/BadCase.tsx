import { useState } from 'react';
import { Card } from '../../../shared/components/Card';

function FavoriteButton() {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      className="button"
      aria-pressed={pressed}
      onClick={() => setPressed((value) => !value)}
    >
      {pressed ? '즐겨찾는 중' : '즐겨찾기'}
    </button>
  );
}

export default function HeadlessComponentBadCase() {
  return (
    <Card title="헤드리스 컴포넌트" eyebrow="컴포넌트 조합 / 나쁜 예">
      <p>동작과 버튼 표현이 묶여 있어 카드형 토글이나 아이콘형 토글로 재사용하기 어렵습니다.</p>
      <div className="example-surface">
        <div>
          <strong>고정된 표현</strong>
          <FavoriteButton />
        </div>
      </div>
    </Card>
  );
}

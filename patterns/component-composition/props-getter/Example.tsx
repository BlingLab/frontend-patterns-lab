import { Card } from '../../../shared/components/Card';
import { useToggle } from './useToggle';

export default function PropsGetterExample() {
  const favorite = useToggle();

  return (
    <Card title="Props Getter" eyebrow="컴포넌트 조합 / Example">
      <p>getToggleProps가 접근성 props와 내부 이벤트를 제공하면서 호출부 이벤트도 보존합니다.</p>
      <div className="example-surface">
        <div>
          <strong>즐겨찾기</strong>
          <button
            {...favorite.getToggleProps({
              className: 'button',
              onClick: () => console.log('analytics: favorite clicked'),
            })}
          >
            {favorite.on ? '즐겨찾는 중' : '즐겨찾기'}
          </button>
        </div>
        <div>
          <strong>상태</strong>
          <span>{favorite.on ? 'aria-pressed=true' : 'aria-pressed=false'}</span>
        </div>
      </div>
    </Card>
  );
}

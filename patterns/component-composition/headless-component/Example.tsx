import { ButtonHTMLAttributes, MouseEvent, useState } from 'react';
import { Card } from '../../../shared/components/Card';

function useToggleButton(defaultPressed = false) {
  const [pressed, setPressed] = useState(defaultPressed);

  function getButtonProps(props: ButtonHTMLAttributes<HTMLButtonElement> = {}) {
    return {
      ...props,
      'aria-pressed': pressed,
      onClick(event: MouseEvent<HTMLButtonElement>) {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          setPressed((value) => !value);
        }
      },
    };
  }

  return { pressed, getButtonProps };
}

export default function HeadlessComponentExample() {
  const favorite = useToggleButton();
  const notification = useToggleButton(true);

  return (
    <Card title="헤드리스 컴포넌트" eyebrow="컴포넌트 조합 / 좋은 예">
      <p>훅은 토글 동작과 접근성 props만 제공하고, 호출부가 버튼 표현을 결정합니다.</p>
      <div className="example-surface">
        <div>
          <strong>즐겨찾기</strong>
          <button className="button" {...favorite.getButtonProps()}>
            {favorite.pressed ? '즐겨찾는 중' : '즐겨찾기'}
          </button>
        </div>
        <div>
          <strong>알림</strong>
          <button className="button" {...notification.getButtonProps()}>
            {notification.pressed ? '알림 켜짐' : '알림 꺼짐'}
          </button>
        </div>
      </div>
    </Card>
  );
}

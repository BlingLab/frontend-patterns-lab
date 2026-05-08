import { Card } from '../../../shared/components/Card';
import Container from './Container';

export default function ContainerPresenterExample() {
  return (
    <Card title="컨테이너/프리젠터" eyebrow="컴포넌트 조합 / 좋은 예">
      <p>Container는 데이터를 view model로 준비하고 Presenter는 props만 받아 화면을 그립니다.</p>
      <Container />
    </Card>
  );
}

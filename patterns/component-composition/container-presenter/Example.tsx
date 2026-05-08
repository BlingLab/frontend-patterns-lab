import { Card } from '../../../shared/components/Card';
import Container from './Container';

export default function ContainerPresenterExample() {
  return (
    <Card title="Container Presenter" eyebrow="컴포넌트 조합 / Example">
      <p>Container는 데이터를 view model로 준비하고 Presenter는 props만 받아 화면을 그립니다.</p>
      <Container />
    </Card>
  );
}

import { Card } from '../../../shared/components/Card';
import Container from './Container';

export default function ContainerPresenterExample() {
  return (
    <Card title="컨테이너/프리젠터" eyebrow="컴포넌트 조합 / 좋은 예">
      <p>Container는 데이터를 view model로 준비하고 Presenter는 props만 받아 화면을 그립니다.</p>
      <Container />
      <p className="mt-12">
        API 응답 구조, 선택 상태, 표시 문구 변환은 Container에 머물고 Presenter는 테스트 가능한 화면 컴포넌트로
        남습니다.
      </p>
    </Card>
  );
}

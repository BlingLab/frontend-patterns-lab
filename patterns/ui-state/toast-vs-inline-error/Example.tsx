import { Card } from '../../../shared/components/Card';

export default function ToastVsInlineErrorExample() {
  return (
    <Card title="토스트 vs 인라인 오류" eyebrow="UI 상태 표현 / 좋은 예">
      <p>오류 성격에 따라 toast와 inline 메시지를 선택합니다.</p>
      <div className="example-surface">
        <div>
          <strong>상황</strong>
          <span>요구사항이 커질 때 책임 경계를 명확히 해야 합니다.</span>
        </div>
        <div>
          <strong>판단</strong>
          <span>변경 이유, 재사용 범위, 테스트 단위를 기준으로 적용합니다.</span>
        </div>
      </div>
    </Card>
  );
}

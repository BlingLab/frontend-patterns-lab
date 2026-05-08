import { Card } from '../../../shared/components/Card';

export default function ServerErrorMappingBadCase() {
  return (
    <Card title="서버 오류 매핑" eyebrow="폼과 검증 / 나쁜 예">
      <p>서버 오류를 필드 오류와 전역 오류로 매핑합니다.</p>
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

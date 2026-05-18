import { Card } from '../../../shared/components/Card';

export default function HookCompositionBadCase() {
  return (
    <Card title="훅 조합" eyebrow="훅과 로직 재사용 / 나쁜 예">
      <p>작은 훅을 조합해 더 큰 도메인 훅을 만듭니다.</p>
      <div className="example-surface">
        <div>
          <strong>빠진 기준</strong>
          <span>useDebounce + useAsync + useUrlState → useProductSearch</span>
        </div>
        <div>
          <strong>실무 비용</strong>
          <span>하나의 거대한 훅이 검색어 debounce, URL 동기화, API 호출, 에러 처리를 모두 하면 재사용과 테스트가 어렵습니다.</span>
        </div>
      </div>
    </Card>
  );
}

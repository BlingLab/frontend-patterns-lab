import { Card } from '../../../shared/components/Card';

function ActionButton({ children }: { children: string }) {
  return <button className="button">{children}</button>;
}

function LinkButton({ href, children }: { href: string; children: string }) {
  return (
    <a className="button" href={href}>
      {children}
    </a>
  );
}

export default function PolymorphicComponentBadCase() {
  return (
    <Card title="Polymorphic Component" eyebrow="컴포넌트 조합 / Bad Case">
      <p>시각적으로 같은 버튼 스타일을 여러 컴포넌트가 중복해서 구현합니다.</p>
      <div className="example-surface">
        <div>
          <strong>Action</strong>
          <ActionButton>저장</ActionButton>
        </div>
        <div>
          <strong>Navigation</strong>
          <LinkButton href="/settings">설정으로 이동</LinkButton>
        </div>
      </div>
    </Card>
  );
}

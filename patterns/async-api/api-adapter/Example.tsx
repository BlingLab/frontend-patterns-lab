import { Card } from '../../../shared/components/Card';
import { adaptUsers } from './adapter';
import type { ApiUser } from './types';

const response: ApiUser[] = [
  {
    id: 101,
    email_address: 'seoyeon@example.com',
    profile: { name: '김서연', department_name: 'Product' },
    flags: { is_blocked: false, email_verified: true },
    created_at: '2026-02-10T09:00:00.000Z',
  },
  {
    id: 102,
    email_address: 'doyun@example.com',
    profile: { name: '이도윤', department_name: 'Engineering' },
    flags: { is_blocked: false, email_verified: false },
    created_at: '2026-03-18T09:00:00.000Z',
  },
];

const users = adaptUsers(response);

const badgeClassName = {
  green: 'badge-green',
  yellow: 'badge-yellow',
  red: 'badge-red',
};

export default function ApiAdapterExample() {
  return (
    <Card title="API 어댑터" eyebrow="비동기와 API 상태 / 좋은 예">
      <p>서버 응답은 adapter에서 UI 모델로 바꾼 뒤 컴포넌트에 넘깁니다.</p>

      <div className="demo-box">
        {users.map((user) => (
          <div className="list-item" key={user.id}>
            <div>
              <strong>{user.displayName}</strong>
              <span>{user.email} · {user.department} · 가입 {user.joinedAtLabel}</span>
            </div>
            <span className={`badge ${badgeClassName[user.statusTone]}`}>{user.statusLabel}</span>
          </div>
        ))}
      </div>

      <p className="mt-12">
        서버가 `email_address`나 `profile.department_name` 같은 구조를 바꿔도 수정 지점은 adapter로 좁아집니다.
        화면 컴포넌트는 표시 모델만 알면 됩니다.
      </p>
    </Card>
  );
}

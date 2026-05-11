import { Card } from '../../../shared/components/Card';
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

export default function ApiAdapterBadCase() {
  return (
    <Card title="API 어댑터" eyebrow="비동기와 API 상태 / 나쁜 예">
      <p>컴포넌트가 서버 응답의 중첩 구조와 snake_case 필드를 직접 알고 있습니다.</p>

      <div className="demo-box">
        {response.map((user) => {
          const status = user.flags.is_blocked ? '차단됨' : user.flags.email_verified ? '활성' : '이메일 확인 필요';
          const tone = user.flags.is_blocked ? 'badge-red' : user.flags.email_verified ? 'badge-green' : 'badge-yellow';

          return (
            <div className="list-item" key={user.id}>
              <div>
                <strong>{user.profile.name}</strong>
                <span>
                  {user.email_address} · {user.profile.department_name} · 가입{' '}
                  {new Intl.DateTimeFormat('ko-KR').format(new Date(user.created_at))}
                </span>
              </div>
              <span className={`badge ${tone}`}>{status}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-12">
        같은 변환이 여러 화면에 복사되면 API 스키마 변경이 UI 전체 변경으로 번집니다. 테스트할 순수 함수 경계도
        사라집니다.
      </p>
    </Card>
  );
}

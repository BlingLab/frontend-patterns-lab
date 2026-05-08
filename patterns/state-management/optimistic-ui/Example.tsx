import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

type Post = { id: number; title: string; liked: boolean; likes: number };

const INITIAL: Post[] = [
  { id: 1, title: 'React 18 동시성 기능 정리', liked: false, likes: 42 },
  { id: 2, title: 'TypeScript 5.0 변경사항', liked: true, likes: 87 },
  { id: 3, title: 'Vite vs Webpack 성능 비교', liked: false, likes: 31 },
];

export default function OptimisticUiExample() {
  const [posts, setPosts] = useState<Post[]>(INITIAL);
  const [pending, setPending] = useState<Set<number>>(new Set());

  async function toggleLike(id: number) {
    if (pending.has(id)) return;

    // ✅ 1. 즉시 UI 업데이트 (낙관적)
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p,
      ),
    );
    setPending((s) => new Set(s).add(id));

    try {
      await delay(800); // 서버 요청 시뮬레이션
      // 10% 확률로 실패
      if (Math.random() < 0.1) throw new Error('서버 오류');
    } catch {
      // ✅ 2. 실패 시 롤백
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p,
        ),
      );
    } finally {
      setPending((s) => { const next = new Set(s); next.delete(id); return next; });
    }
  }

  return (
    <Card title="낙관적 UI" eyebrow="상태 관리 / 좋은 예">
      <p>
        좋아요를 누르면 <strong>서버 응답 전에 즉시 UI가 바뀝니다</strong>.
        서버 요청은 백그라운드에서 진행되고, 실패 시에만 이전 상태로 되돌립니다.
        (10% 확률로 실패 — 롤백 동작을 확인해보세요)
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {posts.map((post) => (
          <div key={post.id} className="list-item">
            <span style={{ fontSize: 14 }}>{post.title}</span>
            <button
              onClick={() => toggleLike(post.id)}
              disabled={pending.has(post.id)}
              style={{
                background: 'none', border: 'none', cursor: pending.has(post.id) ? 'wait' : 'pointer',
                fontSize: 20, display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {pending.has(post.id) ? '⏳' : post.liked ? '❤️' : '🤍'}{' '}
              <span style={{ fontSize: 13 }}>{post.likes}</span>
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
}

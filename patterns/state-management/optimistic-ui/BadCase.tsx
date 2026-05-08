import { useState } from 'react';
import { Card } from '../../../shared/components/Card';
import { delay } from '../../../shared/utils/delay';

type Post = { id: number; title: string; liked: boolean; likes: number };

const INITIAL: Post[] = [
  { id: 1, title: 'React 18 동시성 기능 정리', liked: false, likes: 42 },
  { id: 2, title: 'TypeScript 5.0 변경사항', liked: true, likes: 87 },
  { id: 3, title: 'Vite vs Webpack 성능 비교', liked: false, likes: 31 },
];

export default function OptimisticUiBadCase() {
  const [posts, setPosts] = useState<Post[]>(INITIAL);
  const [loading, setLoading] = useState<number | null>(null);

  // ❌ 서버 응답을 기다린 후 UI 업데이트
  async function toggleLike(id: number) {
    if (loading === id) return;
    setLoading(id);

    try {
      await delay(800); // 서버 요청 시뮬레이션
      setPosts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p,
        ),
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <Card title="낙관적 UI" eyebrow="상태 관리 / 나쁜 예">
      <p>
        좋아요를 누르면 <strong>800ms 동안 로딩 상태</strong>가 표시됩니다.
        서버 응답이 오기 전까지 UI가 바뀌지 않아 인터랙션이 느리게 느껴집니다.
      </p>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {posts.map((post) => (
          <div key={post.id} className="list-item">
            <span style={{ fontSize: 14 }}>{post.title}</span>
            <button
              onClick={() => toggleLike(post.id)}
              disabled={loading === post.id}
              style={{
                background: 'none', border: 'none', cursor: loading === post.id ? 'wait' : 'pointer',
                fontSize: 20, display: 'flex', alignItems: 'center', gap: 4,
              }}
            >
              {loading === post.id ? '⏳' : post.liked ? '❤️' : '🤍'}{' '}
              <span style={{ fontSize: 13 }}>{post.likes}</span>
            </button>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 12, fontSize: 13, color: '#dc2626' }}>
        ⚠ 클릭 후 800ms 기다려야 UI가 반응합니다 — 낙관적 업데이트를 적용하면 즉시 반응합니다.
      </p>
    </Card>
  );
}

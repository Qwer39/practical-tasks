import { useState } from 'react';
import useApi from '../hooks/useApi';
import './PostList.css';

function PostList() {
  const [postId, setPostId] = useState('');
  const { 
    data: posts, 
    loading, 
    error, 
    refetch,
    status 
  } = useApi('https://jsonplaceholder.typicode.com/posts?_limit=10');

  const { 
    data: post,
    loading: postLoading,
    error: postError,
    refetch: refetchPost 
  } = useApi(
    postId ? `https://jsonplaceholder.typicode.com/posts/${postId}` : null
  );

  const handlePostIdChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 100) {
      setPostId(value);
    } else if (value === '') {
      setPostId('');
    }
  };

  const handleLoadRandomPost = () => {
    const randomId = Math.floor(Math.random() * 100) + 1;
    setPostId(randomId.toString());
  };

  if (loading) {
    return (
      <div className="post-list loading">
        <div className="loading-spinner large"></div>
        <p>Загрузка постов...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-list error">
        <h2>Ошибка при загрузке постов</h2>
        <p>{error}</p>
        <button onClick={refetch} className="retry-button">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list-header">
        <div>
          <h2>📝 Список постов</h2>
          <div className="status-indicator">
            Статус: <span className={`status-${status}`}>{status}</span>
          </div>
        </div>
        <button onClick={refetch} className="refresh-button">
          🔄 Обновить
        </button>
      </div>

      <div className="stats-bar">
        <div className="stat">
          <span className="stat-label">Всего постов:</span>
          <span className="stat-value">{posts?.length || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Загружено:</span>
          <span className="stat-value">{posts?.length || 0}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Статус:</span>
          <span className="stat-value status-success">✓ Активно</span>
        </div>
      </div>

      {/* Поиск конкретного поста */}
      <div className="post-search">
        <h3>🔍 Поиск поста по ID</h3>
        <div className="search-controls">
          <div className="input-group">
            <input
              type="number"
              min="1"
              max="100"
              value={postId}
              onChange={handlePostIdChange}
              placeholder="Введите ID поста (1-100)"
              className="post-id-input"
            />
            <button 
              onClick={handleLoadRandomPost}
              className="random-button"
            >
              🎲 Случайный пост
            </button>
          </div>
        </div>

        {postId && (
          <div className="post-detail-container">
            {postLoading ? (
              <div className="loading-indicator">
                <div className="loading-spinner small"></div>
                <p>Загрузка поста #{postId}...</p>
              </div>
            ) : postError ? (
              <div className="error-message">
                <p>Ошибка загрузки поста #{postId}: {postError}</p>
                <button onClick={refetchPost}>Повторить</button>
              </div>
            ) : post && (
              <div className="post-detail">
                <h4>Пост #{post.id}: {post.title}</h4>
                <p>{post.body}</p>
                <div className="post-meta">
                  <span>ID пользователя: {post.userId}</span>
                  <button 
                    onClick={() => setPostId('')}
                    className="close-button"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Список всех постов */}
      <div className="posts-container">
        <h3>📄 Все посты ({posts?.length || 0})</h3>
        <div className="posts-grid">
          {posts?.map(post => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <span className="post-id">#{post.id}</span>
                <span className="post-user">👤 User {post.userId}</span>
              </div>
              <h3 
                onClick={() => setPostId(post.id.toString())}
                className="post-title"
              >
                {post.title}
              </h3>
              <p className="post-body">
                {post.body.length > 100 
                  ? `${post.body.substring(0, 100)}...` 
                  : post.body}
                {post.body.length > 100 && (
                  <button 
                    onClick={() => setPostId(post.id.toString())}
                    className="read-more"
                  >
                    Читать полностью
                  </button>
                )}
              </p>
              <div className="post-footer">
                <button 
                  onClick={() => setPostId(post.id.toString())}
                  className="view-button"
                >
                  👁️ Посмотреть
                </button>
                <span className="post-length">
                  {post.body.length} символов
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {posts?.length === 0 && (
        <div className="empty-state">
          <p>Нет данных для отображения</p>
          <button onClick={refetch}>Загрузить посты</button>
        </div>
      )}
    </div>
  );
}

export default PostList;
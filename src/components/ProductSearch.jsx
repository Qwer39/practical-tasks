import { useState, useEffect, useRef } from 'react';
import './ProductSearch.css';

function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ total: 0, shown: 0 });

  const searchTimeoutRef = useRef(null);
  const abortControllerRef = useRef(null);

  const searchProducts = async (query) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);

      if (!query.trim()) {
        setProducts([]);
        setStats({ total: 0, shown: 0 });
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=20`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.products || []);
      setStats({
        total: data.total || 0,
        shown: (data.products || []).length
      });

    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
        console.error('Ошибка при поиске продуктов:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchProducts(value);
    }, 500);
  };

  const handleClear = () => {
    setSearchTerm('');
    setProducts([]);
    setStats({ total: 0, shown: 0 });
    setError(null);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <div className="product-search">
      <div className="search-header">
        <h2>🔍 Поиск продуктов</h2>
        <p>Используйте debounce (500ms) и отмену предыдущих запросов</p>
      </div>

      <div className="search-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Введите название продукта (например: iPhone, laptop, perfume)..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Поиск продуктов"
          />
          {searchTerm && (
            <button 
              onClick={handleClear} 
              className="clear-button"
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}
          {loading && (
            <div className="search-loading">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {stats.total > 0 && (
          <div className="search-stats">
            <span className="stat-item">
              📊 Всего найдено: <strong>{stats.total}</strong>
            </span>
            <span className="stat-item">
              👁️ Показано: <strong>{stats.shown}</strong>
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message" role="alert">
          <span className="error-icon">⚠️</span>
          <div>
            <strong>Ошибка:</strong> {error}
            <button onClick={() => searchProducts(searchTerm)} className="retry-button">
              Повторить
            </button>
          </div>
        </div>
      )}

      <div className="search-results">
        {products.length > 0 ? (
          <>
            <h3>Результаты поиска</h3>
            <div className="products-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="product-image"
                      loading="lazy"
                    />
                    {product.discountPercentage && (
                      <span className="discount-badge">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                  </div>
                  <div className="product-info">
                    <h4>{product.title}</h4>
                    <div className="product-meta">
                      <span className="product-category">{product.category}</span>
                      <span className="product-rating">
                        ⭐ {product.rating} ({product.stock} шт.)
                      </span>
                    </div>
                    <p className="product-description">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </p>
                    <div className="product-price">
                      <span className="current-price">
                        ${product.price}
                      </span>
                      {product.discountPercentage && (
                        <span className="original-price">
                          ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="product-tags">
                      <span className="tag brand">{product.brand}</span>
                      {product.tags?.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          searchTerm.trim() && !loading && !error && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>Продукты не найдены</h3>
              <p>Попробуйте изменить поисковый запрос</p>
              <button onClick={handleClear} className="btn-secondary">
                Очистить поиск
              </button>
            </div>
          )
        )}
      </div>

      {!searchTerm && !loading && (
        <div className="search-hint">
          <h4>💡 Попробуйте найти:</h4>
          <div className="hint-tags">
            <button onClick={() => setSearchTerm('laptop')}>laptop</button>
            <button onClick={() => setSearchTerm('phone')}>phone</button>
            <button onClick={() => setSearchTerm('beauty')}>beauty</button>
            <button onClick={() => setSearchTerm('fragrances')}>fragrances</button>
            <button onClick={() => setSearchTerm('skincare')}>skincare</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSearch;
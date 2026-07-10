import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS, CATEGORY_ICONS } from '../data/blogPosts';
import Toast from '../components/ui/Toast';

// Dev → Vite proxy forwards /api/* to http://localhost:5000
// Prod → set VITE_API_URL to your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/subscribe`
  : '/api/subscribe';

const CATEGORIES = ['All', ...new Set(BLOG_POSTS.map(p => p.category))];

export default function Blog() {
  const gridRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle'); // idle | loading
  const [toast, setToast] = useState(null);

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  // Re-run reveal-on-scroll whenever the filter changes — otherwise cards
  // newly mounted for a different category are never observed and stay hidden.
  useScrollReveal([selectedCategory]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscribeEmail }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error('Could not reach the server. Please try again later.');
      }

      if (res.ok && data.success) {
        setToast({ type: 'success', title: 'Subscribed!', message: "You're on the list — we'll send new posts as they go up." });
        setSubscribeEmail('');
      } else if (res.status === 422 && data.errors?.email) {
        setToast({ type: 'error', title: 'Invalid Email', message: data.errors.email });
      } else {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      const msg = err.message === 'Failed to fetch'
        ? 'Could not reach the server. Please check your connection or try again later.'
        : err.message;
      setToast({ type: 'error', title: 'Subscription Failed', message: msg });
    } finally {
      setSubscribeStatus('idle');
    }
  };

  return (
    <>
      {toast && (
        <Toast
          key={Date.now()}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      <Helmet>
        <title>Blog | Hemmingway Technologies</title>

        <meta
          name="description"
          content="Insights, technical articles, industry trends, and updates from Hemmingway Technologies on software engineering, artificial intelligence, cybersecurity, cloud computing, and digital innovation."
        />
      </Helmet>

      {/* ── CATEGORY FILTER ── */}
      <section className="blog-filters">
        <div className="container">
          <div className="filter-tabs">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section className="blog-section">
        <div className="container">
          <div ref={gridRef} className="blog-grid">
            {filteredPosts.map((post, i) => {
              const IconComponent = CATEGORY_ICONS[post.category];
              return (
                <article key={post.slug} className="blog-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="blog-card-header">
                    <span className="blog-emoji"><IconComponent size={24} /></span>
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="blog-footer">
                    <div className="blog-meta">
                      <span className="blog-author">{post.author}</span>
                      <span className="blog-date">{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="blog-read-time">{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="blog-link">Read →</Link>
                  </div>
                </article>
              );
            })}
          </div>
          {filteredPosts.length === 0 && (
            <div className="blog-empty">
              <p>No posts in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SUBSCRIBE ── */}
      <section className="blog-subscribe">
        <div className="container">
          <div className="subscribe-box">
            <h2>Stay Updated</h2>
            <p>Get new insights delivered to your inbox every week.</p>
            <form className="subscribe-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="your@email.com"
                value={subscribeEmail}
                onChange={e => setSubscribeEmail(e.target.value)}
                disabled={subscribeStatus === 'loading'}
                required
              />
              <button type="submit" className="btn btn-primary" disabled={subscribeStatus === 'loading'}>
                {subscribeStatus === 'loading'
                  ? <Loader2 size={16} style={{ animation: 'spin 0.9s linear infinite' }} />
                  : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

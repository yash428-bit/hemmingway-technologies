import { useRef, useState } from 'react';
import { Bot, Zap, Lock, Palette, Database, Rocket } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Building AI-Powered Systems at Scale',
    excerpt: 'Learn how we architected a machine learning pipeline that processes 1M+ events per day with sub-100ms latency.',
    category: 'AI/ML',
    author: 'Natasha Voss',
    date: '2024-12-01',
    readTime: '8 min read',
    Icon: Bot,
    tags: ['AI', 'Performance', 'Architecture']
  },
  {
    id: 2,
    title: 'React Performance Optimizations That Saved 40% Bundle Size',
    excerpt: 'A deep dive into code splitting, lazy loading, and tree-shaking strategies for modern web apps.',
    category: 'Frontend',
    author: 'Marcus Chen',
    date: '2024-11-28',
    readTime: '10 min read',
    Icon: Zap,
    tags: ['React', 'Performance', 'Bundling']
  },
  {
    id: 3,
    title: 'Zero-Trust Security in Microservices',
    excerpt: 'How we implemented zero-trust architecture across 50+ microservices without breaking deployments.',
    category: 'Security',
    author: 'Elena Rodriguez',
    date: '2024-11-15',
    readTime: '12 min read',
    Icon: Lock,
    tags: ['Security', 'Microservices', 'DevOps']
  },
  {
    id: 4,
    title: 'Design Systems That Scale With Your Team',
    excerpt: 'Building and maintaining a design system for 100+ products. Lessons learned and best practices.',
    category: 'Design',
    author: 'James Park',
    date: '2024-11-01',
    readTime: '7 min read',
    Icon: Palette,
    tags: ['Design', 'System Design', 'Collaboration']
  },
  {
    id: 5,
    title: 'Database Optimization: From Hours to Milliseconds',
    excerpt: 'Query optimization techniques that reduced our most expensive queries from 2 hours to <100ms.',
    category: 'Database',
    author: 'Layla Osei',
    date: '2024-10-25',
    readTime: '9 min read',
    Icon: Database,
    tags: ['Database', 'SQL', 'Performance']
  },
  {
    id: 6,
    title: 'The Future of Full-Stack Development',
    excerpt: 'Why the traditional frontend/backend split is becoming obsolete. An exploration of modern full-stack frameworks.',
    category: 'Backend',
    author: 'Alex Hemmingway',
    date: '2024-10-10',
    readTime: '11 min read',
    Icon: Rocket,
    tags: ['Full Stack', 'Architecture', 'Future Tech']
  },
];

const CATEGORIES = ['All', ...new Set(BLOG_POSTS.map(p => p.category))];

export default function Blog() {
  useScrollReveal();
  const gridRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <>
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
              const IconComponent = post.Icon;
              return (
                <article key={post.id} className="blog-card fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
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
                    <a href={`#blog/${post.id}`} className="blog-link">Read →</a>
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
            <form className="subscribe-form" onSubmit={e => { e.preventDefault(); alert('Thanks for subscribing!'); }}>
              <input type="email" placeholder="your@email.com" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

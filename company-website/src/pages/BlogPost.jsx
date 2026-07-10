import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { useScrollReveal } from '../hooks/useAnimations';
import { BLOG_POSTS, CATEGORY_ICONS, getPostBySlug } from '../data/blogPosts';

export default function BlogPost() {
  useScrollReveal();
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  const IconComponent = CATEGORY_ICONS[post.category];
  const related = BLOG_POSTS.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 2);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      <Helmet>
        <title>{post.title} | Hemmingway Technologies Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <section className="page-hero" style={{ paddingBottom: '40px' }}>
        <div className="page-hero-glow" />
        <div className="container">
          <Link to="/blog" className="blog-back-link fade-in visible">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </section>

      <section className="blog-post-section">
        <div className="container blog-post-container">
          <article className="blog-post fade-up visible">
            <div className="blog-card-header">
              <span className="blog-emoji"><IconComponent size={24} /></span>
              <span className="blog-category">{post.category}</span>
            </div>

            <h1 className="blog-post-title">{post.title}</h1>

            <div className="blog-meta blog-post-meta">
              <span className="blog-author">{post.author}</span>
              <span className="blog-date">{formattedDate}</span>
              <span className="blog-read-time">{post.readTime}</span>
            </div>

            <div className="blog-tags" style={{ marginTop: '16px' }}>
              {post.tags.map(tag => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>

            <div className="docs-section blog-post-body">
              {post.content.map((section, i) => (
                <div key={i}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                </div>
              ))}
            </div>
          </article>

          {related.length > 0 && (
            <aside className="blog-related">
              <h3>More on {post.category}</h3>
              {related.map(r => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="blog-related-card">
                  <span className="blog-related-title">{r.title}</span>
                  <span className="blog-related-meta">{r.readTime}</span>
                </Link>
              ))}
            </aside>
          )}
        </div>
      </section>
    </>
  );
}

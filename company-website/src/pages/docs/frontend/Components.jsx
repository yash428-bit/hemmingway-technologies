import { Helmet } from 'react-helmet-async';
import DocsLayout from '../DocsLayout';

export default function Components() {
  return (
    <>
      <Helmet>
        <title>Components | Hemmingway Technologies Docs</title>
      </Helmet>
      <DocsLayout title="Components">
        <section className="docs-section">
          <h2>CometCard</h2>
          <p>A card with an animated comet/glow effect that tracks mouse position. Used on service cards, value cards, and team cards.</p>
          <div className="docs-code-block">
            <pre>{`import CometCard from '../components/ui/CometCard';

<CometCard className="my-card">
  <p>Content here</p>
</CometCard>`}</pre>
          </div>
        </section>

        <section className="docs-section">
          <h2>EncryptedText</h2>
          <p>Animates text with a character-scramble decryption effect on mount. Accepts custom speed and className.</p>
          <div className="docs-code-block">
            <pre>{`import EncryptedText from '../components/ui/EncryptedText';

<EncryptedText
  text="We build the foundation your business runs on."
  className="gradient-text"
  speed={25}
/>`}</pre>
          </div>
          <div className="docs-table-wrap">
            <table className="docs-table">
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><code>text</code></td><td>string</td><td>—</td><td>Text to animate</td></tr>
                <tr><td><code>speed</code></td><td>number</td><td>30</td><td>ms per character reveal</td></tr>
                <tr><td><code>className</code></td><td>string</td><td>—</td><td>Applied to wrapper span</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="docs-section">
          <h2>SIHGallery</h2>
          <p>Auto-advancing image slider with thumbnail strip, dot navigation, lightbox, and click-zone navigation (left half = prev, right half = next). Used on the About page.</p>
          <div className="docs-code-block">
            <pre>{`import SIHGallery from '../components/ui/SIHGallery';

<SIHGallery />`}</pre>
          </div>
          <p>Images are sourced from <code>/public/SIH photos/</code>. Update the <code>PHOTOS</code> array inside the component to change images.</p>
        </section>

        <section className="docs-section">
          <h2>Navbar</h2>
          <p>Sticky top navigation with scroll-aware background blur, active link highlighting, theme toggle, and mobile hamburger menu. Receives <code>theme</code> and <code>toggleTheme</code> props from <code>App.jsx</code>.</p>
        </section>

        <section className="docs-section">
          <h2>Footer</h2>
          <p>Four-column link grid (Pages, Socials, Legal, Company) with a large watermark. Legal links use React Router <code>&lt;Link&gt;</code> for SPA navigation.</p>
        </section>

        <section className="docs-section">
          <h2>Toast</h2>
          <p>Notification component used on the Contact page after form submission. Supports <code>success</code>, <code>error</code>, and <code>info</code> variants.</p>
          <div className="docs-code-block">
            <pre>{`import Toast from '../components/ui/Toast';

<Toast type="success" message="Message sent!" onClose={() => setToast(null)} />`}</pre>
          </div>
        </section>

        <section className="docs-section">
          <h2>Loader</h2>
          <p>Full-screen entry animation shown on first page load. Calls <code>onComplete</code> callback when the animation finishes, at which point <code>App.jsx</code> unmounts it.</p>
        </section>
      </DocsLayout>
    </>
  );
}

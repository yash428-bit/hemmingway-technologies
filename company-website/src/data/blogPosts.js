import { Bot, Zap, Lock, Cloud } from 'lucide-react';

// Icon + accent per category, so every post in a category looks consistent.
export const CATEGORY_ICONS = {
  'AI/ML': Bot,
  Frontend: Zap,
  Security: Lock,
  'Cloud & DevOps': Cloud,
};

export const BLOG_POSTS = [
  {
    slug: 'building-ai-powered-systems-at-scale',
    title: 'Building AI-Powered Systems at Scale',
    excerpt:
      'What actually breaks when you take a machine learning pipeline from a notebook prototype to a system handling millions of events a day — and how to design around it.',
    category: 'AI/ML',
    author: 'Devyansh Dingolia',
    date: '2026-07-05',
    readTime: '8 min read',
    tags: ['AI', 'Performance', 'Architecture'],
    content: [
      {
        heading: 'The gap between "it works" and "it scales"',
        body: "A model that returns good predictions in a Jupyter notebook and a model that reliably serves predictions under real production traffic are two very different engineering problems. The first is a data science problem. The second is a distributed systems problem that happens to have a model somewhere inside it.",
      },
      {
        heading: 'Decouple inference from your request path',
        body: "The biggest mistake we see teams make is calling a model synchronously inside the same request that a user is waiting on. Once volume grows, that single decision determines your entire latency budget. Wherever the workload allows it, push inference behind a queue, batch requests where the model supports it, and cache aggressively for repeated inputs. This alone is usually the difference between a system that degrades gracefully under load and one that falls over.",
      },
      {
        heading: 'Version everything, not just the model',
        body: "Model weights, feature transformations, and the code that assembles inputs all drift independently over time. If you can't answer 'which exact combination of these three produced this prediction six weeks ago', debugging a regression becomes guesswork. Treat your feature pipeline and preprocessing logic with the same versioning discipline as the model artifact itself.",
      },
      {
        heading: 'Design for graceful degradation',
        body: "Models fail in ways traditional software doesn't — a confident wrong answer instead of a clean error. Build fallbacks: a simpler heuristic, a cached prior result, or a conservative default when confidence scores drop below a threshold. Systems that can degrade gracefully under model uncertainty are far more trustworthy in production than ones that assume the model is always right.",
      },
      {
        heading: 'What this looks like in practice',
        body: "In our own pipelines, this combination — async inference, aggressive caching, strict artifact versioning, and confidence-based fallbacks — is what let us move from a few thousand daily predictions to well over a million without a rewrite. None of it is exotic. It's the same discipline that makes any distributed system reliable, applied to a component that happens to be probabilistic.",
      },
    ],
  },
  {
    slug: 'practical-guide-to-integrating-llms',
    title: 'A Practical Guide to Integrating LLMs Into Your Product',
    excerpt:
      "Most LLM integrations fail for boring reasons — no eval process, no cost ceiling, no fallback for a bad response. Here's the checklist we run through before shipping one.",
    category: 'AI/ML',
    author: 'Janardhan Verma',
    date: '2026-06-20',
    readTime: '7 min read',
    tags: ['AI', 'LLM', 'Product'],
    content: [
      {
        heading: 'Start with the failure mode, not the demo',
        body: "It's easy to get an LLM feature working for the happy path in an afternoon. The real work is deciding what happens when the model hallucinates, times out, or returns something malformed. If you haven't designed that path before you ship, your users will discover it for you.",
      },
      {
        heading: 'Put a cost ceiling on every feature',
        body: 'Token costs scale with usage in a way that traditional compute costs don\'t always make obvious until the invoice arrives. Before shipping, know your worst-case cost per user session, and put a hard limit somewhere in the stack — not just a dashboard alert after the fact.',
      },
      {
        heading: 'Build a lightweight eval set early',
        body: "You don't need an elaborate evaluation framework on day one — a spreadsheet of thirty realistic inputs with expected outcomes is enough to catch regressions when you change a prompt or swap a model. Teams that skip this end up debugging prompt changes by vibes, which doesn't scale past the second engineer touching the code.",
      },
      {
        heading: "Keep the model swappable",
        body: 'Model providers, pricing, and capabilities shift quickly. Wrap model calls behind a thin abstraction from the start so that switching providers — or running two in parallel to compare quality — is a config change, not a rewrite.',
      },
      {
        heading: 'Where LLMs earn their place',
        body: "The integrations that hold up long-term are the ones solving a genuinely fuzzy problem — summarization, classification of messy inputs, natural-language interfaces — not the ones bolted onto a workflow that a deterministic rule would have handled better and cheaper.",
      },
    ],
  },
  {
    slug: 'react-performance-optimizations',
    title: 'React Performance Optimizations That Saved 40% Bundle Size',
    excerpt:
      'Code splitting, lazy loading, and tree-shaking are easy to say and easy to get wrong. A walkthrough of the changes that actually moved the needle.',
    category: 'Frontend',
    author: 'Manish Mandia',
    date: '2026-06-28',
    readTime: '10 min read',
    tags: ['React', 'Performance', 'Bundling'],
    content: [
      {
        heading: 'Measure before you optimize',
        body: "Bundle analysis tools exist for a reason — guessing which dependency is bloating your build wastes far more time than running the analyzer. In our case, a single charting library we used on one settings page was responsible for nearly a fifth of our total bundle size.",
      },
      {
        heading: 'Route-level code splitting first',
        body: "The highest-leverage change is almost always splitting by route. Users landing on your homepage shouldn't download the JavaScript for your admin dashboard. This is usually a few lines of dynamic import and delivers the biggest single win before you touch anything else.",
      },
      {
        heading: 'Audit your dependency tree, not just your code',
        body: "Utility libraries pulled in for a single function, date libraries that ship every locale by default, icon packs imported wholesale instead of per-icon — these add up quietly. We replaced three separate utility imports with native JS equivalents and lost nothing but bytes.",
      },
      {
        heading: 'Lazy-load below the fold',
        body: "Images, heavy interactive widgets, and anything not visible on initial paint should load on demand. Combined with route splitting, this is what took our largest pages from a multi-second first load down to something that feels instant on a typical connection.",
      },
      {
        heading: 'Keep a budget, not just a one-time fix',
        body: "The bundle size conversation doesn't end after one cleanup pass. We added a CI check that fails the build if bundle size regresses past a threshold, which has caught more accidental bloat than any manual review ever did.",
      },
    ],
  },
  {
    slug: 'design-systems-that-scale',
    title: 'Design Systems That Scale With Your Team',
    excerpt:
      'A design system is only as good as its adoption. Notes on building one that engineers and designers both actually want to use.',
    category: 'Frontend',
    author: 'Yash Kumar',
    date: '2026-05-30',
    readTime: '7 min read',
    tags: ['Design', 'System Design', 'Collaboration'],
    content: [
      {
        heading: 'Start from real screens, not a blank Figma file',
        body: "The design systems that get adopted are extracted from components that already exist and already work, then generalized. The ones that get ignored are built top-down in isolation and never quite match what engineering actually needs to ship.",
      },
      {
        heading: 'Tokens before components',
        body: "Getting color, spacing, and typography values into a shared token system pays off before a single reusable component exists — it's what keeps a growing product visually coherent even while the component library is still catching up.",
      },
      {
        heading: 'Documentation is part of the product',
        body: 'A component without a usage example and a "when not to use this" note gets reinvented by the next engineer who needs something similar. We treat the documentation site itself as a shipped product with its own backlog, not an afterthought.',
      },
      {
        heading: 'Make the right choice the easy choice',
        body: "Adoption follows friction, not policy. If pulling a button from the shared library is slower than writing a new one from scratch, engineers will write a new one — and now you have two buttons to maintain. Lint rules and editor snippets that surface the system components matter as much as the components themselves.",
      },
      {
        heading: 'Expect it to keep changing',
        body: "A design system isn't a deliverable you finish — it's a shared language that should evolve alongside the product. The teams that keep it healthy are the ones who budget ongoing time for it instead of treating the first version as the last.",
      },
    ],
  },
  {
    slug: 'zero-trust-security-in-microservices',
    title: 'Zero-Trust Security in Microservices',
    excerpt:
      'Implementing zero-trust across dozens of services without breaking deployments — what we changed first, and what we left alone.',
    category: 'Security',
    author: 'Bhardwaj Kartikay',
    date: '2026-06-10',
    readTime: '12 min read',
    tags: ['Security', 'Microservices', 'DevOps'],
    content: [
      {
        heading: "Stop trusting the network boundary",
        body: "Traditional perimeter security assumes anything inside your VPC is safe. Once you have more than a handful of services, that assumption becomes the biggest risk in the system — a single compromised service should never mean automatic access to everything else behind the firewall.",
      },
      {
        heading: 'Service identity, not IP allowlists',
        body: "Every service should authenticate with a verifiable identity — a short-lived certificate or signed token — rather than being trusted because of where it's running. This makes access auditable and revocable in a way that IP-based rules never are.",
      },
      {
        heading: 'Roll it out incrementally',
        body: "Flipping zero-trust on for an entire mesh at once is how deployments break. We moved service by service, running the new authorization checks in log-only mode first to see what would have been blocked, before enforcing anything. That caught several legitimate but undocumented service-to-service calls before they became outages.",
      },
      {
        heading: 'Least privilege is a process, not a setting',
        body: 'Granting a service exactly the permissions it needs on day one is achievable. Keeping it that way as the codebase changes is the actual challenge — permissions tend to only get added, rarely removed. Periodic access reviews aren\'t exciting work, but they\'re what keeps "least privilege" true six months later.',
      },
      {
        heading: 'The payoff',
        body: "The result isn't just better security posture on paper — it's a system where a single compromised credential or service has a contained blast radius instead of an open door to everything else. That containment is the entire point of zero-trust.",
      },
    ],
  },
  {
    slug: 'founders-guide-to-cybersecurity-basics',
    title: "A Founder's Guide to Cybersecurity Basics",
    excerpt:
      'You don\'t need an enterprise security team to avoid the mistakes that cause most early-stage breaches. A pragmatic starting checklist.',
    category: 'Security',
    author: 'Sakshi Yadav',
    date: '2026-05-18',
    readTime: '6 min read',
    tags: ['Security', 'Startups', 'Best Practices'],
    content: [
      {
        heading: 'Most breaches aren\'t sophisticated',
        body: "The overwhelming majority of early-stage security incidents we see aren't nation-state attacks — they're leaked API keys in a public repo, an admin panel with no authentication, or a database left open to the internet during a quick debugging session that never got closed back up.",
      },
      {
        heading: 'Secrets don\'t belong in source control',
        body: 'Ever. Not in an "example" config, not temporarily, not in a private repo. Use environment variables and a secrets manager from the first commit — retrofitting this after a leak means rotating every credential the repo ever contained, not just the current ones.',
      },
      {
        heading: 'Turn on MFA everywhere it\'s offered',
        body: 'Your cloud provider, your source control host, your payment processor, your email. This is the single highest-leverage security action available and it costs nothing but a few minutes per account.',
      },
      {
        heading: 'Least-privilege access from day one',
        body: "It's tempting to give every early team member admin access to everything because it's faster. That convenience compounds into risk as the team grows and people change roles or leave. Start scoped, even when the team is small — it's much harder to tighten access later than to grant it as needed.",
      },
      {
        heading: 'Have a plan before you need one',
        body: 'Knowing who gets called, what gets rotated, and how you\'ll communicate with users if something does go wrong turns a bad day into a manageable one. Write it down before an incident forces you to improvise it.',
      },
    ],
  },
  {
    slug: 'database-optimization-hours-to-milliseconds',
    title: 'Database Optimization: From Hours to Milliseconds',
    excerpt:
      'Query optimization techniques that took our most expensive reporting query from a two-hour batch job to a sub-100ms lookup.',
    category: 'Cloud & DevOps',
    author: 'Manish Mandia',
    date: '2026-05-05',
    readTime: '9 min read',
    tags: ['Database', 'SQL', 'Performance'],
    content: [
      {
        heading: 'The query was correct — it just didn\'t scale',
        body: "The offending query was logically fine when the table had ten thousand rows. At ten million, the same query plan that once seemed harmless was doing a full table scan on every run, and the report it powered was quietly eating a two-hour batch window every night.",
      },
      {
        heading: 'Read the query plan before touching an index',
        body: "It's tempting to throw an index at any slow query, but adding one blind can make write performance worse without fixing the actual bottleneck. We start with EXPLAIN ANALYZE every time — it usually shows exactly where the plan goes wrong, whether that's a missing index, a bad join order, or an unnecessary sort.",
      },
      {
        heading: 'Denormalize deliberately, not accidentally',
        body: "For our specific reporting case, the fix wasn't a smarter query — it was pre-aggregating the data into a summary table on a schedule, and querying that instead. Denormalization gets a bad reputation, but used deliberately for known access patterns, it's often the simplest fix available.",
      },
      {
        heading: 'Connection pooling matters more than people expect',
        body: "Half of our perceived latency wasn't query execution time at all — it was connection overhead under load. Introducing proper pooling reduced tail latency noticeably even before we touched a single query.",
      },
      {
        heading: 'The end result',
        body: 'Between the summary table, a couple of targeted indexes, and connection pooling, the two-hour batch job became a query that returns in under 100ms on demand — meaning the report went from "runs once a night" to "available live, whenever anyone wants it."',
      },
    ],
  },
  {
    slug: 'future-of-full-stack-development',
    title: 'The Future of Full-Stack Development',
    excerpt:
      'The traditional frontend/backend split is dissolving. What that means for how teams are structured and how products actually get built.',
    category: 'Cloud & DevOps',
    author: 'Devyansh Dingolia',
    date: '2026-04-22',
    readTime: '11 min read',
    tags: ['Full Stack', 'Architecture', 'Future Tech'],
    content: [
      {
        heading: 'The line was always a bit arbitrary',
        body: "Frontend and backend were never cleanly separate problems — they were separate problems mostly because the tools forced that split. Server-rendered frameworks, edge functions, and typed end-to-end APIs are quietly erasing a lot of that boundary.",
      },
      {
        heading: 'Type safety across the whole stack changes how teams work',
        body: "When your frontend and backend share types end-to-end, a huge class of integration bugs simply can't compile. That shifts what full-stack teams spend their time on — less time reconciling mismatched API contracts, more time on the actual product problem.",
      },
      {
        heading: 'Smaller teams, wider ownership',
        body: 'We\'ve seen this play out directly: a single engineer taking a feature from database schema to deployed UI is now realistic in a way it wasn\'t five years ago, because the tooling gap between "frontend person" and "backend person" has narrowed substantially.',
      },
      {
        heading: 'This doesn\'t mean specialization disappears',
        body: 'Deep expertise in database performance, distributed systems, or interaction design still matters — arguably more, since it\'s now a differentiator rather than a baseline requirement. What changes is that fewer people need to be gatekept out of the other half of the stack just to ship a feature.',
      },
      {
        heading: 'What we\'re building toward',
        body: "The teams that will move fastest over the next few years are the ones that hire for range as much as depth, and build on tooling that doesn't force an artificial wall between the parts of the product that happen to run on different machines.",
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

import Link from 'next/link';
import * as styles from './page.css';
import {
  ArrowRight,
  Github,
  Sparkles,
  Box,
  Layers,
  Zap,
  Code2,
  Smartphone,
  ShieldCheck,
  Search,
  ChevronRight,
} from 'lucide-react';

// 임시 컴포넌트 프리뷰 (나중에 실제 UI 컴포넌트로 대체 가능)
function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        transform: 'rotateX(10deg) rotateY(-10px)',
        perspective: '1000px',
      }}
    >
      <div
        style={{
          padding: '2rem',
          background: 'var(--color-surface)',
          borderRadius: '1rem',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-2xl)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
}

const COMPONENTS = [
  'Alert',
  'AutoComplete',
  'Avatar',
  'Badge',
  'Breadcrumb',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'Cascader',
  'Chart',
  'Checkbox',
  'Collapse',
  'ColorPicker',
  'Countdown',
  'DataTable',
  'DatePicker',
  'Dialog',
  'Divider',
  'Drawer',
  'Dropdown',
  'DynamicInput',
  'DynamicTags',
];

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.glow} />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>
          <Sparkles size={14} className={styles.gradientText} />
          <span>v2.0 is now available with 68+ components</span>
          <ArrowRight size={14} />
        </div>
        <h1 className={styles.heroTitle}>
          Ultimate <span className={styles.gradientText}>Headless</span>{' '}
          Experience for Next.js
        </h1>
        <p className={styles.heroDescription}>
          Style-agnostic, accessible, and high-performance React components.
          Focus on your design, let us handle the logic. Zero-runtime CSS with
          Vanilla Extract.
        </p>
        <div className={styles.btnGroup}>
          <Link href="/components/button" className={styles.primaryBtn}>
            Start Building <ArrowRight size={20} />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryBtn}
          >
            <Github size={20} /> View Source
          </a>
        </div>
      </section>

      {/* Interactive Showcase */}
      <section className={styles.showcaseSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.label}>The Core Features</span>
          <h2 className={styles.showcaseTitle}>Built for Modern Development</h2>
        </div>

        <div className={styles.showcaseGrid}>
          {/* Large Item: Performance */}
          <div className={styles.itemLarge}>
            <div className={styles.visualArea}>
              <PreviewBox>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--color-brand-primary)',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                  }}
                >
                  <div
                    style={{
                      width: '120px',
                      height: '12px',
                      borderRadius: '4px',
                      background: 'var(--color-border)',
                    }}
                  />
                  <div
                    style={{
                      width: '80px',
                      height: '12px',
                      borderRadius: '4px',
                      background: 'var(--color-border)',
                      opacity: 0.5,
                    }}
                  />
                </div>
                <div
                  style={{
                    marginLeft: 'auto',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                    fontSize: '12px',
                  }}
                >
                  Interactive
                </div>
              </PreviewBox>
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardHeading}>Zero-Runtime Overheads</h3>
              <p className={styles.cardSub}>
                Powered by Vanilla Extract, all styles are compiled at
                build-time. Enjoy type-safe CSS without compromising on
                performance.
              </p>
            </div>
          </div>

          {/* Medium Item: Typescript */}
          <div className={styles.itemMedium}>
            <div className={styles.visualArea}>
              <Code2
                size={64}
                color="var(--color-brand-primary)"
                strokeWidth={1}
              />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardHeading}>Strictly Typed</h3>
              <p className={styles.cardSub}>
                Written in TypeScript from the ground up. Full auto-completion
                and compile-time validation.
              </p>
            </div>
          </div>

          {/* Small Items */}
          <div className={styles.itemSmall}>
            <div className={styles.visualArea}>
              <Smartphone
                size={48}
                color="var(--color-brand-primary)"
                strokeWidth={1}
              />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardHeading}>Responsive</h3>
              <p className={styles.cardSub}>
                Mobile-first architecture for every device.
              </p>
            </div>
          </div>

          <div className={styles.itemSmall}>
            <div className={styles.visualArea}>
              <ShieldCheck
                size={48}
                color="var(--color-brand-primary)"
                strokeWidth={1}
              />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardHeading}>Accessible</h3>
              <p className={styles.cardSub}>
                WAI-ARIA compliant out of the box.
              </p>
            </div>
          </div>

          <div className={styles.itemSmall}>
            <div className={styles.visualArea}>
              <Zap
                size={48}
                color="var(--color-brand-primary)"
                strokeWidth={1}
              />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardHeading}>Lightweight</h3>
              <p className={styles.cardSub}>
                Modular design for minimal bundle sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className={styles.showcaseSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.label}>Developer Experience</span>
          <h2 className={styles.showcaseTitle}>Just Copy, Paste, and Style</h2>
        </div>
        <div className={styles.codeSection}>
          <div className={styles.codeHeader}>
            <div
              className={styles.codeDot}
              style={{ backgroundColor: '#EF4444' }}
            />
            <div
              className={styles.codeDot}
              style={{ backgroundColor: '#F59E0B' }}
            />
            <div
              className={styles.codeDot}
              style={{ backgroundColor: '#10B981' }}
            />
            <span
              style={{
                marginLeft: 'auto',
                fontSize: '12px',
                color: 'var(--color-text-secondary)',
                opacity: 0.6,
              }}
            >
              app/page.tsx
            </span>
          </div>
          <div className={styles.codeContent}>
            <span className={styles.syntaxKeyword}>import</span> {'{'}{' '}
            <span className={styles.syntaxComponent}>Button</span> {'}'}{' '}
            <span className={styles.syntaxKeyword}>from</span>{' '}
            <span className={styles.syntaxString}>'@repo/ui'</span>;<br />
            <br />
            <span className={styles.syntaxKeyword}>
              export default function
            </span>{' '}
            <span className={styles.syntaxComponent}>Page</span>() {'{'}
            <br />
            &nbsp;&nbsp;<span className={styles.syntaxKeyword}>return</span> (
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'<'}
            <span className={styles.syntaxComponent}>Button</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.syntaxProp}>variant</span>=
            <span className={styles.syntaxString}>"primary"</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.syntaxProp}>size</span>=
            <span className={styles.syntaxString}>"large"</span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.syntaxProp}>onClick</span>={'{'}
            <span className={styles.syntaxKeyword}>() ={'>'}</span> console.
            <span className={styles.syntaxProp}>log</span>(
            <span className={styles.syntaxString}>'Clicked!'</span>){'}'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'>'}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Get Started
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{'</'}
            <span className={styles.syntaxComponent}>Button</span>
            {'>'}
            <br />
            &nbsp;&nbsp;);
            <br />
            {'}'}
          </div>
        </div>
      </section>

      {/* Directory Section */}
      <section className={styles.showcaseSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.label}>Component Directory</span>
          <h2 className={styles.showcaseTitle}>Explore 68+ Components</h2>
        </div>

        <div className={styles.directoryGrid}>
          {COMPONENTS.map((name) => (
            <Link
              key={name}
              href={`/components/${name.toLowerCase()}`}
              className={styles.directoryItem}
            >
              <span>{name}</span>
              <div className={styles.dot} />
            </Link>
          ))}
          <Link
            href="/components/button"
            className={styles.directoryItem}
            style={{ borderStyle: 'dashed', opacity: 0.6 }}
          >
            <span>And 45 more...</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer CTA */}
      <section className={styles.footerCTA}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          Ready to streamline your workflow?
        </h2>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px' }}>
          Join thousands of developers building beautiful, accessible apps with
          our headless components.
        </p>
        <Link href="/components/button" className={styles.primaryBtn}>
          Start for Free <ArrowRight size={20} />
        </Link>
      </section>
    </main>
  );
}

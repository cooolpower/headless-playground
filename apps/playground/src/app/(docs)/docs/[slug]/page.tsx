import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/footer';
import * as styles from './page.css';
import { getToc } from '@/utils/toc';
import { TocUpdater } from '@/components/layout/toc-context';
import { Prose } from '@/components/layout/prose';

const DOCS = {
  introduction: () => import('@/content/docs/introduction.mdx'),
  installation: () => import('@/content/docs/installation.mdx'),
  theming: () => import('@/content/docs/theming.mdx'),
  customization: () => import('@/content/docs/customization.mdx'),
  'dark-mode': () => import('@/content/docs/dark-mode.mdx'),
} as const;

type DocSlug = keyof typeof DOCS;

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in DOCS)) {
    notFound();
  }

  const DocContent = (await DOCS[slug as DocSlug]()).default;

  const tocItems = getToc(slug);

  return (
    <>
      <TocUpdater items={tocItems} />
      <div className={styles.mainDoc} suppressHydrationWarning>
        <Prose>
          <DocContent />
        </Prose>
      </div>
      <Footer />
    </>
  );
}

import { notFound } from 'next/navigation';
import { Playground } from '@/components/playground/playground';
import { Footer } from '@/components/layout/footer';
import * as styles from './page.css';
import { TableOfContents } from '@/components/layout/toc';
import { getToc } from '@/utils/toc';

const DOCS = {
  introduction: () => import('@/content/docs/introduction.mdx'),
  installation: () => import('@/content/docs/installation.mdx'),
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
      <div className={styles.main}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainDoc} suppressHydrationWarning>
            <DocContent />
          </div>
          <TableOfContents items={tocItems} />
        </div>
        <Footer />
      </div>
    </>
  );
}

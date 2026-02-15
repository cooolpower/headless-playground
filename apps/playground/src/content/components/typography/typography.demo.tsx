'use client';

import {
  Title,
  Text,
  Paragraph,
} from '@repo/ui';
import * as styles from './typography.demo.css';

export function DemoTypographyTitles() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <Title level={1}>H1 Title - Main Heading</Title>
        </div>
        <div className={styles.titleWrapper}>
          <Title level={2}>H2 Title - Section Heading</Title>
        </div>
        <div className={styles.titleWrapper}>
          <Title level={3}>H3 Title - Subsection Heading</Title>
        </div>
        <div className={styles.titleWrapper}>
          <Title level={4}>H4 Title - Minor Heading</Title>
        </div>
        <div className={styles.titleWrapper}>
          <Title level={5}>H5 Title - Small Heading</Title>
        </div>
        <div className={styles.titleWrapper}>
          <Title level={6}>H6 Title - Smallest Heading</Title>
        </div>
      </div>
    </div>
  );
}

export function DemoTypographyText() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <div className={styles.textWrapper}>
          <Text>Regular text content</Text>
        </div>
        <div className={styles.textWrapper}>
          <Text>
            <strong>Bold text</strong> and <em>italic text</em> can be mixed
            within the same text component.
          </Text>
        </div>
        <div className={styles.textWrapper}>
          <Text>
            You can also use <code>code snippets</code> and{' '}
            <a href="#">links</a> within text.
          </Text>
        </div>
      </div>
    </div>
  );
}

export function DemoTypographyParagraphs() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Paragraph>
          This is a paragraph component. Paragraphs are used for longer blocks
          of text content. They provide proper line spacing and text flow for
          readable content.
        </Paragraph>

        <Paragraph>
          Multiple paragraphs can be used together to create structured content.
          Each paragraph maintains consistent spacing and typography.
        </Paragraph>

        <Paragraph>
          Paragraphs automatically handle line breaks and maintain optimal
          reading width. This makes them perfect for articles, descriptions, and
          documentation.
        </Paragraph>
      </div>
    </div>
  );
}

export function DemoTypographyCombined() {
  return (
    <div className={styles.section}>
      <div className={styles.article}>
        <Title level={1}>Article Title</Title>

        <Title level={3}>Introduction</Title>
        <Paragraph>
          This is an introduction paragraph that explains the main topic of the
          article. It provides context and sets up the reader for what's to
          come.
        </Paragraph>

        <Title level={3}>Main Content</Title>
        <Paragraph>
          Here is the main content of the article. It contains detailed
          information and explanations about the topic being discussed.
        </Paragraph>

        <Paragraph>
          Additional paragraphs can provide more depth and supporting
          information.
          <Text> Inline text components </Text> can be used within paragraphs
          for emphasis or different styling needs.
        </Paragraph>

        <Title level={3}>Conclusion</Title>
        <Paragraph>
          This concludes the article example, demonstrating how typography
          components work together to create well-structured content.
        </Paragraph>
      </div>
    </div>
  );
}

export function DemoTypographyCustom() {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <Title level={1}>Custom Styled Title</Title>
        <Paragraph>
          Paragraph with custom styling applied through className prop. This
          allows you to extend the default styles while maintaining the
          component's semantic structure.
        </Paragraph>
      </div>
    </div>
  );
}

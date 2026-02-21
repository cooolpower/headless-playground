import fs from 'fs';
import path from 'path';
import GithubSlugger from 'github-slugger';

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function getToc(slug: string): TocItem[] {
  try {
    const filePath = path.join(process.cwd(), 'src/content/components', slug, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const toc: TocItem[] = [];
    const slugger = new GithubSlugger();
    let inCodeBlock = false;

    lines.forEach((line) => {
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return;
      }
      if (inCodeBlock) return;

      const match = line.match(/^(#{2,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        toc.push({
          id: slugger.slug(text),
          text,
          level,
        });
      }
    });

    return toc;
  } catch (error) {
    console.error(`Error generating TOC for ${slug}:`, error);
    return [];
  }
}

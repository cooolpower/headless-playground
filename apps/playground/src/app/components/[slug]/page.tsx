import { notFound } from 'next/navigation';

import { Playground } from '@/components/playground/playground';
import { Footer } from '@/components/layout/footer';
import * as styles from './page.css';

const DOCS = {
  button: () => import('@/content/components/button/button.mdx'),
  card: () => import('@/content/components/card/card.mdx'),
  divider: () => import('@/content/components/divider/divider.mdx'),
  dropdown: () => import('@/content/components/dropdown/dropdown.mdx'),
  tag: () => import('@/content/components/tag/tag.mdx'),
  typography: () => import('@/content/components/typography/typography.mdx'),
  avatar: () => import('@/content/components/avatar/avatar.mdx'),
  carousel: () => import('@/content/components/carousel/carousel.mdx'),
  ellipsis: () => import('@/content/components/ellipsis/ellipsis.mdx'),
  image: () => import('@/content/components/image/image.mdx'),
  'gradient-text': () =>
    import('@/content/components/gradient-text/gradient-text.mdx'),
  icon: () => import('@/content/components/icon/icon.mdx'),
  'page-header': () =>
    import('@/content/components/page-header/page-header.mdx'),
  watermark: () => import('@/content/components/watermark/watermark.mdx'),
  'float-button': () =>
    import('@/content/components/float-button/float-button.mdx'),
  // New components
  alert: () => import('@/content/components/alert/alert.mdx'),
  input: () => import('@/content/components/input/input.mdx'),
  textarea: () => import('@/content/components/textarea/textarea.mdx'),
  cascader: () => import('@/content/components/cascader/cascader.mdx'),
  modal: () => import('@/content/components/modal/modal.mdx'),
  progress: () => import('@/content/components/progress/progress.mdx'),
  table: () => import('@/content/components/table/table.mdx'),
  list: () => import('@/content/components/list/list.mdx'),
  checkbox: () => import('@/content/components/checkbox/checkbox.mdx'),
  radio: () => import('@/content/components/radio/radio.mdx'),
  countdown: () => import('@/content/components/countdown/countdown.mdx'),
  'flip-countdown': () =>
    import('@/content/components/flip-countdown/flip-countdown.mdx'),
  switch: () => import('@/content/components/switch/switch.mdx'),
  select: () => import('@/content/components/select/select.mdx'),
  slider: () => import('@/content/components/slider/slider.mdx'),
  tabs: () => import('@/content/components/tabs/tabs.mdx'),
  breadcrumb: () => import('@/content/components/breadcrumb/breadcrumb.mdx'),
  // Recently added components
  tooltip: () => import('@/content/components/tooltip/tooltip.mdx'),
  badge: () => import('@/content/components/badge/badge.mdx'),
  collapse: () => import('@/content/components/collapse/collapse.mdx'),
  dialog: () => import('@/content/components/dialog/dialog.mdx'),
  drawer: () => import('@/content/components/drawer/drawer.mdx'),
  popover: () => import('@/content/components/popover/popover.mdx'),
  form: () => import('@/content/components/form/form.mdx'),
  rate: () => import('@/content/components/rate/rate.mdx'),
  calendar: () => import('@/content/components/calendar/calendar.mdx'),
  descriptions: () =>
    import('@/content/components/descriptions/descriptions.mdx'),
  empty: () => import('@/content/components/empty/empty.mdx'),
  statistic: () => import('@/content/components/statistic/statistic.mdx'),
  timeline: () => import('@/content/components/timeline/timeline.mdx'),
  menu: () => import('@/content/components/menu/menu.mdx'),
  pagination: () => import('@/content/components/pagination/pagination.mdx'),
  steps: () => import('@/content/components/steps/steps.mdx'),
  'loading-bar': () => import('@/content/components/loading-bar/loading-bar.mdx'),
  'input-number': () =>
    import('@/content/components/input-number/input-number.mdx'),
  'time-picker': () =>
    import('@/content/components/time-picker/time-picker.mdx'),
  transfer: () => import('@/content/components/transfer/transfer.mdx'),
  tree: () => import('@/content/components/tree/tree.mdx'),
  upload: () => import('@/content/components/upload/upload.mdx'),
  'color-picker': () =>
    import('@/content/components/color-picker/color-picker.mdx'),
  'date-picker': () =>
    import('@/content/components/date-picker/date-picker.mdx'),
  'auto-complete': () =>
    import('@/content/components/auto-complete/auto-complete.mdx'),
  'tree-select': () =>
    import('@/content/components/tree-select/tree-select.mdx'),
  mention: () => import('@/content/components/mention/mention.mdx'),
  'qr-code': () => import('@/content/components/qr-code/qr-code.mdx'),
  heatmap: () => import('@/content/components/heatmap/heatmap.mdx'),
  'data-table': () => import('@/content/components/data-table/data-table.mdx'),
  chart: () => import('@/content/components/chart/chart.mdx'),
  map: () => import('@/content/components/map/map.mdx'),
  'dynamic-tags': () =>
    import('@/content/components/dynamic-tags/dynamic-tags.mdx'),
  'dynamic-input': () =>
    import('@/content/components/dynamic-input/dynamic-input.mdx'),
  toast: () => import('@/content/components/toast/toast.mdx'),
  snackbar: () => import('@/content/components/snackbar/snackbar.mdx'),
} as const;

const DEMOS = {
  button: () => import('@/content/components/button/button.demo'),
  card: () => import('@/content/components/card/card.demo'),
  divider: () => import('@/content/components/divider/divider.demo'),
  dropdown: () => import('@/content/components/dropdown/dropdown.demo'),
  tag: () => import('@/content/components/tag/tag.demo'),
  typography: () => import('@/content/components/typography/typography.demo'),
  avatar: () => import('@/content/components/avatar/avatar.demo'),
  carousel: () => import('@/content/components/carousel/carousel.demo'),
  ellipsis: () => import('@/content/components/ellipsis/ellipsis.demo'),
  image: () => import('@/content/components/image/image.demo'),
  'gradient-text': () =>
    import('@/content/components/gradient-text/gradient-text.demo'),
  icon: () => import('@/content/components/icon/icon.demo'),
  'page-header': () =>
    import('@/content/components/page-header/page-header.demo'),
  watermark: () => import('@/content/components/watermark/watermark.demo'),
  'float-button': () =>
    import('@/content/components/float-button/float-button.demo'),
  // New components
  alert: () => import('@/content/components/alert/alert.demo'),
  input: () => import('@/content/components/input/input.demo'),
  textarea: () => import('@/content/components/textarea/textarea.demo'),
  cascader: () => import('@/content/components/cascader/cascader.demo'),
  modal: () => import('@/content/components/modal/modal.demo'),
  progress: () => import('@/content/components/progress/progress.demo'),
  table: () => import('@/content/components/table/table.demo'),
  list: () => import('@/content/components/list/list.demo'),
  checkbox: () => import('@/content/components/checkbox/checkbox.demo'),
  radio: () => import('@/content/components/radio/radio.demo'),
  countdown: () => import('@/content/components/countdown/countdown.demo'),
  'flip-countdown': () =>
    import('@/content/components/flip-countdown/flip-countdown.demo'),
  switch: () => import('@/content/components/switch/switch.demo'),
  select: () => import('@/content/components/select/select.demo'),
  slider: () => import('@/content/components/slider/slider.demo'),
  tabs: () => import('@/content/components/tabs/tabs.demo'),
  breadcrumb: () => import('@/content/components/breadcrumb/breadcrumb.demo'),
  // Recently added components
  tooltip: () => import('@/content/components/tooltip/tooltip.demo'),
  badge: () => import('@/content/components/badge/badge.demo'),
  collapse: () => import('@/content/components/collapse/collapse.demo'),
  dialog: () => import('@/content/components/dialog/dialog.demo'),
  drawer: () => import('@/content/components/drawer/drawer.demo'),
  popover: () => import('@/content/components/popover/popover.demo'),
  form: () => import('@/content/components/form/form.demo'),
  rate: () => import('@/content/components/rate/rate.demo'),
  calendar: () => import('@/content/components/calendar/calendar.demo'),
  descriptions: () =>
    import('@/content/components/descriptions/descriptions.demo'),
  empty: () => import('@/content/components/empty/empty.demo'),
  statistic: () => import('@/content/components/statistic/statistic.demo'),
  timeline: () => import('@/content/components/timeline/timeline.demo'),
  menu: () => import('@/content/components/menu/menu.demo'),
  pagination: () => import('@/content/components/pagination/pagination.demo'),
  steps: () => import('@/content/components/steps/steps.demo'),
  'loading-bar': () =>
    import('@/content/components/loading-bar/loading-bar.demo'),
  'input-number': () =>
    import('@/content/components/input-number/input-number.demo'),
  'time-picker': () =>
    import('@/content/components/time-picker/time-picker.demo'),
  transfer: () => import('@/content/components/transfer/transfer.demo'),
  tree: () => import('@/content/components/tree/tree.demo'),
  upload: () => import('@/content/components/upload/upload.demo'),
  'color-picker': () =>
    import('@/content/components/color-picker/color-picker.demo'),
  'date-picker': () =>
    import('@/content/components/date-picker/date-picker.demo'),
  'auto-complete': () =>
    import('@/content/components/auto-complete/auto-complete.demo'),
  'tree-select': () =>
    import('@/content/components/tree-select/tree-select.demo'),
  mention: () => import('@/content/components/mention/mention.demo'),
  'qr-code': () => import('@/content/components/qr-code/qr-code.demo'),
  heatmap: () => import('@/content/components/heatmap/heatmap.demo'),
  'data-table': () => import('@/content/components/data-table/data-table.demo'),
  chart: () => import('@/content/components/chart/chart.demo'),
  map: () => import('@/content/components/map/map.demo'),
  'dynamic-tags': () =>
    import('@/content/components/dynamic-tags/dynamic-tags.demo'),
  'dynamic-input': () =>
    import('@/content/components/dynamic-input/dynamic-input.demo'),
  toast: () => import('@/content/components/toast/toast.demo'),
  snackbar: () => import('@/content/components/snackbar/snackbar.demo'),
} as const;

export default async function ComponentDocPage({
  params,
}: {
  // Next 16 can pass params as a Promise in some configurations.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const docImporter = DOCS[slug as keyof typeof DOCS];
  if (!docImporter) notFound();

  const Doc = (await docImporter()).default;

  const demoImporter = DEMOS[slug as keyof typeof DEMOS];
  const demoModule = demoImporter ? await demoImporter() : {};

  return (
    <>
      <div className={styles.main}>
        <div className={styles.mainDoc} suppressHydrationWarning>
          <Doc components={{ Playground, ...demoModule }} />
        </div>
        <Footer />
      </div>
    </>
  );
}

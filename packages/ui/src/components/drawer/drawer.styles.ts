export const drawerCss = `
:root{
  --hc-drawer-bg: var(--color-surface);
  --hc-drawer-border: var(--color-border);
  --hc-drawer-shadow: var(--shadow-xl);
  --hc-drawer-radius: var(--radius-lg);
  --hc-drawer-backdrop: color-mix(in oklab, var(--color-neutral-200) 70%, transparent);
}

.hcDrawerMask{
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.hcDrawerBackdrop{
  position: absolute;
  inset: 0;
  background: var(--hc-drawer-backdrop);
}

.hcDrawerWrap{
  position: absolute;
  inset: 0;
  display: flex;
}

.hcDrawerWrap[data-placement="right"]{ justify-content: flex-end; align-items: stretch; }
.hcDrawerWrap[data-placement="left"]{ justify-content: flex-start; align-items: stretch; }
.hcDrawerWrap[data-placement="top"]{ justify-content: stretch; align-items: flex-start; }
.hcDrawerWrap[data-placement="bottom"]{ justify-content: stretch; align-items: flex-end; }

.hcDrawer{
  background: var(--hc-drawer-bg);
  border: var(--border-width-thin) solid var(--hc-drawer-border);
  box-shadow: var(--hc-drawer-shadow);
  display: flex;
  flex-direction: column;
  min-width: 12.5rem;
  max-width: 100vw;
  max-height: 100vh;
}

.hcDrawer[data-placement="right"],
.hcDrawer[data-placement="left"]{
  width: var(--hc-drawer-width, 23.625rem);
  height: 100%;
}

.hcDrawer[data-placement="top"],
.hcDrawer[data-placement="bottom"]{
  height: var(--hc-drawer-height, 23.625rem);
  width: 100%;
}

.hcDrawerHeader{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-base);
  padding: var(--spacing-base);
  border-bottom: var(--border-width-thin) solid var(--hc-drawer-border);
}

.hcDrawerTitle{
  font-weight: 600;
  color: var(--color-text-heading);
}

.hcDrawerHeaderRight{
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.hcDrawerClose{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-md);
  border: var(--border-width-thin) solid var(--hc-drawer-border);
  background: var(--hc-drawer-bg);
  cursor: pointer;
}

.hcDrawerBody{
  padding: var(--spacing-base);
  overflow: auto;
  flex: 1;
}

.hcDrawerFooter{
  padding: var(--spacing-base);
  border-top: var(--border-width-thin) solid var(--hc-drawer-border);
}
`;


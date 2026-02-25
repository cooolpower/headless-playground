# Headless UI Playground

A **Headless UI Component Library & Playground** built with **Next.js**, **TypeScript**, **MDX**, and **pnpm monorepo**.

**70+ behavior-first UI components** — inspired by **Naive UI** and **shadcn/ui** — designed with accessibility, composability, and headless architecture in mind.

---

## ✨ What is this?

This repository is a monorepo containing:

- **`@cooolpower/headless-ui`** — A headless React component library with 70+ components
- **`playground`** — An interactive documentation site with live component demos

Each component:

- Exposes **behavior and accessibility**, not opinionated styles
- Supports **controlled & uncontrolled patterns**
- Ships with **optional default CSS** (`injectStyles` prop)
- Can be **interactively tested** directly in the browser
- Is documented using **MDX**, combining explanation + live examples

---

## 🧠 Key Concepts

- Headless component architecture (logic / style separation)
- Accessibility (ARIA roles, keyboard navigation, focus management)
- Controlled vs uncontrolled state patterns
- Composition-first API design
- MDX-based component documentation with interactive playground
- Dark mode & theming via CSS custom properties

---

## 🛠 Tech Stack

| Layer           | Technology                           |
| --------------- | ------------------------------------ |
| **Framework**   | Next.js 15 (App Router)              |
| **Language**    | TypeScript (strict mode)             |
| **Monorepo**    | pnpm workspaces                      |
| **Styling**     | Vanilla Extract + CSS Custom Props   |
| **Docs**        | MDX (`@next/mdx`, rehype, remark)    |
| **Code Blocks** | Shiki (rehype-pretty-code)           |
| **Build**       | tsup (library), Next.js (playground) |
| **Deployment**  | Vercel                               |

---

## 📁 Project Structure

```txt
headless-playground/
├─ apps/
│  └─ playground/                  # Next.js documentation site
│     └─ src/
│        ├─ app/                   # App Router pages & layouts
│        │  └─ (docs)/components/  # Component doc pages
│        ├─ components/
│        │  ├─ layout/             # Sidebar, Header, Footer, TOC
│        │  └─ playground/         # Interactive preview & controls
│        ├─ content/components/    # MDX docs + demo files
│        │  ├─ badge/
│        │  │  ├─ badge.mdx
│        │  │  ├─ badge.demo.tsx
│        │  │  └─ badge.demo.css.ts
│        │  └─ ...
│        └─ styles/                # Global styles (Vanilla Extract)
│
├─ packages/
│  └─ ui/                          # @cooolpower/headless-ui
│     └─ src/components/
│        ├─ badge/
│        │  ├─ badge.tsx           # Component
│        │  ├─ badge.styles.ts     # Default CSS
│        │  ├─ type-badge.ts       # Type definitions
│        │  └─ use-badge.ts        # Hook (logic)
│        └─ ...
│
├─ pnpm-workspace.yaml
└─ package.json
```

---

## 🧩 Components (70+)

| Category           | Components                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| **Basic**          | Alert, Avatar, Badge, Button, Card, Divider, Icon, Progress, Tag, Typography                              |
| **Form**           | Input, Textarea, InputNumber, AutoComplete, Cascader, Checkbox, Radio, Switch, Select, Slider, Form, Rate |
| **Data Display**   | List, Table, DataTable, Descriptions, Statistic, Timeline, Tree, TreeSelect, Chart, Heatmap               |
| **Navigation**     | Tabs, Breadcrumb, Dropdown, Menu, Pagination, Steps                                                       |
| **Feedback**       | Modal, Drawer, Dialog, Popover, Tooltip, Toast, Snackbar, LoadingBar, Empty                               |
| **Date & Time**    | Calendar, DatePicker, TimePicker, Countdown, FlipCountdown                                                |
| **Layout**         | PageHeader, FloatButton, Watermark                                                                        |
| **Media**          | Carousel, Image, Ellipsis, GradientText, QRCode                                                           |
| **Advanced Input** | DynamicTags, DynamicInput, Transfer, Upload, ColorPicker, Mention                                         |
| **Other**          | Collapse                                                                                                  |

Each component page includes:

- Usage explanation & code examples
- Interactive playground (preview + control panel)
- API reference table
- Accessibility notes
- Default CSS snippet (toggleable via `injectStyles`)

---

## 🧪 Playground

The playground allows you to:

- See component behavior in **real time**
- Toggle props via **interactive control panels**
- Switch between **default styles** and **custom styles** (`injectStyles` toggle)
- Persist control state across page refreshes (localStorage)
- View **dark mode / light mode** with full theme support

---

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Build the UI library
pnpm --filter @cooolpower/headless-ui build

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the playground.

### Using the library in another project

```bash
pnpm add @cooolpower/headless-ui
```

```tsx
import { Badge } from '@cooolpower/headless-ui';
import '@cooolpower/headless-ui/styles.css'; // optional default styles

export function MyComponent() {
  return (
    <Badge count={5}>
      <button>Messages</button>
    </Badge>
  );
}
```

---

## 📦 Why not Storybook?

This project intentionally avoids Storybook to:

- Demonstrate understanding of component documentation internals
- Control rendering and routing via Next.js App Router
- Integrate documentation directly with the app
- Explore MDX-driven UI patterns with custom playground

---

## 🎯 Goal of This Project

This project is designed as a **frontend engineering portfolio**, focusing on:

- Clear separation of logic and presentation
- Scalable component APIs with TypeScript strict mode
- Real-world accessibility considerations
- Dark mode & theming architecture
- Developer experience and documentation

---

## 📄 License

MIT

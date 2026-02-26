<div align="center">

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/cooolpower/headless-playground/main/docs/images/logo-dark.svg">
    <img alt="Headless UI Playground - Logo" src="https://raw.githubusercontent.com/cooolpower/headless-playground/main/docs/images/logo-light.svg" width="120">
  </picture>
</div>

# @cooolpower/headless-ui

**Ultimate Headless Experience for Next.js**

Style-agnostic, accessible, and high-performance React components.\
Focus on your design, let us handle the logic.

[![npm version](https://img.shields.io/npm/v/@cooolpower/headless-ui.svg?style=flat-square)](https://www.npmjs.com/package/@cooolpower/headless-ui)
[![npm downloads](https://img.shields.io/npm/dm/@cooolpower/headless-ui.svg?style=flat-square)](https://www.npmjs.com/package/@cooolpower/headless-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Vanilla Extract](https://img.shields.io/badge/Vanilla%20Extract-CSS-DB7093?logo=css3&logoColor=white)](https://vanilla-extract.style/)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg)](LICENSE)

</div>

---

<div align="center">

<img src="https://raw.githubusercontent.com/cooolpower/headless-playground/main/docs/images/hero-light.png" alt="Headless UI Playground - Landing Page" width="100%" />

</div>

## ✨ Features

- 🧩 **70+ Headless Components** — Logic-first, style-agnostic design
- ♿ **Accessible** — ARIA roles, keyboard navigation, focus management
- 🎨 **Optional Default Styles** — Toggle with `injectStyles` prop
- 🌗 **Dark Mode** — CSS custom properties based theming
- 📦 **Zero Config** — Just import and use, no setup required
- 🔒 **TypeScript Strict** — Full type safety with no `any`
- 🧪 **Interactive Playground** — Live preview with control panels
- 📖 **MDX Documentation** — Code examples + live demos in one place

---

## 📸 Screenshots

<table>
  <tr>
    <td width="50%">
      <img src="https://raw.githubusercontent.com/cooolpower/headless-playground/main/docs/images/component-dark.png" alt="Component Documentation - Dark Mode" />
      <p align="center"><sub><b>Component Documentation (Dark Mode)</b></sub></p>
    </td>
    <td width="50%">
      <img src="https://raw.githubusercontent.com/cooolpower/headless-playground/main/docs/images/playground-demo.png" alt="Interactive Playground" />
      <p align="center"><sub><b>Interactive Playground with Controls</b></sub></p>
    </td>
  </tr>
</table>

---

## 🚀 Quick Start

### Installation

```bash
# Using pnpm
pnpm add @cooolpower/headless-ui

# Using npm
npm install @cooolpower/headless-ui

# Using yarn
yarn add @cooolpower/headless-ui
```

### Usage

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

## 🧩 Components

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Components</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Basic</b></td>
      <td>Alert · Avatar · Badge · Button · Card · Divider · Icon · Progress · Tag · Typography</td>
    </tr>
    <tr>
      <td><b>Form</b></td>
      <td>Input · Textarea · InputNumber · AutoComplete · Cascader · Checkbox · Radio · Switch · Select · Slider · Form · Rate</td>
    </tr>
    <tr>
      <td><b>Data Display</b></td>
      <td>List · Table · DataTable · Descriptions · Statistic · Timeline · Tree · TreeSelect · Chart · Heatmap</td>
    </tr>
    <tr>
      <td><b>Navigation</b></td>
      <td>Tabs · Breadcrumb · Dropdown · Menu · Pagination · Steps</td>
    </tr>
    <tr>
      <td><b>Feedback</b></td>
      <td>Modal · Drawer · Dialog · Popover · Tooltip · Toast · Snackbar · LoadingBar · Empty</td>
    </tr>
    <tr>
      <td><b>Date &amp; Time</b></td>
      <td>Calendar · DatePicker · TimePicker · Countdown · FlipCountdown</td>
    </tr>
    <tr>
      <td><b>Layout</b></td>
      <td>PageHeader · FloatButton · Watermark</td>
    </tr>
    <tr>
      <td><b>Media</b></td>
      <td>Carousel · Image · Ellipsis · GradientText · QRCode</td>
    </tr>
    <tr>
      <td><b>Advanced Input</b></td>
      <td>DynamicTags · DynamicInput · Transfer · Upload · ColorPicker · Mention</td>
    </tr>
    <tr>
      <td><b>Other</b></td>
      <td>Collapse</td>
    </tr>
  </tbody>
</table>

> Each component includes: **Usage examples** · **Interactive playground** · **API reference** · **Accessibility notes** · **Default CSS snippet**

---

## 🛠 Tech Stack

| Layer             | Technology                         |
| ----------------- | ---------------------------------- |
| **Framework**     | Next.js 16 (App Router)            |
| **Language**      | TypeScript (strict mode)           |
| **Styling**       | Vanilla Extract + CSS Custom Props |
| **Documentation** | MDX + rehype-pretty-code (Shiki)   |
| **Build**         | tsup (library)                     |

---

## 🧠 Design Philosophy

| Principle          | Description                                             |
| ------------------ | ------------------------------------------------------- |
| **Headless First** | Components expose behavior, not styles                  |
| **Opt-in Styling** | Default CSS via `injectStyles` — override with your own |
| **Composition**    | Small, composable APIs over monolithic configs          |
| **Accessibility**  | ARIA, keyboard nav, focus trap built-in                 |
| **Type Safety**    | TypeScript strict, no `any`, explicit return types      |

---

## 📄 License

MIT © [cooolpower](https://github.com/cooolpower)

---

<p align="center">
  Built with ❤️ by James
</p>

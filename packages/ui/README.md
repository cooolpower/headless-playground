# @cooolpower/headless-ui

[![npm version](https://img.shields.io/npm/v/@cooolpower/headless-ui.svg?style=flat-square)](https://www.npmjs.com/package/@cooolpower/headless-ui)
[![npm downloads](https://img.shields.io/npm/dm/@cooolpower/headless-ui.svg?style=flat-square)](https://www.npmjs.com/package/@cooolpower/headless-ui)
[![license](https://img.shields.io/npm/l/@cooolpower/headless-ui.svg?style=flat-square)](https://github.com/cooolpower/headless-playground/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/cooolpower/headless-playground/pulls)

**A high-performance, accessible, and fully customizable headless UI library for React.**

`@cooolpower/headless-ui` provides a set of 57+ unstyled components and hooks, giving you complete control over your UI's appearance while handling all the complex logic, state management, and accessibility requirements.

---

## ✨ Features

- 🏗️ **Headless Architecture**: Complete freedom over styling (CSS, Tailwind, CSS-in-JS).
- ♿ **Built-in Accessibility**: ARIA-compliant, keyboard navigation, and focus management.
- 📦 **57+ Components**: From basic buttons to complex data tables and charts.
- 🪝 **Hook-first Design**: Use our logic hooks or high-level components.
- 📐 **TypeScript First**: Robust types for a superior developer experience.
- ⚡ **Tree-shakeable**: Optimised for minimal bundle size.

---

## 🚀 Installation

```bash
# Using pnpm
pnpm add @cooolpower/headless-ui

# Using npm
npm install @cooolpower/headless-ui

# Using yarn
yarn add @cooolpower/headless-ui
```

---

## 📖 Quick Start

You can use either the full logic-included components or the underlying headless hooks for maximum flexibility.

### 1. Using Components

Ideal for getting started quickly. Just bring your own styles or use our default tokens.

```tsx
import { Button, Input, Flex } from '@cooolpower/headless-ui';

function App() {
  return (
    <Flex gap="medium">
      <Input placeholder="Enter your name" />
      <Button onClick={() => console.log('Hello!')}>Submit</Button>
    </Flex>
  );
}
```

### 2. Using Headless Hooks

Ideal when you need absolute control over the DOM structure and animations.

```tsx
import { useButton } from '@cooolpower/headless-ui';

function MyCustomButton(props) {
  const { buttonProps, isPressed } = useButton(props);

  return (
    <button
      {...buttonProps}
      style={{
        backgroundColor: isPressed ? 'blue' : 'gray',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
      }}
    >
      {props.children}
    </button>
  );
}
```

---

## 📦 Component Overview

Our library covers everything you need to build a modern dashboard or application.

| Category         | Components                                                                |
| :--------------- | :------------------------------------------------------------------------ |
| **Basic Inputs** | Button, Input, Select, Checkbox, Radio, Switch, InputNumber, AutoComplete |
| **Data Display** | Table, DataTable, List, Card, Badge, Tag, Avatar, Image, Typography       |
| **Navigation**   | Breadcrumb, Menu, Pagination, Steps, Tabs, PageHeader                     |
| **Overlays**     | Modal, Drawer, Dialog, Popover, Tooltip, Dropdown                         |
| **Feedback**     | Alert, Progress, Timeline, Toast, Snackbar, LoadingBar                    |
| **Date & Time**  | Calendar, DatePicker, TimePicker, Countdown, FlipCountdown                |
| **Advanced**     | Charts, Heatmap, Tree, TreeSelect, Carousel, Upload, ColorPicker          |
| **Layout**       | Flex, Grid, Space, Divider, Watermark                                     |

---

## 🎨 Styling Philosophy

`@cooolpower/headless-ui` stays out of your way. We provide the **Behavior** and **Accessibility**, while you provide the **Style**.

Every component accepts a `className` and `style` prop. For complex components, we provide data-attributes like `data-open`, `data-disabled`, or `data-placement` so you can style them easily with CSS:

```css
/* Styling based on state */
.hc-dialog[data-open='true'] {
  animation: fade-in 0.2s ease-out;
}

.hc-button[data-disabled='true'] {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 🤝 Contributing

Contributions are always welcome! Whether it's fixing bugs, improving documentation, or suggesting new components, please feel free to open a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by James
</p>

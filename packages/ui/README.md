# @repo/ui

Headless React component library with 57+ accessible UI components.

## 🚀 Installation

```bash
npm install @repo/ui
# or
pnpm add @repo/ui
# or
yarn add @repo/ui
```

## 📖 Usage

```tsx
import { Button, useButton, Input, Dropdown } from '@repo/ui';

function MyApp() {
  return (
    <div>
      <Button onClick={() => alert('Clicked!')}>Click Me</Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

## 🎯 Features

- **57+ Components**: Comprehensive UI component library
- **Headless Architecture**: full control over styling
- **TypeScript**: Full type safety
- **Accessibility**: ARIA-compliant and keyboard navigation
- **Controlled/Uncontrolled**: Flexible state management
- **Tree-shakeable**: Import only what you need

## 📦 Components

### Basic UI

Button, Input, Textarea, Select, Checkbox, Radio, Switch

### Layout

Card, Divider, Space, Grid, Flex

### Data Display

Tag, Badge, Avatar, Icon, Image, Typography, Ellipsis, Empty

### Navigation

Breadcrumb, Menu, Pagination, Steps, Tabs

### Feedback

Alert, Progress, Statistic, Timeline, Toast, Snackbar

### Data Entry

Calendar, DatePicker, TimePicker, ColorPicker, Slider, Rate, Upload, Cascader

### Overlays

Modal, Drawer, Dialog, Popover, Tooltip, Dropdown

### Advanced

Table, DataTable, Tree, Form, Chart, Heatmap, Carousel, Collapse

## 📄 License

MIT © James

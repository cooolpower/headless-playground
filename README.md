# Headless UI Playground

A **Headless UI Component Playground** built with **Next.js**, **TypeScript**, **MDX**, and **pnpm**.

This project focuses on **behavior-first UI components** rather than styles, inspired by **shadcn/ui** and **Storybook**, but implemented from scratch to demonstrate component design, accessibility, and documentation patterns.

---

## ✨ What is this?

This repository is a personal portfolio project showcasing how to design and document **headless React components**.

Each component:

* Exposes **behavior and accessibility**, not styles
* Supports **controlled & uncontrolled patterns**
* Can be **interactively tested** directly in the browser
* Is documented using **MDX**, combining explanation + live examples

The playground UI provides a **Storybook-like experience** without using Storybook itself.

---

## 🧠 Key Concepts Demonstrated

* Headless component architecture
* Accessibility (ARIA roles, keyboard navigation, focus management)
* Controlled vs uncontrolled state patterns
* Composition-first API design
* MDX-based component documentation
* Custom interactive playground (preview + controls)

---

## 🛠 Tech Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Package Manager**: pnpm
* **Styling**: Tailwind CSS (demo purposes only)
* **Documentation**: MDX (`@next/mdx`)
* **Deployment**: Vercel

---

## 📁 Project Structure

```txt
src/
├─ app/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ components/
│     └─ [slug]/
│        └─ page.tsx      # MDX-driven component pages
│
├─ components/
│  ├─ headless/           # Headless component logic
│  │  ├─ button/
│  │  ├─ dropdown/
│  │  └─ ...
│  │
│  ├─ playground/         # Storybook-like playground
│  │  ├─ playground.tsx
│  │  ├─ preview.tsx
│  │  └─ controls.tsx
│  │
│  └─ ui/                 # Styled demo components
│
├─ content/
│  └─ components/         # MDX documentation
│     ├─ button.mdx
│     └─ dropdown.mdx
│
└─ lib/
   └─ mdx.ts
```

---

## 🧩 Components

Currently implemented / planned components:

* Button
* Toggle / Switch
* Dropdown
* Modal (Focus Trap)
* Tabs (Roving Tabindex)

Each component page includes:

* Usage explanation
* API description
* Accessibility notes
* Interactive playground

---

## 🧪 Playground

The playground allows you to:

* See component behavior in real time
* Toggle props via control panels
* Understand how state affects behavior

This replaces traditional Storybook with a **fully custom solution** integrated into the app itself.

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the playground.

---

## 📦 Why not Storybook?

This project intentionally avoids Storybook to:

* Demonstrate understanding of component documentation internals
* Control rendering and routing via Next.js
* Integrate documentation directly with the app
* Explore MDX-driven UI patterns

---

## 🎯 Goal of This Project

This project is designed as a **frontend engineering portfolio**, focusing on:

* Clear separation of logic and presentation
* Scalable component APIs
* Real-world accessibility considerations
* Developer experience and documentation

---

## 📄 License

MIT
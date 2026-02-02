# Zaking's Blog

一个基于 Next.js 16、Tailwind CSS v4 和 Velite 构建的现代化技术博客。旨在分享高级前端架构、数据可视化与工程化实践。

## 🛠️ 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI 组件**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **内容管理**: [Velite](https://velite.js.org/) (Type-safe MDX)
- **动画**: [Framer Motion](https://www.framer.com/motion/) & Tailwindcss Animate
- **可视化**: [Recharts](https://recharts.org/)
- **代码高亮**: [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/)

## ✨ 特性

- 🚀 **高性能**: 基于 Next.js App Router 和 React Server Components 构建。
- 📝 **MDX 支持**: 使用 Velite 处理 MDX 内容，支持类型安全的内容集合。
- 🎨 **现代化 UI**: 采用 Tailwind CSS v4 和 Shadcn UI 构建的精美界面。
- 🌗 **暗黑模式**: 完美支持日间/夜间模式切换。
- 📊 **数据可视化**: 集成 Recharts 展示动态图表。
- 📑 **自动目录**: 自动生成文章目录 (Table of Contents)。
- 🧩 **代码高亮**: 优雅的代码块语法高亮体验。
- 🏷️ **分类与标签**: 支持多维度的内容组织（JavaScript, CSS, 可视化, 工程化等）。

## 📂 目录结构

```bash
.
├── src/
│   ├── app/                # Next.js App Router 页面
│   ├── components/         # React 组件
│   │   ├── layout/         # 布局组件 (Header, Footer)
│   │   ├── modules/        # 业务模块组件 (文章列表, 图表等)
│   │   ├── shared/         # 共享组件 (Theme Toggle)
│   │   └── ui/             # Shadcn UI 基础组件
│   ├── content/            # MDX 博客文章源文件
│   ├── lib/                # 工具函数与配置
│   ├── styles/             # 全局样式 (Tailwind v4 配置)
│   └── types/              # TypeScript 类型定义
├── velite.config.ts        # Velite 内容模型配置
├── next.config.ts          # Next.js 配置
└── package.json            # 项目依赖
```

## 🚀 快速开始

### 环境准备

确保你的本地环境已安装：
- [Node.js](https://nodejs.org/) (推荐 v20+)
- npm, yarn, pnpm 或 bun

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

开发模式下，Velite 会在后台监听内容变更并自动重新生成。

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
```

该命令会先执行 `velite` 生成内容数据的静态资源，然后运行 `next build` 构建应用。

## 📝 内容创作

在 `src/content/posts` 目录下创建 `.mdx` 文件即可添加新文章。

**Frontmatter 示例:**

```yaml
---
title: "Hello World"
description: "这是我的第一篇博客文章"
date: "2024-01-31"
published: true
category: "Engineering"
tags: ["Next.js", "Velite"]
---

这里是正文内容...
```

**支持的分类:**
- CSS
- JavaScript
- TypeScript
- HTML
- Visualization (可视化)
- Performance (性能优化)
- Engineering (工程化)

## 📄 许可证

[MIT](LICENSE) © Zaking
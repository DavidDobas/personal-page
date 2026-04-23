# personal-page

Personal website and blog. Writing about control systems, motors, and robots.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · MDX · KaTeX · Shiki

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Writing a new blog post

1. Create a new `.mdx` file in `src/content/posts/`. The filename becomes the URL slug.

   ```
   src/content/posts/my-new-post.mdx   →   /blog/my-new-post
   ```

2. Add the required frontmatter at the top of the file:

   ```yaml
   ---
   title: "My New Post"
   date: "2026-04-23"
   description: "A one-liner summary shown in the post list."
   ---
   ```

3. Write the body in Markdown/MDX. Standard formatting works out of the box:

   ```mdx
   ## Section heading

   Body text with **bold**, *italic*, and `inline code`.

   ```python
   def torque(kp, error):
       return kp * error
   ```

   Posts are sorted by `date` descending on both the home page and `/blog`.

### Math

Math rendering is enabled via KaTeX. Use standard LaTeX delimiters:

```mdx
Inline: $P = I^2 R$

Block:
$$
\tau = k_p e + k_d \dot{e}
$$
```

---

## Adding interactive graphs

There is no chart library pre-installed — pick whichever fits the post (e.g. Recharts, Plotly, Victory, D3). The general pattern is the same regardless of library.

### Step 1 — install a library

```bash
npm install recharts        # or plotly.js-dist-min, victory, etc.
```

### Step 2 — create a component

Create a client component under `src/components/`. Mark it `"use client"` because chart libraries rely on browser APIs.

```typescript
// src/components/TorquePlot.tsx
"use client";

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { t: 0, torque: 0 },
  { t: 1, torque: 2.3 },
  { t: 2, torque: 4.1 },
  // ...
];

export function TorquePlot() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="t" label={{ value: "Time (s)", position: "insideBottom" }} />
        <YAxis label={{ value: "Torque (Nm)", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Line type="monotone" dataKey="torque" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Step 3 — register the component

Open `mdx-components.tsx` at the project root and add the component to the map. This makes it available in every MDX post without a per-file import.

```typescript
// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import { TorquePlot } from "@/components/TorquePlot";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    TorquePlot,
    ...components,
  };
}
```

Alternatively, you can import the component directly inside a single post instead of registering it globally:

```mdx
import { TorquePlot } from "@/components/TorquePlot";

Here is the torque response:

<TorquePlot />
```

> **Note:** Direct imports inside MDX files work because `next-mdx-remote` compiles them server-side. You do **not** need to restart the dev server after registering a new component in `mdx-components.tsx`.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout — fonts, ThemeProvider, analytics
│   ├── page.tsx            # Home page — bio + post list
│   └── blog/
│       ├── page.tsx        # /blog index
│       └── [slug]/
│           └── page.tsx    # Individual post renderer (MDXRemote lives here)
├── components/
│   ├── ThemeProvider.tsx   # next-themes wrapper
│   └── ThemeToggle.tsx     # Sun/moon toggle (fixed top-right)
├── config/
│   └── theme.ts            # Font + color tokens
├── content/
│   ├── about.md            # Homepage bio
│   ├── post-template.mdx   # Reference template for new posts
│   └── posts/              # Blog posts — one .mdx file each
└── lib/
    └── posts.ts            # getAllPosts() / getPost() — file-system helpers
mdx-components.tsx          # Global MDX component registry
```

---

## Deployment

The app builds to a standalone Docker image. A `Dockerfile` and `railway.json` are included.

```bash
# build and run locally
docker build -t personal-page .
docker run -p 3000:3000 personal-page
```

Push to the Railway project to deploy.

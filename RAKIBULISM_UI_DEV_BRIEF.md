# @rakibulism/ui - Developer Brief

**Project Name:** @rakibulism/ui  
**Status:** Planning Phase  
**Visibility:** Public (Open Source)  
**Package Registry:** NPM  
**GitHub:** https://github.com/rakibulism/ui  

---

## 📋 Executive Summary

We are building **@rakibulism/ui**, a code-first design system and React component library that will be published publicly on NPM. This is an open-source project designed for developers worldwide to install and use in their projects.

**The goal:** Create a reusable, well-documented, type-safe UI component library that follows modern best practices and is easy to integrate into any React project.

---

## 🎯 Project Objectives

1. **Build a comprehensive component library** with core UI elements (Button, Input, Card, etc.)
2. **Define design tokens** (colors, spacing, typography, shadows) as the single source of truth
3. **Ship on NPM** as a scoped public package: `@rakibulism/ui`
4. **Enable easy installation** via `npm install @rakibulism/ui`
5. **Provide full TypeScript support** with exported types
6. **Support global styles** via CSS import
7. **Allow token reuse** for developers building custom components

---

## 📦 What We're Building

### Core Deliverables

#### 1. **React Component Library**
A set of pre-built, production-ready components:
- Button (variants: primary, secondary, ghost, danger)
- Input (with label, error states, helper text)
- Card (variants: elevated, outlined, filled)
- *Future: Modal, Dropdown, Tabs, Tooltip, etc.*

#### 2. **Design Tokens**
Exportable design language in TypeScript:
- **Colors:** Primary, gray scale, success, error, warning
- **Spacing:** 0-24 scale (4px increments)
- **Typography:** Font families, sizes, weights, line heights
- **Shadows:** sm, base, md, lg, xl
- **Border Radius:** sm, md, lg

#### 3. **Global Styles**
CSS variables and reset styles available for import

#### 4. **Documentation**
- README with installation & usage examples
- API documentation for each component
- Token reference guide
- GitHub repo with clear structure

---

## 🏗️ Technical Architecture

### Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Framework** | React 18+ | Peer dependency |
| **Language** | TypeScript | Full type coverage |
| **Build Tool** | Vite | Fast development & building |
| **Styling** | CSS Modules + CSS Variables | Scoped styles + themeable |
| **Utilities** | clsx | Conditional class names |
| **Type Definitions** | TypeScript + vite-plugin-dts | Auto-generated .d.ts files |
| **Package Format** | ESM + CommonJS | Maximum compatibility |

### Folder Structure

```
ui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx           # Component implementation
│   │   │   └── Button.module.css    # Scoped styles
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.module.css
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.module.css
│   │   └── index.ts                 # Barrel export all components
│   │
│   ├── tokens/
│   │   ├── colors.ts                # Color palette
│   │   ├── spacing.ts               # Spacing scale
│   │   ├── typography.ts            # Font definitions
│   │   ├── shadows.ts               # Shadow definitions
│   │   └── index.ts                 # Export all tokens
│   │
│   ├── styles/
│   │   └── globals.css              # Global CSS variables & resets
│   │
│   ├── index.ts                     # Main entry point
│   └── vite-env.d.ts                # Vite type definitions
│
├── .gitignore
├── package.json                     # See detailed spec below
├── vite.config.ts                   # Build configuration
├── tsconfig.json                    # TypeScript configuration
├── README.md                        # Public documentation
├── LICENSE                          # MIT License
└── dist/                            # Built output (generated)
```

---

## 📝 Component Specifications

### Button Component

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
}
```

**Variants:**
- `primary` - Default, brand color, blue (#2563EB)
- `secondary` - Gray background with border
- `ghost` - Transparent, text only, shows on hover
- `danger` - Red background for destructive actions

**Sizes:**
- `sm` - 32px height, 14px font
- `md` - 40px height, 16px font (default)
- `lg` - 48px height, 18px font

**States:**
- Default, Hover, Active, Disabled, Loading
- Focus visible with outline

**Example Usage:**
```typescript
<Button variant="primary" size="md" onClick={() => {}}>
  Click Me
</Button>

<Button variant="danger" isLoading={true}>
  Saving...
</Button>
```

---

### Input Component

**Props:**
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}
```

**Features:**
- Optional label above input
- Error message display with red color
- Helper text below input (gray)
- Focus state with blue ring
- Disabled state styling
- All standard HTML input attributes supported

**Example Usage:**
```typescript
<Input
  id="email"
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  helperText="We'll never share your email"
  error={emailError}
/>
```

---

### Card Component

**Props:**
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled';
}
```

**Variants:**
- `elevated` - Box shadow for depth (default)
- `outlined` - Border only, no shadow
- `filled` - Filled background with subtle border

**Example Usage:**
```typescript
<Card variant="elevated">
  <h2>Card Title</h2>
  <p>Card content goes here</p>
</Card>
```

---

## 🎨 Design Tokens

### Colors

**Primary Brand:**
- primary.500: `#3B82F6` (brand blue)
- primary.600: `#2563EB` (hover state)
- primary.700: `#1D4ED8` (active state)

**Semantic:**
- success.500: `#10B981` (actions, positive)
- error.500: `#EF4444` (errors, destructive)
- warning.500: `#F59E0B` (warnings, caution)

**Neutral:**
- gray.50 to gray.900 (light to dark)
- white, black (extremes)

### Spacing Scale

```
0: 0px
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
24: 96px
```

### Typography

**Font Families:**
- `sans`: System UI font stack (Apple/Windows/Android)
- `mono`: Fira Code for code snippets

**Sizes:** xs (12px) → 4xl (36px)

**Weights:** light (300) → bold (700)

**Line Heights:** tight (1.2) → relaxed (1.75)

### Shadows

```
sm: Light shadow for small elements
base: Default shadow
md: Medium shadow for cards
lg: Large shadow for dropdowns/popovers
xl: Extra large shadow for modals
```

---

## 📦 Package Configuration (package.json)

```json
{
  "name": "@rakibulism/ui",
  "version": "0.1.0",
  "description": "Code-first design system and UI components by Rakibul Islam",
  "author": "Rakibul Islam <your-email@example.com>",
  "license": "MIT",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles/globals.css",
    "./tokens": {
      "import": "./dist/tokens/index.js",
      "require": "./dist/tokens/index.cjs",
      "types": "./dist/tokens/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "type-check": "tsc --noEmit",
    "preview": "vite preview",
    "prepublishOnly": "npm run build && npm run type-check"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/rakibulism/ui.git"
  },
  "bugs": {
    "url": "https://github.com/rakibulism/ui/issues"
  },
  "homepage": "https://github.com/rakibulism/ui#readme",
  "keywords": [
    "ui",
    "design-system",
    "components",
    "react",
    "typescript"
  ],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite-plugin-dts": "^7.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0"
  },
  "dependencies": {
    "clsx": "^2.0.0"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

---

## 🚀 Deployment & Publishing

### Step 1: GitHub Setup

1. Create repository: `https://github.com/rakibulism/ui`
2. Push initial code
3. Make it public so anyone can see the source

### Step 2: NPM Publishing

1. Create NPM account at https://www.npmjs.com
2. Run `npm adduser` locally
3. Run `npm publish --access public`
4. Package will be available at: https://www.npmjs.com/package/@rakibulism/ui

### Step 3: Distribution

Users can install via:
```bash
npm install @rakibulism/ui
```

Or use directly in projects:
```bash
npm i @rakibulism/ui
# or
yarn add @rakibulism/ui
# or
pnpm add @rakibulism/ui
```

---

## 📚 Usage Examples

### Basic Installation

```bash
npm install @rakibulism/ui
```

### Import Components

```typescript
import { Button, Input, Card } from '@rakibulism/ui';
import '@rakibulism/ui/styles';

export default function App() {
  const [email, setEmail] = React.useState('');
  
  return (
    <Card variant="elevated">
      <h1>Welcome</h1>
      
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      
      <Button
        variant="primary"
        size="lg"
        onClick={() => console.log('Submitted:', email)}
      >
        Submit
      </Button>
    </Card>
  );
}
```

### Import Tokens

```typescript
import { colors, spacing, typography } from '@rakibulism/ui/tokens';

const customStyle = {
  color: colors.primary[500],  // #3B82F6
  padding: spacing[4],         // 16px
  fontSize: typography.fontSize.base, // 16px
};
```

### Use Global Styles (Optional)

```typescript
// In your app entry file (main.tsx or App.tsx)
import '@rakibulism/ui/styles';

// This imports:
// - CSS variables (--color-*, --space-*, etc.)
// - Global resets
// - Font rendering optimizations
```

---

## ✅ Definition of Done

Before marking this project complete, verify:

- [ ] All 3 core components built (Button, Input, Card)
- [ ] All design tokens defined and exported
- [ ] Global styles included
- [ ] TypeScript types for all components
- [ ] CSS Modules scoped styling applied
- [ ] Build produces ESM + CommonJS formats
- [ ] Type definitions (.d.ts) auto-generated
- [ ] README.md with examples and API docs
- [ ] MIT License included
- [ ] GitHub repository created and public
- [ ] npm run build completes without errors
- [ ] npm publish succeeds with @rakibulism/ui
- [ ] Test installation in separate project works
- [ ] All exports accessible from main entry point
- [ ] Token imports working separately

---

## 🔄 Future Enhancements (Post v1.0)

Once v0.1.0 is published, consider adding:

- Modal / Dialog component
- Dropdown / Select component
- Tabs component
- Tooltip component
- Toast / Alert component
- Breadcrumbs component
- Badge component
- Spinner / Skeleton loaders
- Accessibility testing (WCAG 2.1)
- Storybook for interactive documentation
- Visual regression testing
- Changelog automation
- Semantic versioning workflow
- GitHub Actions CI/CD

---

## 📖 Documentation Files Needed

### README.md (Root)
- Project description
- Installation instructions
- Quick start example
- Component list with links
- Token export documentation
- Links to GitHub and NPM
- License information

### Component Documentation (Optional, v1.1+)
- Individual component API docs
- Props reference
- Variant showcase
- Code examples
- Accessibility notes

---

## 💡 Key Principles

1. **Code-First:** Tokens and components defined in TypeScript, not Figma
2. **Type Safety:** Every component fully typed with exported interfaces
3. **Modular:** Components can be imported individually
4. **CSS Scoped:** No global class pollution via CSS Modules
5. **Token Driven:** Design values centralized in tokens/ folder
6. **Open Source:** MIT licensed, free for commercial and personal use
7. **Well Documented:** Clear API, examples, and usage patterns
8. **Performance:** Tree-shakeable, minimal bundle impact
9. **Accessible:** Built with keyboard nav and screen readers in mind
10. **Extensible:** Developers can customize via design tokens and CSS variables

---

## ❓ Q&A

**Q: Who can use @rakibulism/ui?**  
A: Anyone, worldwide. It's open source under MIT license.

**Q: Is this free?**  
A: Yes, completely free and open source.

**Q: Can developers modify the components?**  
A: Yes, it's MIT licensed. They can fork or copy. Or they can request features via GitHub issues.

**Q: How do we handle updates?**  
A: Use semantic versioning (0.1.0 → 0.1.1 for patches, 0.2.0 for features, 1.0.0 for major).

**Q: What about browser support?**  
A: Modern browsers (Chrome, Firefox, Safari, Edge). CSS Grid/Flexbox support required.

**Q: Is TypeScript required to use it?**  
A: No, but types are included for those using TypeScript.

**Q: Can this be used in Vue, Svelte, etc.?**  
A: Not directly (it's React). But tokens can be extracted and adapted.

---

## 📞 Contact & Next Steps

Once this brief is approved:

1. **Developer** sets up the repository structure
2. **Developer** implements components according to specs
3. **Developer** runs npm publish when ready
4. **Owner** announces on social media / personal channels
5. **Community** can start using @rakibulism/ui

---

## 📄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | [Today] | Initial brief created |

---

**This brief serves as the source of truth for the @rakibulism/ui project. Any deviations should be discussed with the project owner.**

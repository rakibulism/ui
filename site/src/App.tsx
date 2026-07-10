import { useEffect, useRef, useState } from 'react';
import {
  Button,
  Input,
  Card,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Textarea,
  Select,
  Tooltip,
  Modal,
  ToastProvider,
  useToast,
  Menu,
  MenuItem,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  Breadcrumbs,
  BreadcrumbItem,
  Pagination,
  Badge,
  Avatar,
  Spinner,
  Skeleton,
  Progress,
  Divider,
  Alert,
  colors,
  spacing,
  typography,
  shadows,
  radius,
  type ButtonVariant,
  type ButtonSize,
} from 'rakibulism-ui';

const PKG = 'rakibulism-ui';
const NPM_URL = `https://www.npmjs.com/package/${PKG}`;
const GH_URL = 'https://github.com/rakibulism/ui';

/* --- small building blocks --- */

function Logo() {
  return (
    <span className="logo" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="9" height="9" rx="2.5" fill="currentColor" />
        <rect x="13" y="2" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.55" />
        <rect x="2" y="13" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.55" />
        <rect x="13" y="13" width="9" height="9" rx="2.5" fill="currentColor" opacity="0.25" />
      </svg>
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="copy-command">
      <code>
        <span className="copy-prompt">$</span> {command}
      </code>
      <button
        type="button"
        className="copy-btn"
        onClick={copy}
        aria-label="Copy install command"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

/** Reveals children with a subtle fade-up once they scroll into view. */
function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section">
      <Reveal className="section-head">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {intro && <p className="section-intro">{intro}</p>}
      </Reveal>
      {children}
    </section>
  );
}

/* --- showcase sections --- */

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'ghost', 'danger'];
const SIZES: ButtonSize[] = ['sm', 'md', 'lg'];

function ButtonPlayground() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  return (
    <div className="playground">
      <div className="playground-stage">
        <Button
          variant={variant}
          size={size}
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          {isLoading ? 'Loading…' : 'Button'}
        </Button>
      </div>

      <div className="playground-controls">
        <div className="control-row">
          <span className="control-label">Variant</span>
          <div className="chips">
            {VARIANTS.map((v) => (
              <button
                key={v}
                type="button"
                className={`chip ${variant === v ? 'chip-active' : ''}`}
                onClick={() => setVariant(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="control-row">
          <span className="control-label">Size</span>
          <div className="chips">
            {SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className={`chip ${size === s ? 'chip-active' : ''}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="control-row">
          <span className="control-label">State</span>
          <div className="chips">
            <button
              type="button"
              className={`chip ${isLoading ? 'chip-active' : ''}`}
              onClick={() => setLoading((x) => !x)}
            >
              loading
            </button>
            <button
              type="button"
              className={`chip ${isDisabled ? 'chip-active' : ''}`}
              onClick={() => setDisabled((x) => !x)}
            >
              disabled
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonsSection() {
  return (
    <Section
      id="buttons"
      eyebrow="Component"
      title="Button"
      intro="Four variants, three sizes, plus loading and disabled states. Forwards every native button attribute and a ref."
    >
      <Reveal className="panel">
        <ButtonPlayground />
      </Reveal>

      <Reveal className="panel" delay={80}>
        <div className="demo-grid">
          {VARIANTS.map((v) => (
            <div key={v} className="demo-cell">
              <span className="demo-cell-label">{v}</span>
              <Button variant={v}>{v}</Button>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function InputsSection() {
  const [value, setValue] = useState('');
  return (
    <Section
      id="inputs"
      eyebrow="Component"
      title="Input"
      intro="Labels, helper text, and error states with proper htmlFor / aria-describedby / aria-invalid wiring out of the box."
    >
      <Reveal className="panel">
        <div className="input-grid">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            helperText="We'll never share your email."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error="Must be at least 8 characters."
          />
          <Input label="Disabled" placeholder="Unavailable" disabled />
        </div>
      </Reveal>
    </Section>
  );
}

function CardsSection() {
  const variants = [
    { v: 'elevated', desc: 'Soft layered shadow for depth.' },
    { v: 'outlined', desc: 'Border only, no shadow.' },
    { v: 'filled', desc: 'Tinted surface with a subtle border.' },
  ] as const;

  return (
    <Section
      id="cards"
      eyebrow="Component"
      title="Card"
      intro="A surface container with three variants for grouping content."
    >
      <Reveal>
        <div className="card-grid">
          {variants.map(({ v, desc }) => (
            <Card key={v} variant={v}>
              <h3 className="card-title">{v}</h3>
              <p className="card-text">{desc}</p>
            </Card>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function FormsSection() {
  const [country, setCountry] = useState('us');
  const [plan, setPlan] = useState('pro');
  const [notifications, setNotifications] = useState(true);

  return (
    <Section
      id="forms"
      eyebrow="Components"
      title="Form primitives"
      intro="Checkbox, Radio, Switch, Textarea, and Select — styled natively for full keyboard and screen reader support."
    >
      <Reveal className="panel">
        <div className="forms-grid">
          <div className="form-demo-cell">
            <span className="demo-cell-label">Checkbox</span>
            <Checkbox label="Subscribe to updates" defaultChecked />
          </div>
          <div className="form-demo-cell">
            <span className="demo-cell-label">Radio</span>
            <RadioGroup name="plan-demo" value={plan} onChange={setPlan}>
              <Radio value="free" label="Free" />
              <Radio value="pro" label="Pro" />
            </RadioGroup>
          </div>
          <div className="form-demo-cell">
            <span className="demo-cell-label">Switch</span>
            <Switch
              label="Notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </div>
          <div className="form-demo-cell form-demo-cell-wide">
            <span className="demo-cell-label">Textarea</span>
            <Textarea placeholder="Tell us about yourself" helperText="Max 500 characters" />
          </div>
          <div className="form-demo-cell form-demo-cell-wide">
            <span className="demo-cell-label">Select</span>
            <Select value={country} onChange={setCountry}>
              <option value="us">United States</option>
              <option value="bd">Bangladesh</option>
              <option value="uk">United Kingdom</option>
            </Select>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function OverlaysSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { show } = useToast();

  return (
    <Section
      id="overlays"
      eyebrow="Components"
      title="Overlays"
      intro="Tooltip, Modal, Toast, and Menu — wrapping Radix UI primitives under the hood for real focus traps, keyboard navigation, and collision-aware positioning."
    >
      <Reveal className="panel">
        <div className="overlay-row">
          <Tooltip content="Saves your changes" placement="top">
            <Button variant="secondary">Hover for tooltip</Button>
          </Tooltip>

          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Confirm action">
            <p>This is a portal-rendered dialog with focus handling and Escape-to-close.</p>
          </Modal>

          <Button
            variant="secondary"
            onClick={() =>
              show({
                title: 'Saved',
                description: 'Your changes were saved.',
                variant: 'success',
              })
            }
          >
            Show toast
          </Button>

          <Menu trigger={<Button variant="secondary">Open menu</Button>}>
            <MenuItem>Edit</MenuItem>
            <MenuItem destructive>Delete</MenuItem>
          </Menu>
        </div>
      </Reveal>
    </Section>
  );
}

function NavigationSection() {
  const [page, setPage] = useState(5);

  return (
    <Section
      id="navigation"
      eyebrow="Components"
      title="Navigation"
      intro="Tabs, Accordion, Breadcrumbs, and Pagination for moving through content."
    >
      <Reveal className="panel">
        <Breadcrumbs>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Library</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Components</BreadcrumbItem>
        </Breadcrumbs>
      </Reveal>

      <Reveal className="panel" delay={60}>
        <Tabs defaultValue="profile">
          <TabList>
            <Tab value="profile">Profile</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="profile">Profile panel content goes here.</TabPanel>
          <TabPanel value="settings">Settings panel content goes here.</TabPanel>
        </Tabs>
      </Reveal>

      <Reveal className="panel" delay={120}>
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1" title="What is rakibulism-ui?">
            <p>A code-first React component library with design tokens.</p>
          </AccordionItem>
          <AccordionItem value="item-2" title="Does it require Tailwind?">
            <p>
              No — tokens are sourced from Tailwind&apos;s palette, but there&apos;s no
              runtime dependency.
            </p>
          </AccordionItem>
        </Accordion>
      </Reveal>

      <Reveal className="panel pagination-panel" delay={180}>
        <Pagination page={page} totalPages={12} onPageChange={setPage} />
      </Reveal>
    </Section>
  );
}

function FeedbackSection() {
  return (
    <Section
      id="feedback"
      eyebrow="Components"
      title="Feedback & display"
      intro="Alert, Badge, Avatar, Spinner, Skeleton, Progress, and Divider."
    >
      <Reveal className="panel">
        <div className="alert-stack">
          <Alert variant="info" title="Heads up">
            A new version is available.
          </Alert>
          <Alert variant="success" title="Saved">
            Your changes were saved.
          </Alert>
          <Alert variant="error" title="Something went wrong">
            The request failed — try again.
          </Alert>
          <Alert variant="warning">Your trial ends in 3 days.</Alert>
        </div>
      </Reveal>

      <Reveal className="panel" delay={40}>
        <div className="feedback-row">
          <Badge variant="primary">New</Badge>
          <Badge variant="success">Active</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="gray" size="sm">
            v0.2
          </Badge>
        </div>
      </Reveal>

      <Reveal className="panel" delay={60}>
        <div className="feedback-row">
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Grace Hopper" />
          <Avatar name="Alan Turing" size="lg" />
          <Spinner size="sm" />
          <Spinner />
        </div>
      </Reveal>

      <Reveal className="panel" delay={120}>
        <div className="skeleton-row">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="skeleton-lines">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="90%" />
          </div>
        </div>
      </Reveal>

      <Reveal className="panel" delay={180}>
        <Progress value={65} />
        <div className="divider-demo">
          <Divider label="OR" />
        </div>
      </Reveal>
    </Section>
  );
}

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div className="swatch">
      <span className="swatch-chip" style={{ background: value }} />
      <span className="swatch-name">{name}</span>
      <span className="swatch-value">{value}</span>
    </div>
  );
}

function ThemingSection() {
  return (
    <Section
      id="theming"
      eyebrow="Foundations"
      title="Dark mode"
      intro='Add data-theme="dark" to <html> — or any container — and every component inside re-themes. Brand shades stay put; surfaces, grays, and tints flip.'
    >
      <Reveal>
        <div className="dark-demo" data-theme="dark">
          <Card variant="elevated">
            <h3 className="card-title">Scoped dark theme</h3>
            <p className="card-text">
              This panel is just a div with <code>data-theme=&quot;dark&quot;</code>.
            </p>
            <div className="dark-demo-row">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
            </div>
            <div className="dark-demo-row">
              <Input label="Email" placeholder="you@example.com" helperText="Dark-mode input" />
            </div>
            <Alert variant="info" title="Heads up">
              Alerts flip their tints automatically.
            </Alert>
          </Card>
        </div>
      </Reveal>
    </Section>
  );
}

function TokensSection() {
  const primary = Object.entries(colors.primary);
  const gray = Object.entries(colors.gray);
  const semantic = [
    ['success', colors.success[500]],
    ['error', colors.error[500]],
    ['warning', colors.warning[500]],
  ] as const;

  return (
    <Section
      id="tokens"
      eyebrow="Foundations"
      title="Design tokens"
      intro="Every value is defined in TypeScript and mirrored as CSS variables. Import them directly to build your own components."
    >
      <Reveal className="panel">
        <h3 className="token-group-title">Color</h3>
        <div className="scale-row">
          {primary.map(([k, v]) => (
            <div key={k} className="scale-step">
              <span className="scale-chip" style={{ background: v }} />
              <span className="scale-key">{k}</span>
            </div>
          ))}
        </div>
        <div className="scale-row">
          {gray.map(([k, v]) => (
            <div key={k} className="scale-step">
              <span className="scale-chip" style={{ background: v }} />
              <span className="scale-key">{k}</span>
            </div>
          ))}
        </div>
        <div className="swatch-row">
          {semantic.map(([name, v]) => (
            <Swatch key={name} name={name} value={v} />
          ))}
        </div>
      </Reveal>

      <div className="token-columns">
        <Reveal className="panel" delay={60}>
          <h3 className="token-group-title">Spacing</h3>
          <div className="spacing-list">
            {Object.entries(spacing).map(([k, v]) => (
              <div key={k} className="spacing-item">
                <span className="spacing-key">{k}</span>
                <span className="spacing-bar" style={{ width: v }} />
                <span className="spacing-value">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="panel" delay={120}>
          <h3 className="token-group-title">Radius &amp; shadow</h3>
          <div className="chip-row">
            {Object.entries(radius).map(([k, v]) => (
              <div key={k} className="radius-demo">
                <span className="radius-box" style={{ borderRadius: v }} />
                <span className="mini-key">{k}</span>
              </div>
            ))}
          </div>
          <div className="chip-row chip-row-shadow">
            {Object.entries(shadows).map(([k, v]) => (
              <div key={k} className="shadow-demo">
                <span className="shadow-box" style={{ boxShadow: v }} />
                <span className="mini-key">{k}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="panel" delay={60}>
        <h3 className="token-group-title">Type scale</h3>
        <div className="type-list">
          {Object.entries(typography.fontSize).map(([k, v]) => (
            <div key={k} className="type-item">
              <span className="type-sample" style={{ fontSize: v }}>
                The quick brown fox
              </span>
              <span className="type-meta">
                {k} · {v}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

const USAGE = `import { Button, Input, Card } from 'rakibulism-ui';
import 'rakibulism-ui/styles'; // optional global CSS variables + reset

export default function App() {
  return (
    <Card variant="elevated">
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Button variant="primary" size="lg">Submit</Button>
    </Card>
  );
}`;

function UsageSection() {
  return (
    <Section
      id="usage"
      eyebrow="Get started"
      title="Drop it in"
      intro="Install, import, ship. Component styles auto-inject — the global stylesheet is optional."
    >
      <Reveal className="install-block">
        <CopyCommand command={`npm install ${PKG}`} />
      </Reveal>
      <Reveal className="panel code-panel" delay={80}>
        <pre>
          <code>{USAGE}</code>
        </pre>
      </Reveal>
    </Section>
  );
}

/* --- page --- */

export function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

function AppContent() {
  return (
    <div className="page">
      <header className="nav">
        <a className="brand" href="#top">
          <Logo />
          <span className="brand-name">rakibulism-ui</span>
        </a>
        <nav className="nav-links">
          <a href="#buttons">Components</a>
          <a href="#tokens">Tokens</a>
          <a href="#usage">Usage</a>
          <a href={GH_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-glow" aria-hidden="true" />
          <Reveal>
            <Eyebrow>Code-first React design system</Eyebrow>
          </Reveal>
          <Reveal delay={90}>
            <h1>
              Build interfaces with a{' '}
              <span className="grad">type-safe</span> component library.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="hero-sub">
              23 accessible components — forms, overlays, navigation, feedback —
              plus design tokens. Tree-shakeable, themeable via CSS variables,
              and shipped as ESM + CJS with full TypeScript types.
            </p>
          </Reveal>
          <Reveal delay={270}>
            <div className="hero-cta">
              <a href="#usage">
                <Button variant="primary" size="lg">
                  Get started
                </Button>
              </a>
              <a href={NPM_URL} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="lg">
                  View on npm
                </Button>
              </a>
            </div>
          </Reveal>
          <Reveal delay={360} className="hero-install">
            <CopyCommand command={`npm install ${PKG}`} />
          </Reveal>
        </section>

        <ButtonsSection />
        <InputsSection />
        <CardsSection />
        <FormsSection />
        <OverlaysSection />
        <NavigationSection />
        <FeedbackSection />
        <ThemingSection />
        <TokensSection />
        <UsageSection />
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <a className="brand" href="#top">
            <Logo />
            <span className="brand-name">rakibulism-ui</span>
          </a>
          <div className="footer-links">
            <a href={NPM_URL} target="_blank" rel="noreferrer">
              npm
            </a>
            <a href={GH_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`${GH_URL}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
              MIT License
            </a>
          </div>
        </div>
        <p className="footer-note">
          Built with rakibulism-ui · © Rakibul Islam
        </p>
      </footer>
    </div>
  );
}

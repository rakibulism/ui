import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from 'react';
import {
  Button,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Select,
  Tooltip,
  Modal,
  ToastProvider,
  useToast,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  Spinner,
  Progress,
} from 'rakibulism-ui';

const PKG = 'rakibulism-ui';
const NPM_URL = `https://www.npmjs.com/package/${PKG}`;
const GH_URL = 'https://github.com/rakibulism/ui';
const X_URL = 'https://x.com/rakibulism';

/* --- brand + icons --- */

function Logo({ size = 28 }: { size?: number }) {
  // Rendered inline so it can appear more than once per page without an extra
  // network request. The mask needs a unique id per instance.
  const maskId = useId();
  return (
    <span className="logo" aria-hidden="true">
      <svg width={size} height={size} viewBox="0 0 280 280" fill="none">
        <mask
          id={maskId}
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="280"
          height="280"
        >
          <path
            d="M0 40C0 17.9086 17.9086 0 40 0H240C262.091 0 280 17.9086 280 40V240C280 262.091 262.091 280 240 280H40C17.9086 280 0 262.091 0 240V40Z"
            fill="#022922"
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M0 0H280V280H0V0Z" fill="#0F453C" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M140 280C140 202.68 77.3199 140 0 140V150C71.797 150 130 208.203 130 280H140Z"
            fill="#DAEF3D"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M280 140C202.68 140 140 202.68 140 280H150C150 208.203 208.203 150 280 150V140Z"
            fill="#DAEF3D"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M80 280C80 235.817 44.1828 200 0 200V280H80ZM280 280H200C200 235.817 235.817 200 280 200V280Z"
            fill="#DAEF3D"
          />
          <path
            d="M139.5 33C148.692 67.1402 175.36 93.8078 209.5 103C175.36 112.192 148.692 138.86 139.5 173C130.308 138.86 103.64 112.192 69.5 103C103.64 93.8078 130.308 67.1402 139.5 33Z"
            fill="#DAEF3D"
          />
        </g>
      </svg>
    </span>
  );
}

// Brand marks sourced from github.com/rakibulism/brands-logo — kept in their
// official colors rather than currentColor, since these are brand logos.
function GitHubIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 256 250" aria-hidden="true">
      <path
        fill="#161614"
        d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46c6.397 1.185 8.746-2.777 8.746-6.158c0-3.052-.12-13.135-.174-23.83c-35.61 7.742-43.124-15.103-43.124-15.103c-5.823-14.795-14.213-18.73-14.213-18.73c-11.613-7.944.876-7.78.876-7.78c12.853.902 19.621 13.19 19.621 13.19c11.417 19.568 29.945 13.911 37.249 10.64c1.149-8.272 4.466-13.92 8.127-17.116c-28.431-3.236-58.318-14.212-58.318-63.258c0-13.975 5-25.394 13.188-34.358c-1.329-3.224-5.71-16.242 1.24-33.874c0 0 10.749-3.44 35.21 13.121c10.21-2.836 21.16-4.258 32.038-4.307c10.878.049 21.837 1.47 32.066 4.307c24.431-16.56 35.165-13.12 35.165-13.12c6.967 17.63 2.584 30.65 1.255 33.873c8.207 8.964 13.173 20.383 13.173 34.358c0 49.163-29.944 59.988-58.447 63.157c4.591 3.972 8.682 11.762 8.682 23.704c0 17.126-.148 30.91-.148 35.126c0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002C256 57.307 198.691 0 128.001 0m-80.06 182.34c-.282.636-1.283.827-2.194.39c-.929-.417-1.45-1.284-1.15-1.922c.276-.655 1.279-.838 2.205-.399c.93.418 1.46 1.293 1.139 1.931m6.296 5.618c-.61.566-1.804.303-2.614-.591c-.837-.892-.994-2.086-.375-2.66c.63-.566 1.787-.301 2.626.591c.838.903 1 2.088.363 2.66m4.32 7.188c-.785.545-2.067.034-2.86-1.104c-.784-1.138-.784-2.503.017-3.05c.795-.547 2.058-.055 2.861 1.075c.782 1.157.782 2.522-.019 3.08m7.304 8.325c-.701.774-2.196.566-3.29-.49c-1.119-1.032-1.43-2.496-.726-3.27c.71-.776 2.213-.558 3.315.49c1.11 1.03 1.45 2.505.701 3.27m9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033c-1.448-.439-2.395-1.613-2.103-2.626c.301-1.01 1.747-1.484 3.207-1.028c1.446.436 2.396 1.602 2.095 2.622m10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95c-1.53.034-2.769-.82-2.786-1.86c0-1.065 1.202-1.932 2.733-1.958c1.522-.03 2.768.818 2.768 1.868m10.555-.405c.182 1.03-.875 2.088-2.387 2.37c-1.485.271-2.861-.365-3.05-1.386c-.184-1.056.893-2.114 2.376-2.387c1.514-.263 2.868.356 3.061 1.403"
      />
    </svg>
  );
}

function NpmIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 256 256" aria-hidden="true">
      <path fill="#c12127" d="M0 256V0h256v256z" />
      <path fill="#fff" d="M48 48h160v160h-32V80h-48v128H48z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
      <path d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* --- component demos (live previews inside gallery cards) --- */

function ButtonDemo() {
  return (
    <div className="demo-cluster">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" isLoading>
        Loading
      </Button>
    </div>
  );
}

function InputDemo() {
  return (
    <div className="demo-stack">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        helperText="We'll never share it."
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        error="Must be at least 8 characters."
      />
    </div>
  );
}

function SelectDemo() {
  const [country, setCountry] = useState('us');
  return (
    <div className="demo-stack">
      <Select value={country} onChange={setCountry}>
        <option value="us">United States</option>
        <option value="bd">Bangladesh</option>
        <option value="uk">United Kingdom</option>
        <option value="de">Germany</option>
      </Select>
    </div>
  );
}

function FormDemo() {
  const [on, setOn] = useState(true);
  const [plan, setPlan] = useState('pro');
  return (
    <div className="demo-stack demo-stack-start">
      <Checkbox label="Subscribe to updates" defaultChecked />
      <Switch label="Notifications" checked={on} onChange={(e) => setOn(e.target.checked)} />
      <RadioGroup name="gallery-plan" value={plan} onChange={setPlan}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    </div>
  );
}

function FeedbackDemo() {
  return (
    <div className="demo-stack">
      <div className="demo-cluster">
        <Badge variant="primary">New</Badge>
        <Badge variant="success">Active</Badge>
        <Badge variant="error">Failed</Badge>
        <Badge variant="warning">Pending</Badge>
      </div>
      <div className="demo-cluster">
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Grace Hopper" />
        <Spinner />
      </div>
      <Progress value={65} />
    </div>
  );
}

function OverlaysDemo() {
  const [open, setOpen] = useState(false);
  const { show } = useToast();
  return (
    <div className="demo-cluster">
      <Tooltip content="Saves your changes" placement="top">
        <Button variant="secondary">Tooltip</Button>
      </Tooltip>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Modal
      </Button>
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
        Toast
      </Button>
      <Menu trigger={<Button variant="secondary">Menu</Button>}>
        <MenuItem>Edit</MenuItem>
        <MenuItem destructive>Delete</MenuItem>
      </Menu>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Confirm action">
        <p>A portal-rendered dialog with a focus trap and Escape-to-close.</p>
      </Modal>
    </div>
  );
}

type CardDef = {
  id: string;
  label: string;
  caption: string;
  keywords: string;
  Demo: ComponentType;
};

const CARDS: CardDef[] = [
  {
    id: 'button',
    label: 'Button',
    caption: '4 variants · loading & disabled',
    keywords: 'button variant primary secondary ghost danger loading disabled action',
    Demo: ButtonDemo,
  },
  {
    id: 'input',
    label: 'Input',
    caption: 'labels, helper & error states',
    keywords: 'input text field form email password helper error label',
    Demo: InputDemo,
  },
  {
    id: 'select',
    label: 'Select',
    caption: 'native, keyboard accessible',
    keywords: 'select dropdown option country choice picker',
    Demo: SelectDemo,
  },
  {
    id: 'form',
    label: 'Form controls',
    caption: 'checkbox · radio · switch',
    keywords: 'checkbox radio switch toggle form control choice',
    Demo: FormDemo,
  },
  {
    id: 'feedback',
    label: 'Feedback',
    caption: 'badges · avatars · progress',
    keywords: 'badge avatar spinner progress status feedback loading',
    Demo: FeedbackDemo,
  },
  {
    id: 'overlays',
    label: 'Overlays',
    caption: 'tooltip · modal · toast · menu',
    keywords: 'tooltip modal dialog toast menu overlay popover portal',
    Demo: OverlaysDemo,
  },
];

/* --- gallery --- */

function GalleryCard({ card }: { card: CardDef }) {
  const { label, caption, Demo } = card;
  return (
    <article className="gcard">
      <div className="gcard-head">
        <span className="gcard-label">{label}</span>
        <span className="gcard-caption">{caption}</span>
      </div>
      <div className="gcard-preview">
        <Demo />
      </div>
    </article>
  );
}

/* --- header --- */

function Header({
  query,
  onQuery,
  inputRef,
}: {
  query: string;
  onQuery: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <header className="top-bar">
      <a className="title-image-container" href="#top" aria-label="rakibulism-ui home">
        <Logo size={24} />
        <div className="title-text">UI</div>
      </a>

      <div className="frame-1">
        <a className="overview-tab-text" href="#components">
          Components
        </a>
        <a className="overview-tab-text" href={`${GH_URL}#readme`} target="_blank" rel="noreferrer">
          Docs
        </a>
        <div className="frame-4">
          <a className="github" href={GH_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a className="npm" href={NPM_URL} target="_blank" rel="noreferrer" aria-label="npm">
            <NpmIcon />
          </a>
          <a className="x-twitter" href={X_URL} target="_blank" rel="noreferrer" aria-label="X">
            <XIcon />
          </a>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box">
          <span className="search-icon">
            <SearchIcon />
          </span>
          <input
            ref={inputRef}
            type="search"
            className="search-text"
            placeholder="Search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            aria-label="Search components"
          />
        </div>
        <div className="kbd-group">
          <div className="overview-navigation-container">
            <div className="overview-navigation-text">⌘</div>
          </div>
          <div className="overview-navigation-container">
            <div className="overview-navigation-text">K</div>
          </div>
        </div>
      </div>
    </header>
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
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses search; Escape clears + blurs it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('');
        searchRef.current?.blur();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CARDS;
    return CARDS.filter((c) =>
      `${c.label} ${c.caption} ${c.keywords}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="page" id="top">
      <Header query={query} onQuery={setQuery} inputRef={searchRef} />

      <main>
        <section className="hero">
          <h1>Just imagine to build, tell to AI</h1>
          <p className="hero-sub">
            The design work is done. Fully built, accessible UI library — install &amp; start
            shipping. All that's left is your idea.
          </p>
        </section>

        <section className="gallery" id="components">
          <div className="gallery-frame">
            {results.length > 0 ? (
              <div className="gallery-grid">
                {results.map((card) => (
                  <GalleryCard key={card.id} card={card} />
                ))}
              </div>
            ) : (
              <div className="gallery-empty">
                <p>
                  No components match “{query}”.{' '}
                  <button type="button" className="link-btn" onClick={() => setQuery('')}>
                    Clear search
                  </button>
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <a className="brand" href="#top">
            <Logo />
            <span className="brand-name">UI</span>
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
        <p className="footer-note">Built with rakibulism-ui · © Rakibul Islam</p>
      </footer>
    </div>
  );
}

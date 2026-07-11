import { useState, type ComponentType } from 'react';
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
} from 'rakibulism-ui';
// Tooltip, Modal, Toast, and Menu are portal/overlay components with no
// "always open" mode — for a frozen illustration, their own CSS Modules are
// imported directly and the relevant markup is hand-built inline instead of
// going through the real portaled component, so the preview stays pixel
// -accurate to the real styling without requiring a click/hover to see it.
import tooltipStyles from '../../src/components/Tooltip/Tooltip.module.css';
import modalStyles from '../../src/components/Modal/Modal.module.css';
import toastStyles from '../../src/components/Toast/Toast.module.css';
import menuStyles from '../../src/components/Menu/Menu.module.css';

export interface CatalogEntry {
  id: string;
  name: string;
  description: string;
  keywords: string;
  /** Copied to the clipboard by the card's AI-copy button. */
  prompt: string;
  Illustration: ComponentType;
}

const RAKIBULISM_UI_PREFIX =
  'Using the rakibulism-ui React component library (npm install rakibulism-ui), ';

const CLOSE_ICON = (
  <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

function ButtonIllustration() {
  return (
    <div className="illustration-row">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

function InputIllustration() {
  return (
    <div className="illustration-constrain">
      <Input label="Email" placeholder="you@example.com" />
    </div>
  );
}

function CardIllustration() {
  return (
    <Card className="illustration-constrain">
      <strong>Card title</strong>
      <p>A surface for grouping related content.</p>
    </Card>
  );
}

function CheckboxIllustration() {
  return (
    <div className="illustration-constrain">
      <Checkbox label="Subscribe to updates" defaultChecked />
    </div>
  );
}

function RadioIllustration() {
  const [value, setValue] = useState('pro');
  return (
    <div className="illustration-constrain">
      <RadioGroup name="illustration-plan" value={value} onChange={setValue}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>
    </div>
  );
}

function SwitchIllustration() {
  const [checked, setChecked] = useState(true);
  return (
    <div className="illustration-constrain">
      <Switch label="Notifications" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    </div>
  );
}

function TextareaIllustration() {
  return (
    <div className="illustration-constrain">
      <Textarea label="Message" placeholder="Write something…" rows={2} />
    </div>
  );
}

function SelectIllustration() {
  const [value, setValue] = useState('us');
  return (
    <div className="illustration-constrain">
      <Select label="Country" value={value} onChange={setValue}>
        <option value="us">United States</option>
        <option value="bd">Bangladesh</option>
        <option value="uk">United Kingdom</option>
      </Select>
    </div>
  );
}

function TooltipIllustration() {
  return (
    <div className="illustration-tooltip">
      <Button variant="secondary">Hover me</Button>
      <div className={tooltipStyles.bubble} role="tooltip">
        Saves your changes
      </div>
    </div>
  );
}

function ModalIllustration() {
  return (
    <div className={modalStyles.panel} style={{ position: 'relative', width: '90%', maxWidth: 240 }}>
      <div className={modalStyles.header}>
        <p className={modalStyles.title}>Confirm action</p>
        <span className={modalStyles.closeButton} aria-hidden="true">
          {CLOSE_ICON}
        </span>
      </div>
      <div className={modalStyles.body}>A focused dialog that overlays the page.</div>
    </div>
  );
}

function ToastIllustration() {
  return (
    <div className={toastStyles.toast + ' ' + toastStyles.success} style={{ position: 'relative', width: '90%', maxWidth: 260 }}>
      <span className={toastStyles.iconBadge} aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 8.5l2.5 2.5L12 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className={toastStyles.content}>
        <div className={toastStyles.headerRow}>
          <p className={toastStyles.title}>Saved</p>
          <span className={toastStyles.dismissButton} aria-hidden="true">
            {CLOSE_ICON}
          </span>
        </div>
        <p className={toastStyles.description}>Your changes were saved.</p>
      </div>
    </div>
  );
}

function MenuIllustration() {
  return (
    <div className="illustration-menu">
      <Button variant="secondary">Actions</Button>
      <div className={menuStyles.menu} style={{ position: 'relative' }}>
        <div className={menuStyles.item}>Edit</div>
        <div className={menuStyles.item + ' ' + menuStyles.destructive}>Delete</div>
      </div>
    </div>
  );
}

function TabsIllustration() {
  return (
    <div className="illustration-constrain">
      <Tabs defaultValue="profile">
        <TabList>
          <Tab value="profile">Profile</Tab>
          <Tab value="billing">Billing</Tab>
        </TabList>
        <TabPanel value="profile">Profile settings go here.</TabPanel>
        <TabPanel value="billing">Billing settings go here.</TabPanel>
      </Tabs>
    </div>
  );
}

function AccordionIllustration() {
  return (
    <div className="illustration-constrain">
      <Accordion defaultValue="item-1">
        <AccordionItem value="item-1" title="What is rakibulism-ui?">
          A code-first React component library.
        </AccordionItem>
        <AccordionItem value="item-2" title="Is it accessible?">
          Yes, every component ships with a11y built in.
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function BreadcrumbsIllustration() {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="#">Home</BreadcrumbItem>
      <BreadcrumbItem href="#">Components</BreadcrumbItem>
      <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
    </Breadcrumbs>
  );
}

function PaginationIllustration() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} totalPages={8} onPageChange={setPage} />;
}

function BadgeIllustration() {
  return (
    <div className="illustration-row">
      <Badge variant="primary">New</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="error">Failed</Badge>
    </div>
  );
}

function AvatarIllustration() {
  return (
    <div className="illustration-row">
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Alan Turing" size="lg" />
    </div>
  );
}

function SpinnerIllustration() {
  return <Spinner size="lg" />;
}

function SkeletonIllustration() {
  return (
    <div className="illustration-constrain illustration-column">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  );
}

function ProgressIllustration() {
  return (
    <div className="illustration-constrain">
      <Progress value={65} />
    </div>
  );
}

function DividerIllustration() {
  return (
    <div className="illustration-constrain">
      <Divider label="OR" />
    </div>
  );
}

function AlertIllustration() {
  return (
    <div className="illustration-constrain">
      <Alert variant="info" title="Heads up">
        This is an inline, persistent callout.
      </Alert>
    </div>
  );
}

export const CATALOG: CatalogEntry[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'A clickable button with four variants, three sizes, and a loading state.',
    keywords: 'action click cta',
    prompt:
      RAKIBULISM_UI_PREFIX +
      "render a Button showcase using its four variants — primary, secondary, ghost, and danger — across the sm/md/lg sizes, plus the isLoading and isDisabled states.",
    Illustration: ButtonIllustration,
  },
  {
    id: 'input',
    name: 'Input',
    description: 'A text field with a label, helper text, and error states.',
    keywords: 'text field form',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'build a labeled Input with helperText, plus a second Input showing its error state. The label, helperText, and error props wire up htmlFor/aria-describedby/aria-invalid automatically.',
    Illustration: InputIllustration,
  },
  {
    id: 'card',
    name: 'Card',
    description: 'A surface container for grouping related content.',
    keywords: 'surface container panel',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Card in each of its three variants, with some placeholder content inside.',
    Illustration: CardIllustration,
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'A binary toggle for selecting one or more options.',
    keywords: 'toggle form choice',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Checkbox with a label, defaultChecked, and its error/disabled states.',
    Illustration: CheckboxIllustration,
  },
  {
    id: 'radio',
    name: 'Radio',
    description: 'Mutually exclusive selection from a group of options.',
    keywords: 'radiogroup form choice',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render a RadioGroup with a couple of Radio options bound to controlled state via value/onChange.',
    Illustration: RadioIllustration,
  },
  {
    id: 'switch',
    name: 'Switch',
    description: 'An on/off toggle styled as a physical switch.',
    keywords: 'toggle form boolean',
    prompt: RAKIBULISM_UI_PREFIX + 'render a labeled Switch bound to controlled boolean state via checked/onChange.',
    Illustration: SwitchIllustration,
  },
  {
    id: 'textarea',
    name: 'Textarea',
    description: 'A multi-line text field for longer form content.',
    keywords: 'text field form multiline',
    prompt: RAKIBULISM_UI_PREFIX + 'render a labeled Textarea with a placeholder and a fixed number of rows.',
    Illustration: TextareaIllustration,
  },
  {
    id: 'select',
    name: 'Select',
    description: 'A styled dropdown for choosing one option from a list.',
    keywords: 'dropdown form choice',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render a controlled Select with a handful of <option> children (e.g. a list of countries) bound to state via value/onChange.',
    Illustration: SelectIllustration,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'A short contextual hint shown on hover or focus.',
    keywords: 'hint hover popover overlay',
    prompt: RAKIBULISM_UI_PREFIX + 'wrap a trigger Button in a Tooltip that shows a short hint on hover or focus.',
    Illustration: TooltipIllustration,
  },
  {
    id: 'modal',
    name: 'Modal',
    description: 'A focused dialog that overlays the page content.',
    keywords: 'dialog overlay popup',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'open a Modal from a button click, with a title and focus trap, that closes on Escape or backdrop click.',
    Illustration: ModalIllustration,
  },
  {
    id: 'toast',
    name: 'Toast',
    description: 'A transient notification that appears and dismisses itself.',
    keywords: 'notification snackbar overlay',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'wrap the app in ToastProvider and trigger a success Toast via the useToast() hook from a button click.',
    Illustration: ToastIllustration,
  },
  {
    id: 'menu',
    name: 'Menu',
    description: 'A click-triggered dropdown list of actions.',
    keywords: 'dropdown actions overlay',
    prompt:
      RAKIBULISM_UI_PREFIX + 'render a Menu with a trigger Button and a couple of MenuItem entries, including a destructive delete item.',
    Illustration: MenuIllustration,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Switch between related panels of content.',
    keywords: 'navigation panels',
    prompt: RAKIBULISM_UI_PREFIX + 'render Tabs with a TabList of two Tabs and their corresponding TabPanels.',
    Illustration: TabsIllustration,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'Collapsible panels with headings and content.',
    keywords: 'collapse expand faq',
    prompt: RAKIBULISM_UI_PREFIX + 'render an Accordion with a couple of AccordionItems, one open by default.',
    Illustration: AccordionIllustration,
  },
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    description: "Shows the current page's location in a hierarchy.",
    keywords: 'navigation trail hierarchy',
    prompt: RAKIBULISM_UI_PREFIX + 'render Breadcrumbs with a few BreadcrumbItems, marking the last one as the current page.',
    Illustration: BreadcrumbsIllustration,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Page-number navigation with previous/next controls.',
    keywords: 'navigation pages list',
    prompt: RAKIBULISM_UI_PREFIX + 'render Pagination bound to controlled page state, with a fixed totalPages.',
    Illustration: PaginationIllustration,
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'A small pill-shaped status or count indicator.',
    keywords: 'status label tag',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Badge in each of the primary/success/error variants.',
    Illustration: BadgeIllustration,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'A circular avatar with an initials fallback.',
    keywords: 'profile image user',
    prompt: RAKIBULISM_UI_PREFIX + 'render an Avatar with a name (for the initials fallback) in the sm/md/lg sizes.',
    Illustration: AvatarIllustration,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description: 'A standalone loading indicator.',
    keywords: 'loading indicator status',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Spinner to indicate a loading state.',
    Illustration: SpinnerIllustration,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: "An animated placeholder for content that hasn't loaded.",
    keywords: 'loading placeholder shimmer',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Skeleton loading state for a profile row — a circular avatar placeholder next to two text-line placeholders.',
    Illustration: SkeletonIllustration,
  },
  {
    id: 'progress',
    name: 'Progress',
    description: 'A linear progress bar showing completion.',
    keywords: 'loading bar percent',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Progress bar set to a fixed value.',
    Illustration: ProgressIllustration,
  },
  {
    id: 'divider',
    name: 'Divider',
    description: 'A thin rule separating content, with an optional label.',
    keywords: 'separator rule line',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Divider with a centered label between two blocks of content.',
    Illustration: DividerIllustration,
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'An inline, persistent callout for contextual feedback.',
    keywords: 'callout notice banner',
    prompt: RAKIBULISM_UI_PREFIX + 'render an Alert with a title and body text in the info variant.',
    Illustration: AlertIllustration,
  },
];

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
  Collapsible,
  Toggle,
  ToggleGroup,
  Fieldset,
  Meter,
  CheckboxGroup,
  Slider,
  NumberField,
  OtpField,
  ScrollArea,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
  Menubar,
  NavigationMenu,
  Combobox,
  Autocomplete,
  MenuItem,
} from 'rakibulism-ui';
// Tooltip, Modal, Toast, Menu, Popover, PreviewCard, Drawer, and AlertDialog
// are portal/overlay components with no "always open" mode — for a frozen
// illustration, their own CSS Modules are imported directly and the
// relevant markup is hand-built inline instead of going through the real
// portaled component, so the preview stays pixel-accurate to the real
// styling without requiring a click/hover to see it.
import tooltipStyles from '../../src/components/Tooltip/Tooltip.module.css';
import modalStyles from '../../src/components/Modal/Modal.module.css';
import toastStyles from '../../src/components/Toast/Toast.module.css';
import menuStyles from '../../src/components/Menu/Menu.module.css';
import popoverStyles from '../../src/components/Popover/Popover.module.css';
import previewCardStyles from '../../src/components/PreviewCard/PreviewCard.module.css';
import drawerStyles from '../../src/components/Drawer/Drawer.module.css';
import alertDialogStyles from '../../src/components/AlertDialog/AlertDialog.module.css';

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

function CollapsibleIllustration() {
  return (
    <div className="illustration-constrain">
      <Collapsible trigger="What is rakibulism-ui?" defaultOpen>
        A code-first React component library.
      </Collapsible>
    </div>
  );
}

function ToggleIllustration() {
  const [pressed, setPressed] = useState(true);
  return (
    <div className="illustration-row">
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        Bold
      </Toggle>
    </div>
  );
}

function ToggleGroupIllustration() {
  const [value, setValue] = useState(['center']);
  return (
    <div className="illustration-row">
      <ToggleGroup value={value} onChange={setValue}>
        <Toggle value="left" aria-label="Align left">
          Left
        </Toggle>
        <Toggle value="center" aria-label="Align center">
          Center
        </Toggle>
        <Toggle value="right" aria-label="Align right">
          Right
        </Toggle>
      </ToggleGroup>
    </div>
  );
}

function FieldsetIllustration() {
  return (
    <div className="illustration-constrain">
      <Fieldset legend="Shipping address">
        <Input label="Street" placeholder="123 Main St" />
      </Fieldset>
    </div>
  );
}

function MeterIllustration() {
  return (
    <div className="illustration-constrain">
      <Meter value={72} label="Disk usage" />
    </div>
  );
}

function PopoverIllustration() {
  return (
    <div className={popoverStyles.popup} style={{ position: 'relative', width: '90%', maxWidth: 240 }}>
      <div className={popoverStyles.header}>
        <p className={popoverStyles.title}>Details</p>
        <span className={popoverStyles.closeButton} aria-hidden="true">
          {CLOSE_ICON}
        </span>
      </div>
      <div className={popoverStyles.body}>More info about this field.</div>
    </div>
  );
}

function PreviewCardIllustration() {
  return (
    <div className={previewCardStyles.popup} style={{ position: 'relative', width: '90%', maxWidth: 240 }}>
      Rich, interactive preview content.
    </div>
  );
}

function DrawerIllustration() {
  return (
    <div className={drawerStyles.panel + ' ' + drawerStyles.right} style={{ position: 'relative', width: '80%', height: '90%' }}>
      <div className={drawerStyles.header}>
        <p className={drawerStyles.title}>Filters</p>
        <span className={drawerStyles.closeButton} aria-hidden="true">
          {CLOSE_ICON}
        </span>
      </div>
      <div className={drawerStyles.body}>Filter options go here.</div>
    </div>
  );
}

function AlertDialogIllustration() {
  return (
    <div className={alertDialogStyles.panel} style={{ position: 'relative', width: '90%', maxWidth: 260 }}>
      <div className={alertDialogStyles.header}>
        <p className={alertDialogStyles.title}>Delete file?</p>
      </div>
      <div className={alertDialogStyles.body}>This cannot be undone.</div>
      <div className={alertDialogStyles.footer}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
  );
}

function CheckboxGroupIllustration() {
  return (
    <div className="illustration-constrain">
      <CheckboxGroup label="Permissions" value={['read']} onChange={() => {}}>
        <Checkbox value="read" label="Read" />
        <Checkbox value="write" label="Write" />
      </CheckboxGroup>
    </div>
  );
}

function SliderIllustration() {
  return (
    <div className="illustration-constrain">
      <Slider label="Volume" defaultValue={40} showValue />
    </div>
  );
}

function NumberFieldIllustration() {
  return (
    <div className="illustration-constrain">
      <NumberField label="Quantity" defaultValue={3} />
    </div>
  );
}

function OtpFieldIllustration() {
  return (
    <div className="illustration-constrain">
      <OtpField label="Verification code" length={4} />
    </div>
  );
}

function ScrollAreaIllustration() {
  return (
    <ScrollArea height={120} className="illustration-constrain">
      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p>Line one of scrollable content.</p>
        <p>Line two of scrollable content.</p>
        <p>Line three of scrollable content.</p>
        <p>Line four of scrollable content.</p>
      </div>
    </ScrollArea>
  );
}

function ToolbarIllustration() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarButton>Italic</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton>Link</ToolbarButton>
    </Toolbar>
  );
}

function ContextMenuIllustration() {
  return (
    <div className="illustration-menu">
      <div
        style={{
          border: '1px dashed var(--color-gray-300)',
          borderRadius: 8,
          padding: '8px 16px',
          fontSize: 14,
          color: 'var(--color-gray-700)',
        }}
      >
        Right-click here
      </div>
      <div className={menuStyles.menu} style={{ position: 'relative' }}>
        <div className={menuStyles.item}>Edit</div>
        <div className={menuStyles.item + ' ' + menuStyles.destructive}>Delete</div>
      </div>
    </div>
  );
}

function MenubarIllustration() {
  return (
    <Menubar
      menus={[
        { label: 'File', items: <MenuItem>Save</MenuItem> },
        { label: 'Edit', items: <MenuItem>Undo</MenuItem> },
        { label: 'View', items: <MenuItem>Zoom in</MenuItem> },
      ]}
    />
  );
}

function NavigationMenuIllustration() {
  return (
    <NavigationMenu
      items={[
        { label: 'Home', href: '#' },
        { label: 'Products', content: <p>Product list</p> },
        { label: 'About', href: '#' },
      ]}
    />
  );
}

function ComboboxIllustration() {
  return (
    <div className="illustration-constrain">
      <Combobox
        label="Country"
        items={[
          { value: 'us', label: 'United States' },
          { value: 'bd', label: 'Bangladesh' },
        ]}
        defaultValue="us"
      />
    </div>
  );
}

function AutocompleteIllustration() {
  return (
    <div className="illustration-constrain">
      <Autocomplete label="City" items={['Dhaka', 'Berlin']} defaultValue="Dhaka" />
    </div>
  );
}

const UNSORTED_CATALOG: CatalogEntry[] = [
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
  {
    id: 'collapsible',
    name: 'Collapsible',
    description: 'A single expandable/collapsible panel with a clickable trigger.',
    keywords: 'expand collapse disclosure toggle panel',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Collapsible with a trigger and some panel content, open by default.',
    Illustration: CollapsibleIllustration,
  },
  {
    id: 'toggle',
    name: 'Toggle',
    description: 'A two-state button that can be pressed or unpressed.',
    keywords: 'button pressed switch state',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Toggle button bound to controlled pressed state.',
    Illustration: ToggleIllustration,
  },
  {
    id: 'toggle-group',
    name: 'Toggle Group',
    description: 'Coordinates a shared pressed state across a row of toggle buttons.',
    keywords: 'toolbar alignment segmented control',
    prompt: RAKIBULISM_UI_PREFIX + 'render a ToggleGroup with three Toggle buttons for text alignment (left/center/right), single-select.',
    Illustration: ToggleGroupIllustration,
  },
  {
    id: 'fieldset',
    name: 'Fieldset',
    description: 'Groups related form fields under a shared legend.',
    keywords: 'form group legend',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Fieldset with a legend grouping a couple of form fields.',
    Illustration: FieldsetIllustration,
  },
  {
    id: 'meter',
    name: 'Meter',
    description: "Visualizes a value within a known range, like disk usage.",
    keywords: 'gauge range indicator value',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Meter with a label showing a value within a range.',
    Illustration: MeterIllustration,
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'A click-triggered popup for secondary content or actions.',
    keywords: 'popup overlay click details',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'wrap a trigger Button in a Popover with a title and some body content, shown on click.',
    Illustration: PopoverIllustration,
  },
  {
    id: 'preview-card',
    name: 'Preview Card',
    description: 'A rich, interactive hover preview, unlike a plain Tooltip.',
    keywords: 'hover preview link unfurl overlay',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'wrap a link trigger in a PreviewCard that shows rich, interactive content after a brief hover delay.',
    Illustration: PreviewCardIllustration,
  },
  {
    id: 'drawer',
    name: 'Drawer',
    description: 'A panel that slides in from an edge of the screen.',
    keywords: 'panel sidebar slide overlay',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'open a Drawer sliding in from the right, with a title and some body content, that closes on Escape or backdrop click.',
    Illustration: DrawerIllustration,
  },
  {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    description: 'An interruptive dialog for confirming a decision.',
    keywords: 'confirm destructive dialog overlay',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'open an AlertDialog confirming a delete action, with Cancel and Delete actions, not dismissible via backdrop click.',
    Illustration: AlertDialogIllustration,
  },
  {
    id: 'checkbox-group',
    name: 'Checkbox Group',
    description: 'Groups checkboxes under a shared selected-values array.',
    keywords: 'multi-select form choice',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render a CheckboxGroup with a couple of Checkbox options bound to controlled string-array state via value/onChange.',
    Illustration: CheckboxGroupIllustration,
  },
  {
    id: 'slider',
    name: 'Slider',
    description: 'A draggable control for selecting a numeric value or range.',
    keywords: 'range drag value control',
    prompt: RAKIBULISM_UI_PREFIX + 'render a Slider with a label and its current value shown.',
    Illustration: SliderIllustration,
  },
  {
    id: 'number-field',
    name: 'Number Field',
    description: 'A numeric input with increment/decrement stepper buttons.',
    keywords: 'stepper quantity numeric input',
    prompt: RAKIBULISM_UI_PREFIX + 'render a NumberField with a label, min/max, and stepper buttons.',
    Illustration: NumberFieldIllustration,
  },
  {
    id: 'otp-field',
    name: 'Otp Field',
    description: 'A row of single-character inputs for a one-time passcode.',
    keywords: 'otp verification code pin',
    prompt: RAKIBULISM_UI_PREFIX + 'render an OtpField with 4 slots bound to controlled state via value/onChange.',
    Illustration: OtpFieldIllustration,
  },
  {
    id: 'scroll-area',
    name: 'Scroll Area',
    description: 'A scrollable container with custom, cross-browser scrollbars.',
    keywords: 'scroll container viewport overflow',
    prompt: RAKIBULISM_UI_PREFIX + 'render a ScrollArea with a fixed height wrapping a long block of content.',
    Illustration: ScrollAreaIllustration,
  },
  {
    id: 'toolbar',
    name: 'Toolbar',
    description: 'Groups related controls with roving-tabindex keyboard navigation.',
    keywords: 'actions buttons group controls',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render a Toolbar with a ToolbarGroup of two ToolbarButtons, a ToolbarSeparator, and one more ToolbarButton.',
    Illustration: ToolbarIllustration,
  },
  {
    id: 'context-menu',
    name: 'Context Menu',
    description: 'Opens a menu at the pointer position on right click or long press.',
    keywords: 'right-click overlay actions',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'wrap an area in a ContextMenu with a couple of MenuItem entries, opened via right click.',
    Illustration: ContextMenuIllustration,
  },
  {
    id: 'menubar',
    name: 'Menubar',
    description: 'A horizontal row of menus, like a desktop-app File/Edit/View bar.',
    keywords: 'file edit view app menu',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render a Menubar with a couple of top-level menus, each with a few MenuItem entries.',
    Illustration: MenubarIllustration,
  },
  {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    description: 'A site-navigation bar mixing links and dropdown panels.',
    keywords: 'site nav header links dropdown',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render a NavigationMenu mixing plain links and one item with a dropdown content panel.',
    Illustration: NavigationMenuIllustration,
  },
  {
    id: 'combobox',
    name: 'Combobox',
    description: 'A searchable dropdown where a value must be picked from the list.',
    keywords: 'search dropdown filter select',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render a Combobox with a handful of items, filtered as the user types, bound to controlled state via value/onChange.',
    Illustration: ComboboxIllustration,
  },
  {
    id: 'autocomplete',
    name: 'Autocomplete',
    description: 'A free-text input with a filtered suggestion list.',
    keywords: 'search suggestions typeahead free-text',
    prompt:
      RAKIBULISM_UI_PREFIX +
      'render an Autocomplete with a handful of suggestions, accepting arbitrary typed text as a valid value.',
    Illustration: AutocompleteIllustration,
  },
];

export const CATALOG: CatalogEntry[] = [...UNSORTED_CATALOG].sort((a, b) =>
  a.name.localeCompare(b.name),
);

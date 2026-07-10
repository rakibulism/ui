import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Tabs, TabList, Tab, TabPanel } from '../Tabs/Tabs';
import { Accordion, AccordionItem } from '../Accordion/Accordion';
import { Breadcrumbs, BreadcrumbItem } from '../Breadcrumbs/Breadcrumbs';
import { Pagination } from '../Pagination/Pagination';

function renderTabs() {
  return render(
    <Tabs defaultValue="a">
      <TabList>
        <Tab value="a">Alpha</Tab>
        <Tab value="b">Beta</Tab>
      </TabList>
      <TabPanel value="a">Panel A</TabPanel>
      <TabPanel value="b">Panel B</TabPanel>
    </Tabs>,
  );
}

describe('Tabs', () => {
  // Radix Tabs.Trigger selects on mousedown (for pointer responsiveness),
  // not click, so tests use fireEvent.mouseDown to switch tabs.
  it('shows only the active panel and switches on click', () => {
    renderTabs();
    expect(screen.getByText('Panel A')).toBeInTheDocument();
    expect(screen.queryByText('Panel B')).not.toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Beta' }));
    expect(screen.queryByText('Panel A')).not.toBeInTheDocument();
    expect(screen.getByText('Panel B')).toBeInTheDocument();
  });

  it('sets aria-selected, and roving tabindex once a tab has focus', () => {
    renderTabs();
    const alpha = screen.getByRole('tab', { name: 'Alpha' });
    const beta = screen.getByRole('tab', { name: 'Beta' });
    expect(alpha).toHaveAttribute('aria-selected', 'true');
    expect(beta).toHaveAttribute('aria-selected', 'false');
    // Radix's roving-tabindex group only assigns tabIndex 0 to a specific
    // item once something has focused it (the group itself is the initial
    // tab stop before any interaction).
    fireEvent.focus(alpha);
    expect(alpha).toHaveAttribute('tabindex', '0');
    expect(beta).toHaveAttribute('tabindex', '-1');
  });

  // Radix's roving-focus-group moves DOM focus for arrow-key navigation
  // inside a setTimeout (a macrotask, so the test awaits a tick), then
  // Tabs.Trigger's own onFocus handler selects the newly-focused tab
  // (automatic activation mode).
  it('moves selection with arrow keys, wrapping around', async () => {
    renderTabs();
    const alpha = screen.getByRole('tab', { name: 'Alpha' });
    fireEvent.focus(alpha);
    fireEvent.keyDown(alpha, { key: 'ArrowRight' });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByRole('tab', { name: 'Beta' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    const beta = screen.getByRole('tab', { name: 'Beta' });
    fireEvent.keyDown(beta, { key: 'ArrowRight' });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getByRole('tab', { name: 'Alpha' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('supports controlled usage', () => {
    const onChange = vi.fn();
    render(
      <Tabs value="a" onChange={onChange}>
        <TabList>
          <Tab value="a">Alpha</Tab>
          <Tab value="b">Beta</Tab>
        </TabList>
        <TabPanel value="a">Panel A</TabPanel>
        <TabPanel value="b">Panel B</TabPanel>
      </Tabs>,
    );
    fireEvent.mouseDown(screen.getByRole('tab', { name: 'Beta' }));
    expect(onChange).toHaveBeenCalledWith('b');
    // still controlled by `value`, so panel A remains visible
    expect(screen.getByText('Panel A')).toBeInTheDocument();
  });
});

describe('Accordion', () => {
  function renderAccordion(type: 'single' | 'multiple' = 'single') {
    return render(
      <Accordion type={type}>
        <AccordionItem value="one" title="First">
          <p>Content one</p>
        </AccordionItem>
        <AccordionItem value="two" title="Second">
          <p>Content two</p>
        </AccordionItem>
      </Accordion>,
    );
  }

  it('opens and closes items on click', () => {
    renderAccordion();
    const first = screen.getByRole('button', { name: 'First' });
    expect(first).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Content one')).toBeInTheDocument();
    fireEvent.click(first);
    expect(screen.queryByText('Content one')).not.toBeInTheDocument();
  });

  it('single mode closes the previous item', () => {
    renderAccordion('single');
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.queryByText('Content one')).not.toBeInTheDocument();
    expect(screen.getByText('Content two')).toBeInTheDocument();
  });

  it('multiple mode keeps both open', () => {
    renderAccordion('multiple');
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByText('Content one')).toBeInTheDocument();
    expect(screen.getByText('Content two')).toBeInTheDocument();
  });

  it('respects defaultValue', () => {
    render(
      <Accordion type="single" defaultValue="one">
        <AccordionItem value="one" title="First">
          <p>Content one</p>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText('Content one')).toBeInTheDocument();
  });
});

describe('Breadcrumbs', () => {
  it('renders links, separators, and the current page', () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Components</BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    const current = screen.getByText('Components');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).toBe('SPAN');
  });

  it('supports a custom separator', () => {
    render(
      <Breadcrumbs separator="→">
        <BreadcrumbItem href="/">A</BreadcrumbItem>
        <BreadcrumbItem isCurrent>B</BreadcrumbItem>
      </Breadcrumbs>,
    );
    expect(screen.getByText('→')).toBeInTheDocument();
  });
});

describe('Pagination', () => {
  it('collapses long ranges with ellipses around the current page', () => {
    render(<Pagination page={5} totalPages={12} onPageChange={() => {}} />);
    const labels = screen
      .getAllByRole('button')
      .map((button) => button.textContent);
    expect(labels).toEqual(['‹', '1', '4', '5', '6', '12', '›']);
    expect(screen.getAllByText('…')).toHaveLength(2);
    expect(screen.getByRole('button', { name: '5' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('shows all pages when the range is short', () => {
    render(<Pagination page={2} totalPages={3} onPageChange={() => {}} />);
    const labels = screen
      .getAllByRole('button')
      .map((button) => button.textContent);
    expect(labels).toEqual(['‹', '1', '2', '3', '›']);
  });

  it('disables prev on the first page and next on the last', () => {
    const { rerender } = render(
      <Pagination page={1} totalPages={3} onPageChange={() => {}} />,
    );
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    rerender(<Pagination page={3} totalPages={3} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('reports page changes', () => {
    const onPageChange = vi.fn();
    render(<Pagination page={5} totalPages={12} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onPageChange).toHaveBeenCalledWith(6);
    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});

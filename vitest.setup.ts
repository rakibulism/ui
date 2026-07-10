import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// jsdom doesn't implement scrollIntoView; Radix Select calls it to scroll
// the selected item into view when the listbox opens.
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView ?? (() => {});

afterEach(() => {
  cleanup();
});

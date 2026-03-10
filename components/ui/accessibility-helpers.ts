export function getSharedSelectTriggerA11yProps(triggerAriaLabel?: string): {
  'aria-label'?: string;
} {
  if (!triggerAriaLabel) {
    return {};
  }

  return {
    'aria-label': triggerAriaLabel,
  };
}

export const TABS_LIST_CLASS_NAME =
  'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-foreground';

export const TABS_TRIGGER_CLASS_NAME =
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium text-foreground/80 ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:hover:bg-background/70 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm';

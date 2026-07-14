export interface SelectableOptionButtonState {
  type: 'button';
  'aria-pressed': boolean;
  className: string;
  descriptionClassName: string;
  metaClassName: string;
}

export function getSelectableOptionButtonState(
  selected: boolean
): SelectableOptionButtonState {
  return {
    type: 'button',
    'aria-pressed': selected,
    className: [
      'relative rounded-lg border-2 p-3 text-left transition-all',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      selected
        ? 'border-primary bg-primary/8 shadow-sm shadow-primary/20'
        : 'border-input bg-background hover:border-primary/40 hover:bg-accent/40',
    ].join(' '),
    descriptionClassName: 'mt-1 text-xs text-foreground/80',
    metaClassName: selected
      ? 'mt-1 text-xs font-semibold text-foreground'
      : 'mt-1 text-xs font-semibold text-foreground/90',
  };
}

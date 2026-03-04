'use client'

import * as React from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type AccordionType = 'single' | 'multiple'

interface AccordionContextValue {
  isOpen: (value: string) => boolean
  toggleItem: (value: string) => void
}

interface AccordionItemContextValue {
  value: string
  open: boolean
  triggerId: string
  contentId: string
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)
const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(
  null
)

function useAccordionContext(componentName: string) {
  const context = React.useContext(AccordionContext)

  if (!context) {
    throw new Error(`${componentName} must be used within Accordion`)
  }

  return context
}

function useAccordionItemContext(componentName: string) {
  const context = React.useContext(AccordionItemContext)

  if (!context) {
    throw new Error(`${componentName} must be used within AccordionItem`)
  }

  return context
}

interface AccordionProps extends React.ComponentProps<'div'> {
  type?: AccordionType
  defaultValue?: string | string[]
}

function toValueArray(value?: string | string[]) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function getInitialValues(type: AccordionType, defaultValue?: string | string[]) {
  const values = toValueArray(defaultValue)

  if (type === 'single') {
    return values.slice(0, 1)
  }

  return values
}

function Accordion({
  type = 'single',
  defaultValue,
  className,
  children,
  ...props
}: AccordionProps) {
  const [openValues, setOpenValues] = React.useState<string[]>(
    getInitialValues(type, defaultValue)
  )

  const isOpen = React.useCallback(
    (value: string) => openValues.includes(value),
    [openValues]
  )

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenValues(prev => {
        const opened = prev.includes(value)

        if (type === 'single') {
          return opened ? [] : [value]
        }

        return opened ? prev.filter(item => item !== value) : [...prev, value]
      })
    },
    [type]
  )

  return (
    <AccordionContext.Provider value={{ isOpen, toggleItem }}>
      <div className={cn('space-y-3', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps extends React.ComponentProps<'div'> {
  value: string
}

function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const { isOpen } = useAccordionContext('AccordionItem')
  const itemId = React.useId()
  const open = isOpen(value)
  const triggerId = `${itemId}-trigger`
  const contentId = `${itemId}-content`

  return (
    <AccordionItemContext.Provider value={{ value, open, triggerId, contentId }}>
      <div
        data-state={open ? 'open' : 'closed'}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  const { toggleItem } = useAccordionContext('AccordionTrigger')
  const { value, open, triggerId, contentId } = useAccordionItemContext('AccordionTrigger')

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = event => {
    onClick?.(event)

    if (!event.defaultPrevented) {
      toggleItem(value)
    }
  }

  return (
    <button
      id={triggerId}
      type="button"
      aria-expanded={open}
      aria-controls={contentId}
      onClick={handleClick}
      className={cn(
        'focus-visible:ring-ring/50 flex w-full items-center justify-between gap-3 text-left outline-none transition-colors focus-visible:ring-2',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function AccordionIndicator({ className, ...props }: React.ComponentProps<'svg'>) {
  const { open } = useAccordionItemContext('AccordionIndicator')

  return (
    <ChevronDownIcon
      className={cn(
        'text-muted-foreground h-5 w-5 shrink-0 transition-all duration-200',
        open && 'rotate-180 text-foreground',
        className
      )}
      {...props}
    />
  )
}

function AccordionContent({ className, children, ...props }: React.ComponentProps<'div'>) {
  const { open, triggerId, contentId } = useAccordionItemContext('AccordionContent')

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={open ? 'open' : 'closed'}
      className={cn(
        'grid transition-all duration-300 ease-out',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-95'
      )}
    >
      <div className="overflow-hidden">
        <div className={cn(className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  )
}

export {
  Accordion,
  AccordionContent,
  AccordionIndicator,
  AccordionItem,
  AccordionTrigger,
}

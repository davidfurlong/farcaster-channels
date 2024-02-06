"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"
import { ArrowDownUpIcon, DotIcon } from "lucide-react"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="IconButton" aria-label="Dropdown options">
        <ArrowDownUpIcon />
      </button>
    </DropdownMenuTrigger>
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-state=open:animate-in data-state=closed:animate-out data-state=closed:fade-out-0 data-state=open:fade-in-0 data-state=closed:zoom-out-95 data-state=open:zoom-in-95 data-state=closed:slide-out-to-left-1/2 data-state=closed:slide-out-to-top-[48%] data-state=open:slide-in-from-left-1/2 data-state=open:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </DropdownMenuPrimitive.Content>
  </DropdownMenuPortal>
  </DropdownMenu>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = DropdownMenuPrimitive.Item

const DropdownMenuLabel = DropdownMenuPrimitive.Label

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn("inline-flex")}
    {...props}
  >
    {children}
    <DropdownMenuItemIndicator><DotIcon /></DropdownMenuItemIndicator>
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuItemIndicator = DropdownMenuPrimitive.ItemIndicator

const DropdownMenuSeparator = DropdownMenuPrimitive.Separator

export {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator
}
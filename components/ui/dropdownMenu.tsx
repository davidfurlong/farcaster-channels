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
      <button
       className="rounded-lg w-[35px] h-[35px] mx-2 inline-flex items-center justify-center outline-none hover:bg-violet-900/50 gap-4 border bg-background shadow-lg focus:shadow-[0_0_0_2px] focus:shadow-violet-900"
       aria-label="Dropdown options"
      >
        <ArrowDownUpIcon />
      </button>
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-40 min-w-[220px] bg-violet-900/50 rounded-md border font-mono p-[5px] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade",
          className
        )}
        sideOffset={5}
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
    className={cn("inline-flex my-0.5")}
    {...props}
  >
    {children}
    <DropdownMenuItemIndicator><DotIcon /></DropdownMenuItemIndicator>
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
  ref={ref}
  className={cn(" h-0.5 bg-violet-400/50")}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Separator>
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.DropdownMenuSeparator.displayName

const DropdownMenuItemIndicator = DropdownMenuPrimitive.ItemIndicator

export {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator
}
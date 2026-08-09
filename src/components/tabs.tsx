"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * L1 Tabs — underline (default) or soft-pill list.
 */
const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva("inline-flex items-center text-muted-foreground", {
  variants: {
    variant: {
      underline: "gap-1 border-b border-divider",
      soft: "gap-1 rounded-control bg-muted-subtle p-1",
    },
  },
  defaultVariants: {
    variant: "underline",
  },
});

const TabsListContext = React.createContext<"underline" | "soft">("underline");

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant = "underline", ...props }, ref) => {
  const resolved = variant ?? "underline";
  return (
    <TabsListContext.Provider value={resolved}>
      <TabsPrimitive.List
        ref={ref}
        className={cn(tabsListVariants({ variant: resolved, className }))}
        {...props}
      />
    </TabsListContext.Provider>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap font-medium",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        underline: [
          "border-b-2 border-transparent px-control-md py-control-sm text-sm",
          "hover:text-foreground",
          "data-[state=active]:border-accent data-[state=active]:text-foreground",
        ].join(" "),
        soft: [
          "rounded-control px-control-md py-control-xs text-sm",
          "hover:text-foreground",
          "data-[state=active]:bg-surface data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsListContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant, className }))}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-stack-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/64",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
};

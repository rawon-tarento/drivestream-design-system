import { useState } from "react";
import { Button, Spinner } from "@drivestream/ui";
import { cn } from "./labels.js";

function Chevron({ direction }) {
  const path = direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6";
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
      <path d={path} />
    </svg>
  );
}

/**
 * Two-column stepped wizard: numbered rail, step heading, body, previous/next footer.
 * Copy is passed in so each page keeps its own locale file.
 */
export function SteppedWizard({
  steps,
  currentIndex,
  sidebarTitle,
  sidebarDescription,
  footerNote,
  heading,
  subheading,
  previousLabel,
  nextLabel,
  completeLabel,
  completingLabel,
  busy = false,
  busyLabel,
  onPrevious,
  onNext,
  onComplete,
  children,
}) {
  const isLast = currentIndex >= steps.length - 1;
  return (
    <div className="w-full bg-background border border-surface-alt rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      <div className="w-full md:w-[260px] bg-surface-alt border-b md:border-b-0 md:border-r border-surface-alt p-8 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div>
            <h3 className="font-bold text-foreground text-base tracking-tight">{sidebarTitle}</h3>
            {sidebarDescription ? <p className="text-muted-foreground text-xs mt-1">{sidebarDescription}</p> : null}
          </div>
          <div className="flex flex-col space-y-0 pl-1">
            {steps.map((step, index) => {
              const active = index === currentIndex;
              const completed = index < currentIndex;
              return (
                <div key={step.id} className="flex items-start">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className={cn(
                        "flex items-center justify-center rounded-full w-8 h-8 font-semibold text-sm border-2 transition-all duration-200",
                        active || completed
                          ? "border-accent bg-accent text-accent-foreground shadow-sm"
                          : "border-border bg-surface text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>
                    {index < steps.length - 1 ? (
                      <div className={cn("w-0.5 h-14 my-1", index < currentIndex ? "bg-accent" : "bg-border/60")} />
                    ) : null}
                  </div>
                  <div className="pt-1">
                    <h4 className={cn("text-sm font-medium transition-colors duration-200", active ? "text-accent font-semibold" : "text-muted-foreground")}>
                      {step.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {footerNote ? (
          <div className="pt-6 border-t border-border/40 mt-8 md:mt-0">
            <p className="text-muted-foreground text-xs">{footerNote}</p>
          </div>
        ) : null}
      </div>
      <div className="flex-1 p-8 flex flex-col justify-between min-h-[500px]">
        <div className="flex-1">
          <div className="border-b border-surface-alt pb-4 mb-6">
            <h2 className="text-xl font-bold text-foreground tracking-tight">{heading}</h2>
            {subheading ? <p className="text-muted-foreground text-sm mt-1">{subheading}</p> : null}
          </div>
          <div className="min-h-[300px]" role="tabpanel">
            {busy ? (
              <div className="flex flex-col items-center justify-center gap-4 py-24">
                <Spinner size="lg" label={busyLabel || completingLabel} />
              </div>
            ) : (
              children
            )}
          </div>
        </div>
        <div className="border-t border-surface-alt pt-6 mt-8 flex items-center justify-between">
          <Button type="button" variant="secondary" onClick={onPrevious} disabled={currentIndex === 0 || busy} className="min-w-[100px]">
            <Chevron direction="left" />
            {previousLabel}
          </Button>
          {isLast ? (
            <Button type="button" onClick={onComplete} disabled={busy} className="min-w-[120px]">
              {busy ? completingLabel : completeLabel}
            </Button>
          ) : (
            <Button type="button" onClick={onNext} disabled={busy} className="min-w-[100px]">
              {nextLabel}
              <Chevron direction="right" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Collapsed extra fields inside a wizard step. Closing it keeps the values. */
export function WizardDisclosure({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2 rounded-lg border border-surface-alt bg-surface/60 px-4 py-3 text-sm font-medium text-foreground hover:bg-surface transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-accent" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
        <span className="flex-1 text-left">{label}</span>
        <svg viewBox="0 0 24 24" className={cn("h-4 w-4 text-muted-foreground transition-transform", open ? "rotate-180" : "")} aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open ? <div className="mt-3 space-y-6 rounded-lg border border-surface-alt bg-surface/30 p-5">{children}</div> : null}
    </div>
  );
}

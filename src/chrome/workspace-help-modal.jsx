import { useState } from "react";
import { Button, Dialog, DialogBody, DialogContent, DialogHeader, DialogTitle } from "@drivestream/ui";
import { chromeLabels } from "./labels.js";
import { useChromeNavigate } from "./nav.jsx";
import { cn } from "./labels.js";
import {
  helpContentScopedToSections,
  helpContentToWorkspaceSections,
  workspaceHelpSectionPanelId,
  workspaceHelpSectionSurfaceClass,
} from "./workspace-help.js";

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 text-muted-foreground" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 1-1 1.7V14" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function WorkspaceHelpIcon({ onClick, besideTitle = false }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={besideTitle ? "h-8 w-8 shrink-0" : "shrink-0"}
      aria-label={chromeLabels.openHelp}
      onClick={onClick}
    >
      <HelpIcon />
    </Button>
  );
}

export function WorkspaceHelp({ content, sectionIds, besideTitle }) {
  const [open, setOpen] = useState(false);
  const scoped = sectionIds && sectionIds.length > 0 ? helpContentScopedToSections(content, sectionIds) : content;
  if (!scoped) return null;
  const sections = helpContentToWorkspaceSections(scoped);
  return (
    <>
      <WorkspaceHelpIcon besideTitle={besideTitle} onClick={() => setOpen(true)} />
      <WorkspaceHelpModal open={open} onOpenChange={setOpen} title={scoped.title} sections={sections} />
    </>
  );
}

export function WorkspaceHelpModal({ open, onOpenChange, title, sections }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody className="space-y-3">
          {sections.length === 1 ? (
            <HelpModalSectionBody section={sections[0]} />
          ) : (
            sections.map((section) => <HelpModalSection key={section.id} section={section} />)
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

function HelpModalSectionBody({ section }) {
  const navigate = useChromeNavigate();
  return (
    <div className="space-y-3">
      <p className="text-sm leading-relaxed text-foreground/85">{section.content}</p>
      {section.examples && section.examples.length > 0 ? (
        <div>
          <p className="mb-1 text-xs font-medium text-muted-foreground">{chromeLabels.examples}</p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/85">
            {section.examples.map((example) => (
              <li key={example}>{example}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {section.links && section.links.length > 0 ? (
        <div className="border-t border-border/60 pt-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">{chromeLabels.relatedLinks}</p>
          <div className="flex flex-wrap gap-3">
            {section.links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  {link.text}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                  onClick={(event) => {
                    if (!navigate) return;
                    event.preventDefault();
                    navigate(link.href);
                  }}
                >
                  {link.text}
                </a>
              )
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function HelpModalSection({ section }) {
  const [expanded, setExpanded] = useState(section.defaultExpanded ?? true);
  const panelId = workspaceHelpSectionPanelId(section.id);
  return (
    <div className={cn("rounded-lg border p-4", workspaceHelpSectionSurfaceClass(section.type))}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-3 text-left"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={panelId}
      >
        <span className="font-semibold text-foreground">{section.title}</span>
        <span className={cn("text-muted-foreground", expanded && "rotate-180")} aria-hidden>
          ⌄
        </span>
      </button>
      {expanded ? (
        <div id={panelId} className="mt-3">
          <HelpModalSectionBody section={section} />
        </div>
      ) : null}
    </div>
  );
}

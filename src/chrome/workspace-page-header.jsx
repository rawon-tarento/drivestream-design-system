import { useState } from "react";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@drivestream/ui";
import { chromeLabels, cn } from "./labels.js";
import { useChromeNavigate } from "./nav.jsx";
import { useShellTrail } from "./shell-trail.jsx";
import { WorkspaceHelpIcon, WorkspaceHelpModal } from "./workspace-help-modal.jsx";
import { helpContentToWorkspaceSections } from "./workspace-help.js";

export function WorkspacePageHeader({
  contextSegments,
  title,
  titleMeta,
  subtitle,
  back,
  helpContent,
  actions,
  className,
}) {
  const navigate = useChromeNavigate();
  const [helpOpen, setHelpOpen] = useState(false);
  useShellTrail(contextSegments);
  const showChrome = Boolean(back || actions || helpContent);

  function goBack() {
    if (back?.onClick) back.onClick();
    else if (back?.href && navigate) navigate(back.href);
  }

  return (
    <header className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h1 className="min-w-0 text-2xl font-bold tracking-tight text-primary">{title}</h1>
            {titleMeta ? <div className="flex shrink-0 items-center">{titleMeta}</div> : null}
          </div>
          {subtitle ? <div className="max-w-3xl text-sm text-foreground/80">{subtitle}</div> : null}
        </div>
        {showChrome ? (
          <div
            className="flex w-full min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end lg:w-auto lg:shrink-0"
            aria-label={chromeLabels.chromeNavAria}
          >
            {back ? (
              <Button type="button" variant="secondary" size="sm" className="w-full sm:w-auto" onClick={goBack}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                <span className="leading-none">{back.label}</span>
              </Button>
            ) : null}
            {actions ? (
              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
                {actions}
              </div>
            ) : null}
            {helpContent ? <WorkspaceHelpIcon onClick={() => setHelpOpen(true)} /> : null}
          </div>
        ) : null}
      </div>
      {helpContent ? (
        <WorkspaceHelpModal
          open={helpOpen}
          onOpenChange={setHelpOpen}
          title={helpContent.title}
          sections={helpContentToWorkspaceSections(helpContent)}
        />
      ) : null}
    </header>
  );
}

export function WorkspaceCard({ title, description, children }) {
  return (
    <Card>
      {title || description ? (
        <CardHeader>
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? <CardDescription>{description}</CardDescription> : null}
        </CardHeader>
      ) : null}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

import { createContext, useCallback, useContext, useId, useLayoutEffect, useMemo, useState } from "react";
import { chromeLabels } from "./labels.js";
import { useChromeNavigate } from "./nav.jsx";

const ShellTrailContext = createContext({
  trail: null,
  push() {},
  pop() {},
});

export function useShellTrail(segments) {
  const { push, pop } = useContext(ShellTrailContext);
  const id = useId();
  const serialized = JSON.stringify(segments ?? []);

  useLayoutEffect(() => {
    const parsed = JSON.parse(serialized);
    if (parsed.length === 0) return;
    push(id, parsed);
    return () => pop(id);
  }, [id, serialized, push, pop]);
}

export function ShellTrail({ segments }) {
  useShellTrail(segments);
  return null;
}

export function ShellTrailProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const push = useCallback((id, segments) => {
    setEntries((prev) => [...prev.filter((entry) => entry.id !== id), { id, segments }]);
  }, []);
  const pop = useCallback((id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);
  const trail = entries.at(-1)?.segments ?? null;
  const value = useMemo(() => ({ trail, push, pop }), [trail, push, pop]);
  return <ShellTrailContext.Provider value={value}>{children}</ShellTrailContext.Provider>;
}

export function ShellTrailNav() {
  const { trail: segments } = useContext(ShellTrailContext);
  const navigate = useChromeNavigate();
  if (!segments || segments.length === 0) {
    return <div className="min-w-0 flex-1" />;
  }
  return (
    <nav className="min-w-0 flex-1 overflow-hidden" aria-label={chromeLabels.breadcrumbNavAria}>
      <ol className="flex min-w-0 flex-nowrap items-center overflow-hidden text-sm text-muted-foreground">
        {segments.map((segment, index) => (
          <li key={`${segment.label}-${index}`} className="flex min-w-0 items-center">
            {index > 0 ? (
              <span className="mx-1.5 shrink-0 select-none text-muted-foreground" aria-hidden>
                {chromeLabels.breadcrumbPathSeparator}
              </span>
            ) : null}
            {segment.href ? (
              <a
                href={segment.href}
                className="truncate transition-colors hover:text-foreground"
                onClick={(event) => {
                  if (!navigate) return;
                  event.preventDefault();
                  navigate(segment.href);
                }}
              >
                {segment.label}
              </a>
            ) : (
              <span className="truncate font-medium text-foreground" aria-current="page">
                {segment.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function WorkspacePage({ children, className = "" }) {
  return <div className={["space-y-8", className].filter(Boolean).join(" ")}>{children}</div>;
}

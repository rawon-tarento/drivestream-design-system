/** @typedef {"tip" | "warning" | "info" | "technical" | "example"} HelpSectionType */

export function workspaceHelpSectionSurfaceClass(type) {
  switch (type) {
    case "tip":
      return "border-accent/20 bg-accent/5";
    case "warning":
      return "border-warning/20 bg-warning/5";
    case "technical":
      return "border-accent-secondary/20 bg-accent-secondary/5";
    case "example":
      return "border-success/20 bg-success/5";
    default:
      return "border-border bg-surface-alt/40";
  }
}

export function workspaceHelpSectionPanelId(sectionId) {
  return `workspace-help-section-${sectionId}`;
}

export function helpContentToWorkspaceSections(content) {
  return content.sections.map((section) => ({
    id: section.id,
    title: section.title,
    content: section.content,
    type: section.type,
    examples: section.examples,
    defaultExpanded: section.defaultExpanded ?? true,
    links: section.links?.map((link) => ({
      text: link.text,
      href: link.url || link.href,
      external: link.external,
    })),
  }));
}

export function helpContentScopedToSections(content, sectionIds) {
  const wanted = new Set(sectionIds);
  const sections = content.sections.filter((section) => wanted.has(section.id));
  if (sections.length === 0) return null;
  const title = sections.length === 1 ? sections[0].title : content.title;
  return {
    ...content,
    title,
    sections: sections.map((section) => ({ ...section, defaultExpanded: true })),
  };
}

export function helpContentExcludingSections(content, sectionIds) {
  const excluded = new Set(sectionIds);
  return helpContentScopedToSections(
    content,
    content.sections.filter((section) => !excluded.has(section.id)).map((section) => section.id)
  );
}

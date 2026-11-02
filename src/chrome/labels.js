import common from "./locales/en/common.json";

export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

export const chromeLabels = common;

function readPath(source, key) {
  let current = source;
  for (const part of key.split(".")) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

function fill(text, params) {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}

/** Look up a dot path in a dictionary. A missing key returns the key. */
export function translate(source, key, params) {
  const value = readPath(source, key);
  if (value === undefined) return key;
  return fill(value, params);
}

/** Scoped lookup for one dictionary, matching the ops `useTranslation` call shape. */
export function useTranslation(source) {
  return {
    t(key, params) {
      return translate(source, key, params);
    },
  };
}

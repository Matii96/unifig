/**
 * Deep Object.assign behavior.
 * @param {Record<string, any>} base
 * @param {Record<string, any>} data
 * @returns {Record<string, any>}
 */
export const overrideObject = (base: Record<string, any>, data: Record<string, any>) => {
  for (const key in data) {
    const value = data[key];
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        base[key] = base[key] ? (base[key] as any[]).concat(value) : value;
      } else {
        base[key] = overrideObject(base[key] ?? {}, value);
      }
    } else {
      base[key] = value;
    }
  }
  return base;
};

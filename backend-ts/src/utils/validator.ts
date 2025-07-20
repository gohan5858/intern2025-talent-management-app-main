export function isValidQueryString(value: unknown): value is string {
  // req.query is parsed by the qs module.
  // https://www.npmjs.com/package/qs
  if (Array.isArray(value)) {
    // Multiple filterText is not supported
    return false;
  }

  if (typeof value !== "string") {
    // Nested query object is not supported
    return false;
  }

  return true;
}
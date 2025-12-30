/**
 * Removes keys from `params` if their values are null, undefined, or empty string.
 */
export default function cleanedParams<T extends Record<string, any>>(
  params: T
): Partial<T> {
  const result = {} as Partial<T>;

  (Object.keys(params) as Array<keyof T>).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== '' && value !== 0) {
      result[key] = value;
    }
  });

  return result;
}

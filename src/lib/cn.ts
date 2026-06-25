/**
 * Tiny className joiner — filters out falsy values and joins with a space.
 * Keeps component markup readable without pulling in an extra dependency.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}

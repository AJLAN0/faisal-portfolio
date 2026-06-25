const ARABIC_INDIC = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

/**
 * Converts Western digits in a number/string to Arabic-Indic numerals
 * (e.g. 24 → ٢٤). Used for the decorative video-count labels.
 */
export function toArabicDigits(input: number | string): string {
  return String(input).replace(/[0-9]/g, (d) => ARABIC_INDIC[Number(d)])
}

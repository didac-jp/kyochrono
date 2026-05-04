const MONTH_NUM: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

/**
 * Converts a work date string (e.g. "Apr. - Jul. 2006 / TV animation") to a
 * sortable integer of the form YYYYMM, using the start month of the work.
 */
export function dateSortKey(date: string): number {
    // "Oct. 2006 - Mar. 2007" → first "Mon. YYYY"
    const withYear = date.match(/([A-Z][a-z]{2})\.\s*(\d{4})/);
    if (withYear) return parseInt(withYear[2]) * 100 + (MONTH_NUM[withYear[1]] ?? 0);
    // "Apr. - Jul. 2006" → month before dash + year at end
    const monthThenYear = date.match(/([A-Z][a-z]{2})\.[^-]*-[^/]*?(\d{4})/);
    if (monthThenYear) return parseInt(monthThenYear[2]) * 100 + (MONTH_NUM[monthThenYear[1]] ?? 0);
    // "2025 / TV animation" → year only
    const yearOnly = date.match(/\d{4}/);
    return yearOnly ? parseInt(yearOnly[0]) * 100 : 0;
}

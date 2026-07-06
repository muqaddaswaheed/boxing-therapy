/**
 * Coach availability rules (base weekly hours) + slot helpers.
 * Sunday 8–12, Saturday 8–18, weekdays 6–21. Sessions are 1 hour.
 */
export function availableHours(dayOfWeek) {
  let start;
  let end;
  if (dayOfWeek === 0) {
    start = 8;
    end = 12;
  } else if (dayOfWeek === 6) {
    start = 8;
    end = 18;
  } else {
    start = 6;
    end = 21;
  }
  const hours = [];
  for (let i = start; i <= end; i++) hours.push(i);
  return hours;
}

/** Parse "YYYY-MM-DD" into a local Date at midnight. */
export function parseDateKey(dateKey) {
  const [y, m, d] = (dateKey || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function isHourBlocked(absenceValue, hour) {
  if (absenceValue === "all") return true;
  return Array.isArray(absenceValue) && absenceValue.includes(hour);
}

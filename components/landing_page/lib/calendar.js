/**
 * Calendar / booking helpers. Date & weekday names are produced with
 * Intl.DateTimeFormat so they follow the active locale automatically.
 */

export const ABS_KEY = "bt_absences";

const LOCALES = { fr: "fr-FR", en: "en-GB", de: "de-DE" };

export function localeOf(lang) {
  return LOCALES[lang] || "fr-FR";
}

/** Month + year title, e.g. "juin 2026" / "June 2026" / "Juni 2026". */
export function monthLabel(year, month, lang) {
  return new Date(year, month, 1).toLocaleDateString(localeOf(lang), {
    month: "long",
    year: "numeric",
  });
}

/** Short weekday headers, Monday-first, for the current locale. */
export function weekdayShorts(lang) {
  const fmt = new Intl.DateTimeFormat(localeOf(lang), { weekday: "short" });
  // 2024-01-01 is a Monday.
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(2024, 0, 1 + i)).replace(".", "")
  );
}

/** Full readable date, e.g. "lundi 16 juin 2026". */
export function fmtDate(date, lang) {
  return date.toLocaleDateString(localeOf(lang), {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Hour label — French keeps "8h00", others use "8:00". */
export function fmtHour(hour, lang) {
  return lang === "fr" ? `${hour}h00` : `${hour}:00`;
}

/** Available hours by day of week: Sun 8–12, Sat 8–18, weekdays 6–21. */
export function heuresDispo(dayOfWeek) {
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

/** Stable "YYYY-MM-DD" key used to store absences. */
export function keyOf(date) {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}

export function dayBlocked(absences, date) {
  return absences[keyOf(date)] === "all";
}

export function hourBlocked(absences, date, hour) {
  const value = absences[keyOf(date)];
  return value === "all" || (Array.isArray(value) && value.includes(hour));
}

export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const ADMIN_CODE = "1234";

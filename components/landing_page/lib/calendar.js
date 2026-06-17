/**
 * Calendar / booking helpers — ported 1:1 from the original vanilla-JS mockup.
 */

export const MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const DOWS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const JOURS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

export const ABS_KEY = "bt_absences";

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

/** "lundi 16 juin 2026" */
export function fmtDate(date) {
  return (
    JOURS[date.getDay()] +
    " " +
    date.getDate() +
    " " +
    MOIS[date.getMonth()].toLowerCase() +
    " " +
    date.getFullYear()
  );
}

export function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export const ADMIN_CODE = "1234";

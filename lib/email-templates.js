/**
 * Booking confirmation email content, per language.
 * `dateTime` is optional — when the slot isn't chosen yet (it's picked on
 * Calendly afterwards) we show a "to be confirmed" line instead.
 */

const ADDRESS = "Rue Saint-Pierre 6B, 1700 Fribourg";

function frWhen(dateTime) {
  return dateTime
    ? `Rendez-vous : ${dateTime}`
    : "Votre créneau est à choisir sur le calendrier de réservation.";
}
function enWhen(dateTime) {
  return dateTime
    ? `Appointment: ${dateTime}`
    : "Please pick your time slot on the booking calendar.";
}
function deWhen(dateTime) {
  return dateTime
    ? `Termin: ${dateTime}`
    : "Bitte wähle deinen Termin im Buchungskalender.";
}

function wrapHtml(bodyLines) {
  const paras = bodyLines
    .map((l) =>
      l.type === "list"
        ? `<ul style="margin:8px 0 8px 18px;padding:0;color:#3a3a3a">${l.items
            .map((i) => `<li style="margin:2px 0">${i}</li>`)
            .join("")}</ul>`
        : `<p style="margin:0 0 12px;line-height:1.6;color:${
            l.strong ? "#111" : "#3a3a3a"
          };${l.strong ? "font-weight:700" : ""}">${l.text}</p>`
    )
    .join("");
  return `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <div style="border-top:4px solid #d4af37;padding-top:16px">
      <h1 style="font-size:16px;letter-spacing:2px;text-transform:uppercase;color:#111;margin:0 0 16px">Boxing Thérapie Premium</h1>
      ${paras}
    </div>
  </div>`;
}

export function bookingEmail(
  lang,
  { name, dateTime, sessionLabel, remaining = null, total = null }
) {
  const hasSessions = remaining !== null && total !== null;
  const sessionsLine =
    lang === "en"
      ? `Pack: ${remaining} of ${total} session(s) remaining.`
      : lang === "de"
      ? `Paket: noch ${remaining} von ${total} Sitzung(en) übrig.`
      : `Pack : il vous reste ${remaining} séance(s) sur ${total}.`;
  const first = name || "";

  if (lang === "en") {
    const lines = [
      { text: `Hi ${first},` },
      {
        text: "Here we go — your spot is booked at Boxing Thérapie Premium, and we're really happy to welcome you.",
      },
      { text: enWhen(dateTime), strong: true },
      { text: `Address: ${ADDRESS}`, strong: true },
      ...(sessionLabel ? [{ text: `Session: ${sessionLabel}` }] : []),
      ...(hasSessions ? [{ text: sessionsLine, strong: true }] : []),
      {
        text: "This moment is yours. No judgment, no comparison — just you, the coach, and the drive to push yourself a little more each session.",
      },
      { text: "What to bring:" },
      {
        type: "list",
        items: [
          "Comfortable clothing",
          "Something to stay hydrated",
          "A small towel",
          "Gloves and wraps (if you have them)",
        ],
      },
      {
        text: "Not equipped yet? No problem — we have everything on site to lend you. Come as you are, we handle the rest.",
      },
      { text: "Can't wait to see you hit the bag and leave with a smile." },
      { text: "See you soon,<br/>The Boxing Thérapie Premium team" },
    ];
    return {
      subject: "Your booking is confirmed — Boxing Thérapie Premium",
      html: wrapHtml(lines),
    };
  }

  if (lang === "de") {
    const lines = [
      { text: `Hallo ${first},` },
      {
        text: "Los geht's — dein Platz bei Boxing Thérapie Premium ist reserviert, und wir freuen uns sehr, dich zu empfangen.",
      },
      { text: deWhen(dateTime), strong: true },
      { text: `Adresse: ${ADDRESS}`, strong: true },
      ...(sessionLabel ? [{ text: `Sitzung: ${sessionLabel}` }] : []),
      ...(hasSessions ? [{ text: sessionsLine, strong: true }] : []),
      {
        text: "Dieser Moment gehört dir. Keine Wertung, kein Vergleich — nur du, der Coach und der Wille, dich jede Sitzung ein bisschen mehr zu fordern.",
      },
      { text: "Was du mitbringen solltest:" },
      {
        type: "list",
        items: [
          "Bequeme Kleidung",
          "Etwas zu trinken",
          "Ein kleines Handtuch",
          "Handschuhe und Bandagen (falls vorhanden)",
        ],
      },
      {
        text: "Noch nicht ausgerüstet? Kein Problem — wir haben alles vor Ort zum Ausleihen. Komm wie du bist, um den Rest kümmern wir uns.",
      },
      { text: "Wir freuen uns darauf, dich am Sack zu sehen und mit einem Lächeln gehen zu sehen." },
      { text: "Bis bald,<br/>Das Team von Boxing Thérapie Premium" },
    ];
    return {
      subject: "Deine Buchung ist bestätigt — Boxing Thérapie Premium",
      html: wrapHtml(lines),
    };
  }

  // French (default) — the client's original text
  const lines = [
    { text: `Salut ${first},` },
    {
      text: "C'est parti — votre place est réservée chez Boxing Thérapie Premium, et on est super content de vous accueillir.",
    },
    { text: frWhen(dateTime), strong: true },
    { text: `Adresse : ${ADDRESS}`, strong: true },
    ...(sessionLabel ? [{ text: `Séance : ${sessionLabel}` }] : []),
    ...(hasSessions ? [{ text: sessionsLine, strong: true }] : []),
    {
      text: "Ce moment, c'est le vôtre. Pas de jugement, pas de comparaison — juste vous, le coach, et l'envie de vous dépasser un peu plus à chaque séance.",
    },
    { text: "Pour venir :" },
    {
      type: "list",
      items: [
        "Une tenue confortable",
        "De quoi vous hydrater",
        "Une petite serviette",
        "Gants et bandes (si vous en avez)",
      ],
    },
    {
      text: "Pas encore équipé ? Aucun souci, on a tout sur place pour vous prêter le matériel — venez comme vous êtes, on s'occupe du reste.",
    },
    { text: "On a hâte de vous voir taper dans le sac et repartir avec le sourire." },
    { text: "À très vite,<br/>L'équipe Boxing Thérapie Premium" },
  ];
  return {
    subject: "Votre réservation est confirmée — Boxing Thérapie Premium",
    html: wrapHtml(lines),
  };
}

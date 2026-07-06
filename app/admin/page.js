"use client";

import React, { useState, useEffect, useCallback } from "react";
import CopyButton from "@/components/landing_page/ui/CopyButton";
import { TRANSLATIONS } from "@/components/landing_page/i18n/translations";
import { availableHours, parseDateKey } from "@/lib/availability";
import { fmtHour } from "@/components/landing_page/lib/calendar";

const LANGS = ["fr", "en", "de"];
const LOCALES = { fr: "fr-CH", en: "en-GB", de: "de-CH" };

export default function AdminPage() {
  const [lang, setLang] = useState("fr");
  const t = TRANSLATIONS[lang].admin;
  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleString(LOCALES[lang], {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : "—";

  const [authed, setAuthed] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const [codes, setCodes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [packType, setPackType] = useState("pack5");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [newCode, setNewCode] = useState(null);
  const [genning, setGenning] = useState(false);

  // Date-blocking
  const [absences, setAbsences] = useState([]);
  const [blockDate, setBlockDate] = useState("");

  // Search (filters codes + bookings by code or name)
  const [query, setQuery] = useState("");

  // Restore language preference (shared with the site).
  useEffect(() => {
    try {
      const saved = localStorage.getItem("bt_lang");
      if (saved && TRANSLATIONS[saved]) setLang(saved);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const changeLang = (l) => {
    setLang(l);
    try {
      localStorage.setItem("bt_lang", l);
    } catch (e) {
      /* ignore */
    }
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [c, b, a] = await Promise.all([
        fetch("/api/admin/codes").then((r) => r.json()),
        fetch("/api/admin/bookings").then((r) => r.json()),
        fetch("/api/admin/absences").then((r) => r.json()),
      ]);
      setCodes(c.codes || []);
      setBookings(b.bookings || []);
      setAbsences(a.absences || []);
    } catch (e) {
      /* ignore */
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        setAuthed(!!d.authed);
        if (d.authed) loadData();
      })
      .catch(() => setAuthed(false));
  }, [loadData]);

  const login = async (e) => {
    e.preventDefault();
    setLoginErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (r.ok) {
      setAuthed(true);
      loadData();
    } else {
      setLoginErr(t.loginError);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setCodes([]);
    setBookings([]);
    setAbsences([]);
  };

  const generate = async (e) => {
    e.preventDefault();
    setGenning(true);
    setNewCode(null);
    const r = await fetch("/api/admin/codes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ packType, clientName, clientEmail }),
    });
    const d = await r.json();
    if (r.ok) {
      setNewCode(d.code);
      setClientName("");
      setClientEmail("");
      loadData();
    }
    setGenning(false);
  };

  const postAbsence = async (payload) => {
    const r = await fetch("/api/admin/absences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const d = await r.json();
    if (r.ok) setAbsences(d.absences || []);
  };

  const blockedForDate = absences.find((a) => a.dateKey === blockDate);
  const blockDayHours = blockDate
    ? availableHours(parseDateKey(blockDate).getDay())
    : [];
  const hourIsBlocked = (h) =>
    blockedForDate &&
    (blockedForDate.value === "all" ||
      (Array.isArray(blockedForDate.value) && blockedForDate.value.includes(h)));

  // Search filter (by code or name/email/phone)
  const q = query.trim().toLowerCase();
  const matchText = (...vals) =>
    vals.filter(Boolean).some((v) => String(v).toLowerCase().includes(q));
  const filteredCodes = !q
    ? codes
    : codes.filter((c) => matchText(c.code, c.clientName, c.clientEmail));
  const filteredBookings = !q
    ? bookings
    : bookings.filter((b) =>
        matchText(
          b.code,
          b.contactEmail,
          ...(b.participants || []).flatMap((p) => [
            p.firstName,
            p.lastName,
            p.email,
            p.phone,
          ])
        )
      );

  const LangSwitch = () => (
    <div className="flex items-center gap-2">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => changeLang(l)}
          className={`px-2 py-1 text-[12px] font-bold uppercase tracking-[0.1em] ${
            lang === l ? "text-gold" : "text-gris hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  if (authed === null) {
    return (
      <main className="flex min-h-screen items-center justify-center text-gris">
        {t.loading}
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-[360px] rounded-[16px] border border-bord bg-carte p-7"
        >
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="font-display text-[22px] font-extrabold text-white">
                {t.loginTitle}
              </h1>
              <p className="text-[13px] text-gris">Boxing Thérapie Premium</p>
            </div>
            <LangSwitch />
          </div>
          <label className="mb-3 flex flex-col gap-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-gris">
            {t.email}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-[10px] border border-bord bg-noir p-3 text-[15px] text-blanc outline-none focus:border-gold"
            />
          </label>
          <label className="mb-4 flex flex-col gap-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-gris">
            {t.password}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-[10px] border border-bord bg-noir p-3 text-[15px] text-blanc outline-none focus:border-gold"
            />
          </label>
          {loginErr && (
            <div className="mb-3 text-[13px] font-semibold text-rouge">{loginErr}</div>
          )}
          <button className="w-full rounded-[10px] bg-gold px-4 py-3 text-[14px] font-bold text-[#0b0b0d] hover:bg-gold-light">
            {t.login}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1000px] px-4 py-10 md:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="font-display text-[24px] font-extrabold text-white">
          {t.loginTitle}
        </h1>
        <div className="flex items-center gap-4">
          <LangSwitch />
          <button
            onClick={logout}
            className="rounded-[8px] border border-bord px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em] text-gris hover:border-gold hover:text-gold"
          >
            {t.logout}
          </button>
        </div>
      </div>

      {/* Search */}
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.search}
        className="mb-8 w-full rounded-[12px] border border-bord bg-noir px-4 py-3 text-[14px] text-blanc outline-none focus:border-gold"
      />

      {/* Generate code */}
      <section className="mb-10 rounded-[16px] border border-bord bg-carte p-6">
        <h2 className="mb-4 text-[14px] font-extrabold uppercase tracking-[0.1em] text-gold">
          {t.genTitle}
        </h2>
        <form onSubmit={generate} className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-gris">
            {t.pack}
            <select
              value={packType}
              onChange={(e) => setPackType(e.target.value)}
              className="rounded-[10px] border border-bord bg-noir p-[10px] text-[14px] text-blanc outline-none focus:border-gold"
            >
              <option value="pack5">{t.pack5}</option>
              <option value="pack10">{t.pack10}</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-gris">
            {t.clientName}
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="rounded-[10px] border border-bord bg-noir p-[10px] text-[14px] text-blanc outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-gris">
            {t.clientEmail}
            <input
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="rounded-[10px] border border-bord bg-noir p-[10px] text-[14px] text-blanc outline-none focus:border-gold"
            />
          </label>
          <button
            disabled={genning || !/.+@.+\..+/.test(clientEmail.trim())}
            className="rounded-[10px] bg-gold px-5 py-[11px] text-[14px] font-bold text-[#0b0b0d] hover:bg-gold-light disabled:opacity-60"
          >
            {genning ? "…" : t.generate}
          </button>
        </form>
        {newCode && (
          <div className="mt-4 flex items-center gap-3 rounded-[10px] border border-gold bg-gold/10 px-4 py-3">
            <span className="font-mono text-[18px] font-extrabold text-gold">
              {newCode}
            </span>
            <CopyButton value={newCode} />
            <span className="text-[13px] text-gris">{t.codeGiven}</span>
          </div>
        )}
      </section>

      {/* Block dates */}
      <section className="mb-10 rounded-[16px] border border-bord bg-carte p-6">
        <h2 className="mb-4 text-[14px] font-extrabold uppercase tracking-[0.1em] text-gold">
          {t.blockTitle}
        </h2>
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-gris">
            {t.blockDate}
            <input
              type="date"
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className="rounded-[10px] border border-bord bg-noir p-[10px] text-[14px] text-blanc outline-none focus:border-gold"
            />
          </label>
          {blockDate && (
            <button
              onClick={() => postAbsence({ dateKey: blockDate, mode: "blockDay" })}
              className="rounded-[10px] border border-gold bg-gold px-4 py-[11px] text-[13px] font-bold text-[#0b0b0d]"
            >
              {t.blockDayBtn}
            </button>
          )}
        </div>

        {blockDate && (
          <>
            <div className="mb-2 mt-4 text-[12px] text-gris">{t.blockHoursHint}</div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-2">
              {blockDayHours.map((h) => (
                <button
                  key={h}
                  onClick={() =>
                    postAbsence({ dateKey: blockDate, mode: "toggleHour", hour: h })
                  }
                  className={`rounded-[8px] border px-1 py-2 text-[13px] font-bold transition-colors ${
                    hourIsBlocked(h)
                      ? "border-gold bg-gold text-[#0b0b0d]"
                      : "border-bord bg-noir text-blanc hover:border-gold"
                  }`}
                >
                  {fmtHour(h, lang)}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Blocked list */}
        <div className="mt-5 flex flex-col gap-2">
          {absences.length === 0 && (
            <div className="text-[13px] text-gris-fonce">{t.blockedNone}</div>
          )}
          {absences.map((a) => (
            <div
              key={a.dateKey}
              className="flex items-center justify-between gap-3 rounded-[10px] border border-bord bg-noir px-4 py-2 text-[13px]"
            >
              <span className="text-blanc">
                <span className="font-mono">{a.dateKey}</span>{" "}
                <span className="text-gris">
                  ·{" "}
                  {a.value === "all"
                    ? t.allDay
                    : (Array.isArray(a.value) ? a.value : [])
                        .slice()
                        .sort((x, y) => x - y)
                        .map((h) => fmtHour(h, lang))
                        .join(", ")}
                </span>
              </span>
              <button
                onClick={() => postAbsence({ dateKey: a.dateKey, mode: "unblock" })}
                className="rounded-[6px] border border-bord px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-gris hover:border-gold hover:text-gold"
              >
                {t.unblock}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Codes table */}
      <section className="mb-10">
        <h2 className="mb-3 text-[14px] font-extrabold uppercase tracking-[0.1em] text-gold">
          {t.codesTitle} ({filteredCodes.length})
        </h2>
        <div className="overflow-x-auto rounded-[14px] border border-bord">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead className="bg-noir text-gris-fonce">
              <tr>
                {[t.colCode, t.colPack, t.colRemaining, t.colClient, t.colStatus, t.colCreated].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 font-semibold uppercase tracking-[0.06em]"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredCodes.map((c) => (
                <tr key={c._id} className="border-t border-bord text-blanc">
                  <td className="px-4 py-3 font-mono font-bold text-gold">{c.code}</td>
                  <td className="px-4 py-3">
                    {c.packType === "pack10" ? "Pack 10" : "Pack 5"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={c.remaining === 0 ? "text-rouge" : "text-[#4CAF50]"}>
                      {c.remaining}
                    </span>
                    <span className="text-gris-fonce"> / {c.totalSessions}</span>
                  </td>
                  <td className="px-4 py-3 text-gris">
                    {c.clientName || c.clientEmail || "—"}
                  </td>
                  <td className="px-4 py-3 text-gris">{c.status}</td>
                  <td className="px-4 py-3 text-gris-fonce">{fmtDate(c.createdAt)}</td>
                </tr>
              ))}
              {filteredCodes.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gris-fonce">
                    {loading ? t.loading : t.noCodes}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bookings table */}
      <section>
        <h2 className="mb-3 text-[14px] font-extrabold uppercase tracking-[0.1em] text-gold">
          {t.bookingsTitle} ({filteredBookings.length})
        </h2>
        <div className="overflow-x-auto rounded-[14px] border border-bord">
          <table className="w-full min-w-[720px] text-left text-[13px]">
            <thead className="bg-noir text-gris-fonce">
              <tr>
                {[
                  t.colDate,
                  t.colSession,
                  t.colParticipants,
                  t.colPayment,
                  t.colCode,
                  t.colStatus,
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-semibold uppercase tracking-[0.06em]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b._id} className="border-t border-bord align-top text-blanc">
                  <td className="px-4 py-3 text-gris-fonce">{fmtDate(b.createdAt)}</td>
                  <td className="px-4 py-3">
                    {t.sessions[b.sessionType] || b.sessionType}
                  </td>
                  <td className="px-4 py-3 text-gris">
                    {(b.participants || []).map((p, i) => (
                      <div key={i}>
                        {p.firstName} {p.lastName}
                        {p.phone ? ` · ${p.phone}` : ""}
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-gris">{b.paymentMethod}</td>
                  <td className="px-4 py-3 font-mono text-gold">{b.code || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={b.status === "confirmed" ? "text-[#4CAF50]" : "text-gris"}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gris-fonce">
                    {loading ? t.loading : t.noBookings}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

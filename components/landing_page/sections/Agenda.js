"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";
import BookingModal from "../components/BookingModal";
import {
  MOIS,
  DOWS,
  ABS_KEY,
  ADMIN_CODE,
  heuresDispo,
  keyOf,
  dayBlocked,
  hourBlocked,
  fmtDate,
  validEmail,
} from "../lib/calendar";

const Step = ({ n, children }) => (
  <div className="mb-[14px] mt-[34px] flex items-center gap-[10px] text-[13px] font-extrabold uppercase tracking-[0.06em]">
    <span className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-gold text-[13px] text-[#0b0b0d]">
      {n}
    </span>
    {children}
  </div>
);

const Agenda = () => {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState(null);
  const [viewY, setViewY] = useState(0);
  const [viewM, setViewM] = useState(0);
  const [selDate, setSelDate] = useState(null);
  const [selHour, setSelHour] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [absences, setAbsences] = useState({});

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [formErr, setFormErr] = useState("");

  const [modal, setModal] = useState({ open: false, when: "", name: "", email: "" });

  // SSR-safe init: compute "today" and read stored absences on the client only.
  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
    setViewY(t.getFullYear());
    setViewM(t.getMonth());
    try {
      const raw = localStorage.getItem(ABS_KEY);
      if (raw) setAbsences(JSON.parse(raw));
    } catch (e) {
      /* ignore */
    }
    setMounted(true);
  }, []);

  const persistAbsences = useCallback((next) => {
    setAbsences(next);
    try {
      localStorage.setItem(ABS_KEY, JSON.stringify(next));
    } catch (e) {
      /* ignore */
    }
  }, []);

  const selectDate = (date) => {
    setSelDate(date);
    setSelHour(null);
  };

  const prevMonth = () => {
    if (today && viewY === today.getFullYear() && viewM === today.getMonth()) return;
    let m = viewM - 1;
    let y = viewY;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    setViewM(m);
    setViewY(y);
  };

  const nextMonth = () => {
    let m = viewM + 1;
    let y = viewY;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewM(m);
    setViewY(y);
  };

  const toggleAdmin = () => {
    if (!adminMode) {
      const code = window.prompt("Code coach :");
      if (code !== ADMIN_CODE) {
        if (code !== null) window.alert("Code incorrect.");
        return;
      }
      setAdminMode(true);
      setAdminOpen(true);
    } else {
      setAdminMode(false);
      setAdminOpen(false);
    }
  };

  const closeAdmin = () => {
    setAdminMode(false);
    setAdminOpen(false);
  };

  const blockDay = () => {
    if (!selDate) {
      window.alert("Sélectionnez d'abord une date.");
      return;
    }
    persistAbsences({ ...absences, [keyOf(selDate)]: "all" });
  };

  const unblockDay = () => {
    if (!selDate) {
      window.alert("Sélectionnez d'abord une date.");
      return;
    }
    const next = { ...absences };
    delete next[keyOf(selDate)];
    persistAbsences(next);
  };

  const toggleAdminHour = (h) => {
    const k = keyOf(selDate);
    let v = absences[k];
    if (v === "all") {
      v = heuresDispo(selDate.getDay()).filter((x) => x !== h);
    } else {
      if (!Array.isArray(v)) v = [];
      if (v.includes(h)) v = v.filter((x) => x !== h);
      else v = [...v, h];
    }
    const next = { ...absences };
    if (v.length === 0) delete next[k];
    else next[k] = v;
    persistAbsences(next);
  };

  const confirmBooking = () => {
    if (!(selDate && selHour !== null)) return;
    const nom = form.name.trim();
    const tel = form.phone.trim();
    const mail = form.email.trim();
    if (!nom || !tel || !mail || !validEmail(mail)) {
      setFormErr(
        !nom || !tel || !mail
          ? "Merci de remplir votre nom, téléphone et email."
          : "Merci d'entrer une adresse email valide."
      );
      return;
    }
    setFormErr("");
    setModal({
      open: true,
      when: `${fmtDate(selDate)} à ${selHour}h00`,
      name: nom,
      email: mail,
    });
  };

  const canConfirm = selDate && selHour !== null;
  const recapText = canConfirm
    ? `${fmtDate(selDate)} à ${selHour}h00`
    : selDate
    ? "Choisissez une heure"
    : "Rien de sélectionné";

  // ---- Calendar grid model ----
  const buildCalendar = () => {
    if (!today) return [];
    const first = new Date(viewY, viewM, 1);
    const startDay = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push({ empty: true, key: `e${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewY, viewM, d);
      const isPast = date < today;
      const blocked = dayBlocked(absences, date);
      const clickable = !isPast && (!blocked || adminMode);
      const selected =
        selDate && date.getTime() === selDate.getTime();
      cells.push({ d, date, isPast, blocked, clickable, selected, key: `d${d}` });
    }
    return cells;
  };

  const calCells = buildCalendar();
  const slotHours = selDate ? heuresDispo(selDate.getDay()) : [];

  return (
    <section id="agenda" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[640px]">
        <div className="text-center">
          <Eyebrow>Agenda</Eyebrow>
        </div>
        <h2 className="font-display mt-[18px] text-center text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
          Réservez votre séance
        </h2>

        {/* Step 1 — date */}
        <Step n={1}>Choisissez la date</Step>
        <div className="rounded-[16px] border border-bord bg-carte p-[18px]">
          <div className="mb-[14px] flex items-center justify-between">
            <button
              onClick={prevMonth}
              aria-label="Mois précédent"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-bord bg-noir text-gold transition-colors hover:border-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-[17px] font-extrabold capitalize">
              {mounted ? `${MOIS[viewM]} ${viewY}` : ""}
            </div>
            <button
              onClick={nextMonth}
              aria-label="Mois suivant"
              className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-bord bg-noir text-gold transition-colors hover:border-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-[5px]">
            {DOWS.map((d) => (
              <div
                key={d}
                className="py-[6px] text-center text-[11px] font-bold uppercase text-gris-fonce"
              >
                {d}
              </div>
            ))}
            {calCells.map((cell) =>
              cell.empty ? (
                <div key={cell.key} className="aspect-square" />
              ) : (
                <button
                  key={cell.key}
                  disabled={!cell.clickable}
                  onClick={() => cell.clickable && selectDate(cell.date)}
                  className={`flex aspect-square items-center justify-center rounded-[10px] text-[15px] font-semibold transition-colors duration-100 ${
                    cell.selected
                      ? "bg-gold font-extrabold text-[#0b0b0d]"
                      : cell.blocked
                      ? "bg-gold/[0.18] text-gold line-through"
                      : cell.isPast
                      ? "cursor-not-allowed text-[#3a3a40]"
                      : "text-blanc hover:bg-noir"
                  } ${cell.clickable ? "cursor-pointer" : "cursor-not-allowed"}`}
                >
                  {cell.d}
                </button>
              )
            )}
          </div>
        </div>

        {/* Step 2 — hour */}
        <Step n={2}>Choisissez l'heure</Step>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-[10px]">
          {!selDate ? (
            <div className="col-span-full py-[18px] text-center text-[15px] text-gris-fonce">
              Sélectionnez d'abord une date.
            </div>
          ) : (
            slotHours.map((h) => {
              const blocked = hourBlocked(absences, selDate, h);
              const selected = selHour === h;
              return (
                <button
                  key={h}
                  disabled={blocked}
                  onClick={() => {
                    if (!blocked) setSelHour(h);
                  }}
                  className={`rounded-[10px] border px-[6px] py-[15px] text-[15px] font-bold transition-colors duration-150 ${
                    selected
                      ? "border-gold bg-gold text-[#0b0b0d]"
                      : blocked
                      ? "cursor-not-allowed border-dashed border-bord bg-transparent text-[#4a4a50] line-through"
                      : "border-bord bg-noir text-blanc hover:border-gold"
                  }`}
                >
                  {h}h00
                </button>
              );
            })
          )}
        </div>

        {/* Step 3 — details */}
        <Step n={3}>Vos coordonnées</Step>
        <div className="flex flex-col gap-4 rounded-[16px] border border-bord bg-carte p-[22px]">
          {[
            { key: "name", label: "Nom complet", type: "text", placeholder: "Prénom et nom", autoComplete: "name" },
            { key: "phone", label: "Numéro de téléphone", type: "tel", placeholder: "+41 79 000 00 00", autoComplete: "tel" },
            { key: "email", label: "Adresse email", type: "email", placeholder: "votre@email.com", autoComplete: "email" },
          ].map((field) => (
            <label
              key={field.key}
              className="flex flex-col gap-2 text-[12px] font-bold uppercase tracking-[0.04em] text-gris"
            >
              {field.label}
              <input
                type={field.type}
                value={form[field.key]}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                onChange={(e) =>
                  setForm((f) => ({ ...f, [field.key]: e.target.value }))
                }
                className="rounded-[10px] border border-bord bg-noir p-[14px] text-[16px] text-blanc outline-none focus:border-gold"
              />
            </label>
          ))}
          {formErr && (
            <div className="text-[14px] font-semibold text-gold-light">
              {formErr}
            </div>
          )}
        </div>

        {/* Recap + confirm */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-[16px] border border-bord bg-carte px-6 py-[22px]">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-gris-fonce">
              Votre sélection
            </div>
            <div
              className={`mt-1 ${
                canConfirm
                  ? "text-[18px] font-extrabold text-gold"
                  : "text-[15px] font-semibold text-gris-fonce"
              }`}
            >
              {recapText}
            </div>
          </div>
          <button
            disabled={!canConfirm}
            onClick={confirmBooking}
            className={`w-full rounded-[10px] px-7 py-[15px] text-[14px] font-bold transition-colors duration-200 sm:w-auto ${
              canConfirm
                ? "cursor-pointer bg-gold text-[#0b0b0d] hover:bg-gold-light"
                : "cursor-not-allowed border border-bord bg-noir text-gris-fonce"
            }`}
          >
            Confirmer
          </button>
        </div>

        {/* Admin / coach space */}
        <div className="mt-[30px] text-center">
          <button
            onClick={toggleAdmin}
            className="cursor-pointer rounded-[8px] border border-bord px-[18px] py-[10px] text-[12px] font-semibold uppercase tracking-[0.14em] text-gris-fonce transition-colors hover:border-gold hover:text-gold"
          >
            {adminMode ? "Espace coach (activé)" : "Espace coach"}
          </button>
        </div>

        {adminOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-[18px] rounded-[16px] border border-gold bg-carte p-6"
          >
            <div className="mb-[10px] text-[14px] font-extrabold uppercase tracking-[0.06em] text-gold">
              Espace coach — Mes absences
            </div>
            <p className="mb-[18px] text-[13px] leading-[1.6] text-gris">
              Sélectionnez une date dans le calendrier, puis bloquez la journée
              entière ou des heures précises. Les créneaux bloqués ne sont plus
              réservables.
            </p>
            <div className="mb-[18px] flex flex-wrap gap-[10px]">
              <button
                onClick={blockDay}
                className="flex-1 cursor-pointer rounded-[10px] border border-gold bg-gold px-3 py-[13px] text-[13px] font-bold uppercase tracking-[0.04em] text-[#0b0b0d]"
                style={{ flexBasis: 150 }}
              >
                Bloquer la journée
              </button>
              <button
                onClick={unblockDay}
                className="flex-1 cursor-pointer rounded-[10px] border border-gold bg-transparent px-3 py-[13px] text-[13px] font-bold uppercase tracking-[0.04em] text-gold"
                style={{ flexBasis: 150 }}
              >
                Débloquer
              </button>
            </div>
            <div className="mb-3 text-[13px] font-bold">
              Ou bloquez des heures précises :
            </div>
            <div className="mb-[18px] grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2">
              {!selDate ? (
                <div className="col-span-full py-[18px] text-center text-[15px] text-gris-fonce">
                  Sélectionnez d'abord une date.
                </div>
              ) : (
                heuresDispo(selDate.getDay()).map((h) => {
                  const blocked = hourBlocked(absences, selDate, h);
                  return (
                    <button
                      key={h}
                      onClick={() => toggleAdminHour(h)}
                      className={`cursor-pointer rounded-[8px] border px-1 py-3 text-[14px] font-bold transition-colors ${
                        blocked
                          ? "border-gold bg-gold text-[#0b0b0d]"
                          : "border-bord bg-noir text-blanc"
                      }`}
                    >
                      {h}h
                    </button>
                  );
                })
              )}
            </div>
            <button
              onClick={closeAdmin}
              className="w-full cursor-pointer rounded-[10px] border border-bord bg-noir px-4 py-[13px] text-[13px] font-bold uppercase tracking-[0.08em] text-gris"
            >
              Fermer l'espace coach
            </button>
          </motion.div>
        )}
      </div>

      <BookingModal
        open={modal.open}
        when={modal.when}
        name={modal.name}
        email={modal.email}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
      />
    </section>
  );
};

export default Agenda;

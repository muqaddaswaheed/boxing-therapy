"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, X, Loader2, ArrowRight } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
import CopyButton from "../ui/CopyButton";
import CalendlyEmbed from "./CalendlyEmbed";
import { BANK } from "../lib/bank";
import {
  SESSION_TYPES,
  SESSION_TYPE_KEYS,
  participantsFor,
} from "@/lib/booking-config";

const emptyParticipant = () => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

const fill = (str, n) => (str || "").replace("{n}", n);

const BookingForm = () => {
  const { t, lang, bookingSession, bookingFromPack } = useNavigation();
  const tr = t.booking;
  const tiers = t.grouprates.tiers; // aligned with SESSION_TYPE_KEYS order

  const [sessionType, setSessionType] = useState(bookingSession || "solo");

  // Pre-select the session type chosen on the Tarifs/Promotion pages.
  useEffect(() => {
    if (bookingSession && SESSION_TYPE_KEYS.includes(bookingSession)) {
      setSessionType(bookingSession);
    }
  }, [bookingSession]);
  const [participants, setParticipants] = useState([emptyParticipant()]);
  const [payment, setPayment] = useState("transfer");
  const [code, setCode] = useState("");
  const [codeState, setCodeState] = useState(null); // {status, remaining}
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // {type, remaining, msg}
  const [step, setStep] = useState("form"); // "form" → "slot"
  const [bookingId, setBookingId] = useState(null);

  // Resize participant list to match the session type.
  useEffect(() => {
    const n = participantsFor(sessionType);
    setParticipants((prev) => {
      const next = prev.slice(0, n);
      while (next.length < n) next.push(emptyParticipant());
      return next;
    });
  }, [sessionType]);

  // The pack-code option only exists for pack bookings — otherwise force off.
  useEffect(() => {
    if (!bookingFromPack) setPayment((p) => (p === "code" ? "transfer" : p));
  }, [bookingFromPack]);

  const updateP = (i, field, val) =>
    setParticipants((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, [field]: val } : p))
    );

  const checkCode = async () => {
    if (!code.trim()) return;
    setChecking(true);
    setCodeState(null);
    try {
      const r = await fetch("/api/codes/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const d = await r.json();
      if (d.valid) setCodeState({ status: "valid", remaining: d.remaining });
      else
        setCodeState({
          status: d.error === "NO_SESSIONS_LEFT" ? "nosessions" : "invalid",
        });
    } catch (e) {
      setCodeState({ status: "invalid" });
    }
    setChecking(false);
  };

  const participantsValid = participants.every(
    (p) => p.firstName.trim() && p.lastName.trim() && p.phone.trim()
  );
  const formValid = participantsValid;

  const submit = async () => {
    setResult(null);
    if (!participantsValid) {
      setResult({ type: "error", msg: tr.errFields });
      return;
    }
    setSubmitting(true);
    try {
      const r = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionType,
          paymentMethod: payment,
          code: payment === "code" ? code : undefined,
          participants,
          lang,
        }),
      });
      const d = await r.json();
      if (r.ok) {
        setBookingId(d.bookingId);
        setStep("slot");
        setResult(
          d.remaining !== undefined ? { type: "saved", remaining: d.remaining } : { type: "saved" }
        );
      } else {
        const map = {
          INVALID_CODE: tr.codeInvalid,
          CODE_DISABLED: tr.codeInvalid,
          MISSING_CODE: tr.codeInvalid,
          NO_SESSIONS_LEFT: tr.codeNoSessions,
          PARTICIPANT_COUNT: tr.errFields,
          PARTICIPANT_FIELDS: tr.errFields,
        };
        setResult({ type: "error", msg: map[d.error] || tr.errGeneric });
      }
    } catch (e) {
      setResult({ type: "error", msg: tr.errGeneric });
    }
    setSubmitting(false);
  };

  const inputCls =
    "w-full rounded-[10px] border border-bord bg-noir p-[12px] text-[15px] text-blanc outline-none focus:border-gold";
  const labelCls =
    "flex flex-col gap-1.5 text-[12px] font-bold uppercase tracking-[0.04em] text-gris";

  // The pack-code option is only offered when the booking was started from a
  // Pack 5 / Pack 10 (one-person pack). Other selections show transfer + cash.
  const PAYMENTS = [
    { key: "transfer", label: tr.payTransfer },
    { key: "cash", label: tr.payCash },
    ...(bookingFromPack ? [{ key: "code", label: tr.payCode }] : []),
  ];

  const idx = SESSION_TYPE_KEYS.indexOf(sessionType);
  const selectedTier = tiers[idx] || tiers[0];

  return (
    <div className="rounded-[16px] border border-bord bg-carte p-5 md:p-7">
      {/* Selected session (read-only — chosen on the Tarifs/Promotion page) */}
      <div className="flex items-center justify-between rounded-[12px] border border-gold/40 bg-gold/[0.06] px-4 py-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-gris-fonce">
            {tr.sessionLabel}
          </div>
          <div className="text-[16px] font-extrabold text-white">
            {selectedTier.tier}{" "}
            <span className="font-normal text-gris">· {selectedTier.persons}</span>
          </div>
        </div>
        <div className="text-[18px] font-extrabold text-gold">
          CHF {SESSION_TYPES[sessionType].priceCHF}
        </div>
      </div>

      {step === "form" && (
        <>
      {/* Participants */}
      <div className="mt-6 space-y-4">
        {participants.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-[12px] border border-bord bg-noir/40 p-4"
          >
            <div className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.08em] text-gold">
              {tr.participant} {i + 1}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className={labelCls}>
                {tr.firstName}
                <input
                  className={inputCls}
                  value={p.firstName}
                  onChange={(e) => updateP(i, "firstName", e.target.value)}
                />
              </label>
              <label className={labelCls}>
                {tr.lastName}
                <input
                  className={inputCls}
                  value={p.lastName}
                  onChange={(e) => updateP(i, "lastName", e.target.value)}
                />
              </label>
              <label className={labelCls}>
                {tr.phone}
                <input
                  className={inputCls}
                  type="tel"
                  placeholder={tr.phonePh}
                  value={p.phone}
                  onChange={(e) => updateP(i, "phone", e.target.value)}
                />
              </label>
              <label className={labelCls}>
                {tr.email}
                <input
                  className={inputCls}
                  type="email"
                  value={p.email}
                  onChange={(e) => updateP(i, "email", e.target.value)}
                />
              </label>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment */}
      <div className="mt-6 mb-2 text-[12px] font-bold uppercase tracking-[0.14em] text-gris">
        {tr.paymentLabel}
      </div>
      <div
        className={`grid grid-cols-1 gap-3 ${
          PAYMENTS.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
        }`}
      >
        {PAYMENTS.map((m) => {
          const active = payment === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setPayment(m.key)}
              className={`rounded-[10px] border px-3 py-3 text-[13px] font-bold transition-colors ${
                active
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-bord bg-noir text-blanc hover:border-gold/50"
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Payment detail panel */}
      {payment === "transfer" && (
        <div className="mt-4 rounded-[12px] border border-gold/50 bg-noir p-4 text-[14px] text-gris">
          <div className="mb-2">{tr.transferNote}</div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-gris-fonce">{t.payment.holder}</span>
            <span className="font-bold text-blanc">{BANK.holder}</span>
          </div>
          <div className="flex items-center gap-2 rounded-[6px] border border-dashed border-gold px-[10px] py-2">
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] uppercase tracking-[0.16em] text-gris-fonce">
                IBAN
              </span>
              <span className="break-all font-mono text-[15px] font-bold text-blanc">
                {BANK.iban}
              </span>
            </div>
            <CopyButton value={BANK.iban} />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-gris-fonce">SWIFT/BIC</span>
            <span className="font-mono font-bold text-blanc">{BANK.swift}</span>
          </div>
        </div>
      )}

      {payment === "cash" && (
        <div className="mt-4 rounded-[12px] border border-bord bg-noir p-4 text-[14px] text-gris">
          {tr.cashNote}
        </div>
      )}

      {payment === "code" && (
        <div className="mt-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className={`${inputCls} font-mono uppercase`}
              placeholder={tr.codePlaceholder}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeState(null);
              }}
            />
            <button
              onClick={checkCode}
              disabled={checking || !code.trim()}
              className="flex items-center justify-center gap-2 rounded-[10px] border border-gold bg-gold px-5 py-[12px] text-[14px] font-bold text-[#0b0b0d] disabled:opacity-50"
            >
              {checking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                tr.checkCode
              )}
            </button>
          </div>
          {codeState && (
            <div
              className={`mt-2 flex items-center gap-2 text-[13px] font-semibold ${
                codeState.status === "valid" ? "text-[#4CAF50]" : "text-rouge"
              }`}
            >
              {codeState.status === "valid" ? (
                <>
                  <Check className="h-4 w-4" />
                  {fill(tr.codeValid, codeState.remaining)}
                </>
              ) : (
                <>
                  <X className="h-4 w-4" />
                  {codeState.status === "nosessions"
                    ? tr.codeNoSessions
                    : tr.codeInvalid}
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error (form step) */}
      {result?.type === "error" && (
        <div className="mt-4 rounded-[12px] border border-rouge/50 bg-rouge/10 p-4 text-[14px] leading-relaxed text-[#e8a8a4]">
          {result.msg}
        </div>
      )}

      {/* Step 1 button — save details, then reveal the Calendly slot step */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.99 }}
        onClick={submit}
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-[12px] bg-gold px-4 py-[15px] text-[15px] font-bold text-[#0b0b0d] transition-colors hover:bg-gold-light disabled:opacity-60"
      >
        {submitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {tr.continueToSlot} <ArrowRight className="h-[18px] w-[18px]" />
          </>
        )}
      </motion.button>
        </>
      )}

      {/* Step 2 — pick the slot on Calendly (finalized via webhook) */}
      {step === "slot" && (
        <>
          <div className="mt-6 rounded-[12px] border border-gold/50 bg-gold/10 p-4 text-[14px] leading-relaxed text-blanc">
            {tr.detailsSaved}
            {result?.remaining !== undefined && (
              <span className="mt-1 block text-[13px] text-gris">
                {fill(tr.successConfirmed, result.remaining)}
              </span>
            )}
          </div>

          <div className="mt-4 mb-2 text-[12px] font-bold uppercase tracking-[0.14em] text-gris">
            {tr.step2}
          </div>
          <div className="overflow-hidden rounded-[12px] border border-bord bg-noir/30 p-2">
            <CalendlyEmbed
              lang={lang}
              fallbackLabel={t.agenda.openExternal}
              utmContent={bookingId}
              prefill={{
                name: `${participants[0].firstName} ${participants[0].lastName}`.trim(),
                email: participants[0].email,
                guests: participants.slice(1).map((p) => p.email),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BookingForm;

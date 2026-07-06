"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  monthLabel,
  weekdayShorts,
  fmtHour,
  keyOf,
} from "../lib/calendar";

/**
 * Date + time slot picker. Fetches available hours from /api/slots for the
 * selected day (base hours minus blocked/taken/past). Calls
 * onChange({ date, hour }) when a slot is chosen.
 */
const SlotPicker = ({ lang = "fr", value, onChange, tr }) => {
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState(null);
  const [viewY, setViewY] = useState(0);
  const [viewM, setViewM] = useState(0);
  const [selDate, setSelDate] = useState(null); // "YYYY-MM-DD"
  const [hours, setHours] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    setToday(t);
    setViewY(t.getFullYear());
    setViewM(t.getMonth());
    setMounted(true);
  }, []);

  const loadSlots = useCallback(async (dateKey) => {
    setLoading(true);
    setHours(null);
    try {
      const r = await fetch(`/api/slots?date=${dateKey}`);
      const d = await r.json();
      setHours(Array.isArray(d.hours) ? d.hours : []);
    } catch (e) {
      setHours([]);
    }
    setLoading(false);
  }, []);

  const selectDay = (date) => {
    const key = keyOf(date);
    setSelDate(key);
    onChange?.({ date: key, hour: null });
    loadSlots(key);
  };

  const prevMonth = () => {
    if (today && viewY === today.getFullYear() && viewM === today.getMonth()) return;
    let m = viewM - 1;
    let y = viewY;
    if (m < 0) { m = 11; y -= 1; }
    setViewM(m); setViewY(y);
  };
  const nextMonth = () => {
    let m = viewM + 1;
    let y = viewY;
    if (m > 11) { m = 0; y += 1; }
    setViewM(m); setViewY(y);
  };

  const buildCells = () => {
    if (!today) return [];
    const first = new Date(viewY, viewM, 1);
    const startDay = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push({ empty: true, key: `e${i}` });
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewY, viewM, d);
      const isPast = date < today;
      const selected = selDate === keyOf(date);
      cells.push({ d, date, isPast, selected, key: `d${d}` });
    }
    return cells;
  };

  const cells = buildCells();

  return (
    <div>
      {/* Calendar */}
      <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.14em] text-gris">
        {tr.pickDate}
      </div>
      <div className="rounded-[16px] border border-bord bg-noir/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="←"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-bord bg-noir text-gold transition-colors hover:border-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-[15px] font-extrabold capitalize">
            {mounted ? monthLabel(viewY, viewM, lang) : ""}
          </div>
          <button
            type="button"
            onClick={nextMonth}
            aria-label="→"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-bord bg-noir text-gold transition-colors hover:border-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-[5px]">
          {weekdayShorts(lang).map((d, i) => (
            <div
              key={i}
              className="py-[6px] text-center text-[11px] font-bold uppercase text-gris-fonce"
            >
              {d}
            </div>
          ))}
          {cells.map((c) =>
            c.empty ? (
              <div key={c.key} className="aspect-square" />
            ) : (
              <button
                key={c.key}
                type="button"
                disabled={c.isPast}
                onClick={() => !c.isPast && selectDay(c.date)}
                className={`flex aspect-square items-center justify-center rounded-[10px] text-[14px] font-semibold transition-colors ${
                  c.selected
                    ? "bg-gold font-extrabold text-[#0b0b0d]"
                    : c.isPast
                    ? "cursor-not-allowed text-[#3a3a40]"
                    : "text-blanc hover:bg-noir"
                }`}
              >
                {c.d}
              </button>
            )
          )}
        </div>
      </div>

      {/* Time slots */}
      <div className="mb-2 mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-gris">
        {tr.pickTime}
      </div>
      {!selDate ? (
        <div className="py-4 text-center text-[14px] text-gris-fonce">
          {tr.selectDateFirst}
        </div>
      ) : loading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-5 w-5 animate-spin text-gold" />
        </div>
      ) : hours && hours.length === 0 ? (
        <div className="py-4 text-center text-[14px] text-gris-fonce">{tr.noSlots}</div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(78px,1fr))] gap-[10px]">
          {(hours || []).map((h) => {
            const selected = value?.hour === h && value?.date === selDate;
            return (
              <button
                key={h}
                type="button"
                onClick={() => onChange?.({ date: selDate, hour: h })}
                className={`rounded-[10px] border px-2 py-3 text-[15px] font-bold transition-colors ${
                  selected
                    ? "border-gold bg-gold text-[#0b0b0d]"
                    : "border-bord bg-noir text-blanc hover:border-gold"
                }`}
              >
                {fmtHour(h, lang)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SlotPicker;

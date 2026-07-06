"use client";

import React from "react";
import Eyebrow from "../ui/Eyebrow";
import BookingForm from "../components/BookingForm";
import { useNavigation } from "../context/NavigationContext";

/**
 * Booking is fully custom now (no Calendly): the form collects the session
 * type, participants, payment / pack code, AND the time slot, then a single
 * "Confirm" creates the booking and sends the confirmation email.
 */
const Agenda = () => {
  const { t } = useNavigation();
  const tr = t.agenda;

  return (
    <section id="agenda" className="px-4 py-16 md:px-7 md:py-24">
      <div className="mx-auto max-w-[720px]">
        <div className="text-center">
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <h2 className="font-display mt-[18px] text-[clamp(34px,6vw,58px)] font-extrabold leading-none text-white">
            {tr.title}
          </h2>
          <p className="mx-auto mt-[22px] max-w-[520px] text-[18px] leading-[1.7] text-gris">
            {tr.subtitle}
          </p>
        </div>

        <div className="mt-10">
          <BookingForm />
        </div>
      </div>
    </section>
  );
};

export default Agenda;

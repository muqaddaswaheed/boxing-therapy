"use client";

import React, { useEffect, useRef } from "react";
import { getCalendlyUrl, getCalendlyLink } from "../lib/calendly";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";
const isEmail = (e) => /.+@.+\..+/.test(e || "");

/**
 * Inline Calendly embed with prefill. The invitee's name/email (and any guest
 * emails) collected in our form are passed into Calendly so they don't retype
 * them — leaving just the "Schedule Event" click. Re-initialises when the
 * language changes or once a valid email is entered.
 */
const CalendlyEmbed = ({ lang = "fr", fallbackLabel, prefill, utmContent }) => {
  const containerRef = useRef(null);

  const ready = isEmail(prefill?.email);
  const guests = (prefill?.guests || []).filter(isEmail);
  // Only re-init on meaningful changes (avoids reloading on every keystroke).
  const prefillKey = `${utmContent || ""}|${
    ready ? `${prefill.name || ""}|${prefill.email}|${guests.join(",")}` : ""
  }`;

  useEffect(() => {
    const themedUrl = getCalendlyUrl(lang);

    const init = () => {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: themedUrl,
          parentElement: containerRef.current,
          prefill: ready
            ? { name: prefill.name, email: prefill.email, guests }
            : {},
          utm: utmContent ? { utmContent } : undefined,
        });
      }
    };

    let script = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (window.Calendly) {
      init();
    } else if (script) {
      script.addEventListener("load", init);
    } else {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.addEventListener("load", init);
      document.body.appendChild(script);
    }

    return () => {
      if (script) script.removeEventListener("load", init);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, prefillKey]);

  const plainUrl = getCalendlyLink(lang);

  return (
    <div>
      <div
        ref={containerRef}
        className="h-[1050px] w-full sm:h-[820px] md:h-[700px]"
      />
      <noscript>
        <a href={plainUrl} target="_blank" rel="noopener noreferrer">
          {fallbackLabel || "Open the booking calendar"}
        </a>
      </noscript>
      <p className="mt-4 text-center text-[13px] text-gris-fonce">
        <a
          href={plainUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-gold"
        >
          {fallbackLabel || "Open the booking calendar"}
        </a>
      </p>
    </div>
  );
};

export default CalendlyEmbed;

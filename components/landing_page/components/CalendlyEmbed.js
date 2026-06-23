"use client";

import React, { useEffect, useRef } from "react";
import { getCalendlyUrl, getCalendlyLink } from "../lib/calendly";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Inline Calendly embed. Loads Calendly's widget script once, then mounts the
 * scheduling widget into this container. Re-initialises whenever the language
 * changes so the booking page (and the matching event/email) follows the
 * language the user selected on the site.
 */
const CalendlyEmbed = ({ lang = "fr", fallbackLabel }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const themedUrl = getCalendlyUrl(lang);

    const init = () => {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        window.Calendly.initInlineWidget({
          url: themedUrl,
          parentElement: containerRef.current,
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
  }, [lang]);

  const plainUrl = getCalendlyLink(lang);

  return (
    <div>
      {/* Calendly mounts its iframe here */}
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

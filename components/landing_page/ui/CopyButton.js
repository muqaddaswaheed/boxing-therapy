"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

/**
 * Small icon button that copies `value` to the clipboard and shows a brief
 * check-mark confirmation. Used next to the IBAN.
 */
const CopyButton = ({ value, label = "Copier", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (e) {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch (_) {
        /* ignore */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 flex-none items-center justify-center rounded-[8px] border border-bord text-gold transition-colors hover:border-gold hover:bg-gold/10 ${className}`}
    >
      {copied ? (
        <Check className="h-4 w-4 text-[#4CAF50]" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
};

export default CopyButton;

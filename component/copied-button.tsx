"use client";
import { toast } from "sonner";

interface CopiedButtonProps {
  className?: string;
  copiedText: string;
  afterCopiedMsg?: string;
}

export function CopiedButton({ className = "", copiedText, afterCopiedMsg = "" }: CopiedButtonProps) {
  const handle = () => {
    navigator.clipboard.writeText(copiedText).then(() => {
      if (!afterCopiedMsg) return;
      toast(afterCopiedMsg, {
        duration: 1500,
      });
    });
  };

  return (
    <button type="button" className={className} onClick={handle}>
      {copiedText}
    </button>
  );
}

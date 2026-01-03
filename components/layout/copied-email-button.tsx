"use client";
import { toast } from "sonner";

export default function CopiedEmailButton() {
  const onCopied = () => {
    navigator.clipboard.writeText("leviegu@gmail.com").then(() => {
      toast.success("Copied e-mail to clipboard.");
    });
  };

  return (
    <button type="button" className={"text-xs cursor-pointer"} onClick={onCopied}>
      leviegu@gmail.com
    </button>
  );
}

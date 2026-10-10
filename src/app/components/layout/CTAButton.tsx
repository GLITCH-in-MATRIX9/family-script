"use client";

import Link from "next/link";

export default function CTAButton({
  label = "GET YOUR STORY SCRIPTED",
}: {
  label?: string;
}) {
  return (
    <Link
      href="/#contact-us"
      className="global-cta"
      aria-label={label}
    >
      <span>{label}</span>
      <span className="global-cta-arrow">&gt;&gt;</span>
    </Link>
  );
}
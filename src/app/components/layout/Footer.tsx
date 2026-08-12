
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} My Website. All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              About
            </Link>

            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Privacy
            </Link>

            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Contact
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}


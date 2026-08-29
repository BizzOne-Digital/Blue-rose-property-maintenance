import Link from "next/link";

export function MobileBookingBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-royal/20 bg-white/95 p-3 shadow-lg backdrop-blur-md sm:hidden">
      <Link
        href="/booking"
        className="block w-full rounded-xl bg-gradient-to-r from-royal via-electric to-royal bg-[length:200%_100%] py-3.5 text-center text-sm font-bold text-white shadow-md transition-all hover:bg-right"
      >
        Book a Service
      </Link>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="page-header-offset flex min-h-screen flex-col items-center justify-center gradient-bg-radial px-4 pb-12 text-center">
      <div className="mb-8 rounded-2xl bg-white p-4 shadow-xl">
        <Image
          src="/images/blue-rose-logo.png"
          alt="Blue Rose Property Maintenance"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
      <h1 className="font-heading text-6xl font-bold text-white md:text-8xl">404</h1>
      <p className="mt-4 text-xl text-ice/70">Page not found</p>
      <p className="mt-2 max-w-md text-ice/50">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-gradient-to-r from-electric to-royal px-8 py-3 font-semibold text-white shadow-lg"
        >
          Back to Home
        </Link>
        <Link
          href="/booking"
          className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:bg-white/10"
        >
          Book a Service
        </Link>
      </div>
    </section>
  );
}

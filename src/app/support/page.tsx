import type { Metadata } from "next";
import SupportForm from "@/components/SupportForm";

export const metadata: Metadata = {
  title: "Support",
};

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Support
        </h1>
        <p className="max-w-2xl text-muted">
          Running into an issue with one of my projects, or just want to get
          in touch? Fill in the form below.
        </p>
      </div>

      <div className="max-w-xl">
        <SupportForm />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "beehiiv Ad Network — Case Studies",
  description:
    "See how advertisers grow with beehiiv's ad network. Browse real campaign results and case studies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-beehiiv-bg text-beehiiv-dark font-sans antialiased">
        <header className="border-b border-beehiiv-border bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">beehiiv</span>
              <span className="text-beehiiv-gray text-sm font-medium">
                Ad Network
              </span>
            </div>
            <span className="text-sm font-semibold text-beehiiv-orange uppercase tracking-widest">
              Case Studies
            </span>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

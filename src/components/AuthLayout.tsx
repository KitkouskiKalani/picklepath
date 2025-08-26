import React from "react";

export default function AuthLayout({ children, title, subtitle, micro }: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  micro?: string;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background: professional gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        
        {/* subtle geometric accent */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#00BFA6] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF5A5F] rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-[380px] sm:max-w-[480px] space-y-8">
          <div className="text-center">
            <div className="text-6xl mb-6 mt-6 sm:mt-10">🏓</div>
            <h1 className="text-4xl font-black text-white mb-3">{title}</h1>
            {subtitle && (
              <p className="text-xl text-gray-200 font-medium leading-relaxed">{subtitle}</p>
            )}
            {micro && (
              <p className="mt-4 text-sm text-[#00BFA6] font-semibold tracking-wide uppercase">{micro}</p>
            )}
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

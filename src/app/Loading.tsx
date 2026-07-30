'use client';

interface StoreLoadingProps {
  statusText?: string;
  title?: string;
  description?: string;
}

export default function Loading({
  statusText = 'Syncing Catalog',
  title = 'Preparing Store',
  description = 'Fetching products, discounts, and custom recommendations.',
}: StoreLoadingProps) {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 bg-slate-950 text-slate-100 overflow-hidden font-sans antialiased selection:bg-indigo-500 selection:text-white">

      <BackgroundGlow />

      <div className="relative z-10 w-full max-w-sm">

        <div 
          aria-hidden="true" 
          className="absolute -inset-0.5 rounded-3xl bg-linear-to-r from-indigo-500/40 via-purple-500/20 to-pink-500/40 blur-md opacity-75 motion-safe:animate-pulse" 
        />

        <div className="relative rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-2xl p-8 flex flex-col items-center shadow-2xl space-y-6 text-center">
          
          <Spinner />

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-[11px] font-medium text-indigo-300 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
              {statusText}
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              {title}
            </h1>
            
            <p className="text-xs text-slate-400 max-w-60 mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          <MovingProgressBar />
        </div>
      </div>
    </main>
  );
}


function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
     <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-size-[32px_32px]"
        style={{
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)',
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-indigo-600/10 rounded-full blur-[120px] motion-safe:animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18rem] h-72 bg-purple-600/15 rounded-full blur-[90px]" />
    </div>
  );
}

function Spinner() {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center my-2">
      <div className="absolute w-24 h-24 rounded-full border border-indigo-500/20 motion-safe:animate-ping opacity-25" />
      <div className="absolute w-20 h-20 rounded-full border border-purple-500/30 motion-safe:animate-spin" style={{ animationDuration: '8s' }} />

      <div className="relative w-14 h-14 rounded-2xl bg-slate-900 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-500/10">
        <svg
          className="w-7 h-7 text-indigo-400 motion-safe:animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  );
}

function MovingProgressBar() {
  return (
    <div className="w-full space-y-2 pt-2">
      <div className="flex justify-between text-[11px] font-mono text-slate-400">
        <span className="text-indigo-400 font-medium">STATUS</span>
        <span className="motion-safe:animate-pulse">PROCESSING</span>
      </div>

      <div className="relative h-1.5 w-full bg-slate-950 border border-slate-800 rounded-full overflow-hidden">
       <div 
          className="absolute inset-y-0 w-full rounded-full animate-shimmer motion-reduce:bg-indigo-500/50" 
          style={{
            backgroundImage: 'linear-gradient(to right, transparent, #818cf8, #c084fc, #ec4899, transparent)'
          }}
        />
      </div>
    </div>
  );
}
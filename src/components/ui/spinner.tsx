type SpinnerProps = {
  className?: string;
  size?: number;
};

export function Spinner({ className, size = 24 }: SpinnerProps) {
  return (
    <svg
      className={`animate-spin text-[#F82C5D] ${className ?? ""}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="status"
      aria-label="Loading"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-20"
      />
      <path
        d="M22 12C22 6.477 17.523 2 12 2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

type PageLoaderProps = {
  label?: string;
  className?: string;
};

export function PageLoader({ label = "Loading...", className }: PageLoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-20 text-[#838383] ${className ?? ""}`}
    >
      <Spinner size={32} />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

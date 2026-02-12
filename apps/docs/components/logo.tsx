interface LogoProps {
  className?: string;
  variant?: 'default' | 'icon';
}

export function Logo({ className = 'size-8', variant = 'default' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 120 L40 40 L120 40"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M216 136 L216 216 L136 216"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="128" cy="128" r="24" fill="currentColor" />
    </svg>
  );
}

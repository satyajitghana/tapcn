interface LogoWithTextProps {
  className?: string;
}

export function LogoWithText({ className = 'h-8' }: LogoWithTextProps) {
  return (
    <svg
      viewBox="0 0 440 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Logo icon (brackets + center dot) scaled from 256x256 to ~80x80 */}
      <g transform="translate(10, 10) scale(0.3125)">
        <path
          d="M40 120 L40 40 L120 40"
          stroke="currentColor"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M216 136 L216 216 L136 216"
          stroke="currentColor"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="128" cy="128" r="16" fill="currentColor" />
      </g>
      {/* "tapcn" text */}
      <text
        x="110"
        y="66"
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="52"
        letterSpacing="-1"
        fill="currentColor"
      >
        tapcn
      </text>
    </svg>
  );
}

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 256 256"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 120 L40 40 L120 40"
            stroke="#000000"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M216 136 L216 216 L136 216"
            stroke="#000000"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="128" cy="128" r="24" fill="#000000" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

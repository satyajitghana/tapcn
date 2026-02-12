import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'tapcn - UI components for React Native';
export const size = {
  width: 1200,
  height: 628,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          position: 'relative',
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            height: '100%',
            width: 1,
            backgroundColor: '#e5e5e5',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 80,
            height: '100%',
            width: 1,
            backgroundColor: '#e5e5e5',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 61,
            height: 1,
            width: '100%',
            backgroundColor: '#e5e5e5',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 61,
            height: 1,
            width: '100%',
            backgroundColor: '#e5e5e5',
          }}
        />

        {/* Corner markers */}
        <div
          style={{
            position: 'absolute',
            left: 79,
            top: 38,
            height: 48,
            width: 3,
            backgroundColor: '#a3a3a3',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 56,
            height: 3,
            width: 48,
            backgroundColor: '#a3a3a3',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 79,
            bottom: 38,
            height: 48,
            width: 3,
            backgroundColor: '#a3a3a3',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 56,
            height: 3,
            width: 48,
            backgroundColor: '#a3a3a3',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 48,
          }}
        >
          {/* tapcn logo */}
          <svg
            width="80"
            height="80"
            viewBox="0 0 256 256"
            fill="none"
            style={{ marginBottom: 32 }}
          >
            <path
              d="M40 120 L40 40 L120 40"
              stroke="#000000"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M216 136 L216 216 L136 216"
              stroke="#000000"
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="128" cy="128" r="16" fill="#000000" />
          </svg>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              textAlign: 'center',
              marginTop: 20,
              marginBottom: 4,
              lineHeight: 1.1,
            }}
          >
            tapcn
          </h1>
          <p
            style={{
              fontSize: 32,
              textAlign: 'center',
              maxWidth: 800,
              color: '#525252',
              paddingBottom: 8,
              lineHeight: 1.4,
            }}
          >
            UI components for React Native
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

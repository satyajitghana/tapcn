import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

async function loadGoogleFont(weight: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? 'tapcn';
  const description =
    searchParams.get('description') ?? 'UI components for React Native';

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
            {title}
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
            {description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont('700', title),
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Geist',
          data: await loadGoogleFont('500', description),
          style: 'normal',
          weight: 500,
        },
      ],
    }
  );
}

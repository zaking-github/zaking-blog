import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || "Zaking's Blog"
    const description = searchParams.get('description') || "Senior Frontend Architect"

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#09090b',
            padding: '80px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#3b82f6',
              marginBottom: 20,
              letterSpacing: '0.1em',
            }}
          >
            ZAKING&apos;S TECH BLOG
          </div>
          <div
            style={{
              fontSize: 60,
              fontWeight: 'bold',
              color: 'white',
              lineHeight: 1.2,
              marginBottom: 20,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#a1a1aa',
              lineHeight: 1.4,
            }}
          >
            {description}
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: 80,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                marginRight: 15,
              }}
            />
            <div style={{ color: 'white', fontSize: 24 }}>zaking.dev</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch {
    return new Response("Failed to generate the image", {
      status: 500,
    })
  }
}

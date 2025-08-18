import {NextResponse} from 'next/server'

export const revalidate = 60

export async function GET() {
  const circulation = await fetch(
    'https://pha-circulation-server.vercel.app/api/circulation',
  )

  const data = await circulation.text()

  return new NextResponse(data, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=60',
      'Content-Type': 'text/plain',
    },
  })
}

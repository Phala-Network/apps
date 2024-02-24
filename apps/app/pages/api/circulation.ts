import type {NextApiRequest, NextApiResponse} from 'next'

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse<string>,
): Promise<void> => {
  const circulation = await fetch(
    'https://pha-circulation-server.vercel.app/api/circulation',
  ).then(async (res) => await res.text())
  res.setHeader('Cache-Control', 'public, max-age=60')
  res.status(200).send(circulation)
}

export default handler

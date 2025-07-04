import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      await kv.set('jar-notes', []);
      response.status(200).json({ message: 'Notes cleared successfully' });
    } catch (error) {
      response.status(500).json({ error: 'Failed to clear notes' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}
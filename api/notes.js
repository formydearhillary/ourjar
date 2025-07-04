import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    try {
      const notes = await kv.get('jar-notes') || [];
      response.status(200).json(notes);
    } catch (error) {
      response.status(500).json({ error: 'Failed to fetch notes' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}
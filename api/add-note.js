import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method === 'POST') {
    try {
      const { text, color } = request.body;
      
      const notes = await kv.get('jar-notes') || [];
      const newNote = {
        id: Date.now(),
        text,
        color,
        date: new Date().toISOString()
      };
      
      notes.push(newNote);
      await kv.set('jar-notes', notes);
      
      response.status(200).json(newNote);
    } catch (error) {
      response.status(500).json({ error: 'Failed to add note' });
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}
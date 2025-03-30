import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const CookieSettingsSchema = z.object({
  essential: z.boolean(),
  analytics: z.boolean(),
  preferences: z.boolean(),
  userId: z.string(),
  timestamp: z.number().optional().default(() => Date.now())
});

// In-memory store (consider using a database in production)
const cookiePreferences = new Map();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'POST') {
    try {
      const settings = CookieSettingsSchema.parse({
        ...req.body,
        timestamp: Date.now()
      });
      
      cookiePreferences.set(settings.userId, settings);
      
      return res.status(200).json({
        success: true,
        message: 'Cookie preferences saved'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid cookie preferences data'
      });
    }
  }

  if (req.method === 'GET') {
    const { userId } = req.query;
    if (userId) {
      const settings = cookiePreferences.get(userId);
      if (!settings) {
        return res.status(404).json({
          success: false,
          message: 'Cookie preferences not found'
        });
      }
      return res.status(200).json({
        success: true,
        data: settings
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method not allowed'
  });
}
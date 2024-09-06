import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/app/db';
import { Activity } from '@/app/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Activity[] | { message: string }>
) {
  const { goalId } = req.query;

  if (!goalId) {
    return res.status(400).json({ message: 'Goal ID is required' });
  }

  try {
    const activities = await prisma.activity.findMany({
      where: { goalId: parseInt(goalId as string) },
      orderBy: { date: 'asc' },
    });
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Failed to fetch activities' });
  }
}
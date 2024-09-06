import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/app/db';
import { Goal } from '@/app/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Goal[] | { message: string }>
) {
  const { userEmail } = req.query;

  if (!userEmail) {
    return res.status(400).json({ message: 'User email is required' });
  }

  try {
    const goals = await prisma.goal.findMany({
      where: { userId: { email: userEmail as string } },
    });
    res.status(200).json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Failed to fetch goals' });
  }
}
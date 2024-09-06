import * as z from 'zod';

export const goalSchema = z.object({
  type: z.enum(['Weight Loss', 'Muscle Gain', 'Distance Running']).nonempty(),
  target: z.number().positive(),
  startDate: z.date(),
  endDate: z.date().min(z.date().add({ days: 1 })),
});

export const activitySchema = z.object({
  type: z.enum(['Workout', 'Meal']).nonempty(),
  date: z.date(),
  duration: z.number().nonnegative(),
  intensity: z.number().nonnegative().optional(),
  calories: z.number().nonnegative().optional(),
});

export const validateGoal = (goal: any) => {
  return goalSchema.safeParse(goal);
};

export const validateActivity = (activity: any) => {
  return activitySchema.safeParse(activity);
};
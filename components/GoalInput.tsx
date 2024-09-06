import { useState } from 'react';
import { useStore } from '@/app/store';
import { Goal } from '@/app/types';
import { addGoal } from '@/app/utils/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const goalSchema = z.object({
  type: z.enum(['Weight Loss', 'Muscle Gain', 'Distance Running']).nonempty(),
  target: z.number().positive(),
  startDate: z.date(),
  endDate: z.date().min(z.date().add({ days: 1 })),
});

interface GoalInputProps {}

const GoalInput: React.FC<GoalInputProps> = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Goal>({
    resolver: zodResolver(goalSchema),
  });

  const addGoalToStore = useStore((state) => state.addGoal);

  const onSubmit = async (data: Goal) => {
    try {
      const newGoal = await addGoal(data);
      addGoalToStore(newGoal);
      reset();
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Goal Type
        </label>
        <select
          {...register('type')}
          id="type"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Distance Running">Distance Running</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="target" className="block text-sm font-medium text-gray-700">
          Target
        </label>
        <input
          {...register('target')}
          type="number"
          id="target"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your target"
        />
        {errors.target && (
          <p className="text-red-500 text-xs mt-1">{errors.target.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
          Start Date
        </label>
        <input
          {...register('startDate')}
          type="date"
          id="startDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.startDate && (
          <p className="text-red-500 text-xs mt-1">{errors.startDate.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <input
          {...register('endDate')}
          type="date"
          id="endDate"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.endDate && (
          <p className="text-red-500 text-xs mt-1">{errors.endDate.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-indigo-800"
      >
        Add Goal
      </button>
    </form>
  );
};

export default GoalInput;
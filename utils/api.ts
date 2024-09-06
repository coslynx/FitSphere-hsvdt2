import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/db";
import { Goal } from "@/app/types";
import { getUser } from "./auth";
import { validateGoal } from "./validation";

export const getGoals = async (userEmail: string) => {
  try {
    const goals = await prisma.goal.findMany({
      where: { userId: { email: userEmail } },
    });
    return goals;
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw new Error("Failed to fetch goals");
  }
};

export const addGoal = async (goal: Goal) => {
  try {
    const user = await getUser(goal.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const validationResult = validateGoal(goal);
    if (!validationResult.success) {
      throw new Error(validationResult.error.message);
    }

    const newGoal = await prisma.goal.create({
      data: {
        ...goal,
        userId: user.id,
      },
    });

    return newGoal;
  } catch (error) {
    console.error("Error adding goal:", error);
    throw new Error("Failed to add goal");
  }
};

export const getActivities = async (goalId: number) => {
  try {
    const activities = await prisma.activity.findMany({
      where: { goalId },
      orderBy: { date: "asc" },
    });
    return activities;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw new Error("Failed to fetch activities");
  }
};

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

export const updateGoal = async (goalId: number, goal: Goal) => {
  try {
    const validationResult = validateGoal(goal);
    if (!validationResult.success) {
      throw new Error(validationResult.error.message);
    }

    const updatedGoal = await prisma.goal.update({
      where: { id: goalId },
      data: { ...goal },
    });

    return updatedGoal;
  } catch (error) {
    console.error("Error updating goal:", error);
    throw new Error("Failed to update goal");
  }
};

export const deleteGoal = async (goalId: number) => {
  try {
    await prisma.goal.delete({
      where: { id: goalId },
    });
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw new Error("Failed to delete goal");
  }
};

export const logActivity = async (activity: any) => {
  try {
    const user = await getUser(activity.userId);
    if (!user) {
      throw new Error("User not found");
    }

    const goal = await prisma.goal.findUnique({
      where: { id: activity.goalId },
    });
    if (!goal) {
      throw new Error("Goal not found");
    }

    const newActivity = await prisma.activity.create({
      data: {
        ...activity,
        userId: user.id,
        goalId: goal.id,
      },
    });

    return newActivity;
  } catch (error) {
    console.error("Error logging activity:", error);
    throw new Error("Failed to log activity");
  }
};

export const updateActivity = async (activityId: number, activity: any) => {
  try {
    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: { ...activity },
    });

    return updatedActivity;
  } catch (error) {
    console.error("Error updating activity:", error);
    throw new Error("Failed to update activity");
  }
};

export const deleteActivity = async (activityId: number) => {
  try {
    await prisma.activity.delete({
      where: { id: activityId },
    });
  } catch (error) {
    console.error("Error deleting activity:", error);
    throw new Error("Failed to delete activity");
  }
};
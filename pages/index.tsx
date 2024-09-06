import { useSession } from "next-auth/react";
import { useStore } from "@/app/store";
import { getUserGoals } from "@/app/utils/api";
import { useEffect, useState } from "react";
import { Goal } from "@/app/types";
import GoalInput from "@/components/GoalInput";
import ProgressChart from "@/components/ProgressChart";
import { Button } from "@/components/Button";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const fetchGoals = useStore((state) => state.fetchGoals);

  useEffect(() => {
    const fetchUserGoals = async () => {
      try {
        if (session?.user?.email) {
          const userGoals = await getUserGoals(session.user.email);
          fetchGoals(userGoals);
          setGoals(userGoals);
        }
      } catch (error) {
        console.error("Error fetching user goals:", error);
      }
    };

    fetchUserGoals();
  }, [session]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Your Fitness Dashboard
      </h1>
      <div className="mb-6">
        <GoalInput />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {goal.type}
            </h2>
            <p className="text-gray-600 mb-4">
              Target: {goal.target}{" "}
              {goal.type === "Distance Running" ? "km" : ""}
            </p>
            <ProgressChart goalId={goal.id} />
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => {
                // TODO: Implement functionality to edit a goal
              }}
            >
              Edit Goal
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
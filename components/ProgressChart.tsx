import { useState, useEffect } from 'react';
import { Line } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { useStore } from '@/app/store';
import { Activity } from '@/app/types';
import { getActivities } from '@/app/utils/api';

Chart.register(...registerables);

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ goalId }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [chartInstance, setChartInstance] = useState<Line | null>(null);

  const goal = useStore((state) => state.goals.find((g) => g.id === goalId));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivities(goalId);
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (goalId) {
      fetchData();
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [goalId]);

  useEffect(() => {
    if (activities.length > 0 && goal) {
      const canvas = document.getElementById('progressChart') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const chart = new Line(ctx, {
          data: {
            labels: activities.map((activity) => activity.date.toLocaleDateString()),
            datasets: [
              {
                label: 'Progress',
                data: activities.map((activity) => activity.duration),
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                pointRadius: 4,
                fill: false,
              },
              {
                label: 'Goal Target',
                data: new Array(activities.length).fill(goal.target),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                borderDash: [5, 5],
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: goal.type,
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
            },
          },
        });
        setChartInstance(chart);
      }
    }
  }, [activities, goal]);

  return (
    <div className="p-4 rounded-lg shadow-md">
      <canvas id="progressChart" height={300} />
    </div>
  );
};

export default ProgressChart;
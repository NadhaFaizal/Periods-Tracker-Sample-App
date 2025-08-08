
import React from 'react';
import { ChartBarIcon, CalendarIcon } from './Icons';

interface DashboardProps {
    averageCycleLength: number;
    predictedNextStartDate: Date | null;
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; description: string }> = ({ icon, title, value, description }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg flex items-start space-x-4">
        <div className="bg-light p-3 rounded-full text-primary">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-dark">{value}</p>
            <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ averageCycleLength, predictedNextStartDate }) => {
    const formattedPrediction = predictedNextStartDate 
        ? predictedNextStartDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })
        : 'N/A';
    
    const predictionYear = predictedNextStartDate ? `, ${predictedNextStartDate.getFullYear()}` : '';

    return (
        <div className="space-y-6">
            <StatCard 
                icon={<ChartBarIcon className="h-6 w-6" />}
                title="Average Cycle"
                value={`${averageCycleLength} days`}
                description="Based on your history"
            />
            <StatCard 
                icon={<CalendarIcon className="h-6 w-6" />}
                title="Predicted Next Period"
                value={formattedPrediction}
                description={`Around this day${predictionYear}`}
            />
        </div>
    );
};

export default Dashboard;

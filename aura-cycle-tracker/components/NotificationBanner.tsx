
import React from 'react';
import { BellIcon } from './Icons';

interface NotificationBannerProps {
    predictedNextStartDate: Date | null;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ predictedNextStartDate }) => {
    if (!predictedNextStartDate) {
        return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    const nextDate = new Date(predictedNextStartDate);
    nextDate.setHours(0, 0, 0, 0); // Normalize to start of day

    const diffTime = nextDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0 && diffDays <= 2) {
        const message = diffDays === 0 
            ? "Your next period is predicted to start today." 
            : `Your next period is predicted in ${diffDays} day${diffDays > 1 ? 's' : ''}.`;
        
        return (
            <div className="bg-pink-100 border-l-4 border-secondary text-secondary p-4 rounded-md shadow-sm mb-8" role="alert">
                <div className="flex items-center">
                    <BellIcon className="h-6 w-6 mr-3" />
                    <div>
                        <p className="font-bold">Heads up!</p>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default NotificationBanner;

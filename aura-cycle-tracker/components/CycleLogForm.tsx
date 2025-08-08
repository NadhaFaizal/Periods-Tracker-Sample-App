
import React, { useState } from 'react';
import { PlusIcon } from './Icons';

interface CycleLogFormProps {
    addCycle: (date: Date) => void;
}

const CycleLogForm: React.FC<CycleLogFormProps> = ({ addCycle }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (date) {
            const localDate = new Date(date);
            // Adjust for timezone offset
            const timezoneOffset = localDate.getTimezoneOffset() * 60000;
            const utcDate = new Date(localDate.getTime() + timezoneOffset);
            addCycle(utcDate);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
            <h3 className="font-bold text-lg text-dark mb-4">Log a New Period</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="flex-grow">
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-600 mb-1">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="start-date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition"
                        max={new Date().toISOString().split('T')[0]} // Cannot select future dates
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span>Add</span>
                </button>
            </form>
        </div>
    );
};

export default CycleLogForm;


import React from 'react';
import type { Cycle } from '../types';
import { CalendarIcon, TrashIcon } from './Icons';

interface CycleHistoryListProps {
    cycles: Cycle[];
    deleteCycle: (id: string) => void;
}

const CycleHistoryList: React.FC<CycleHistoryListProps> = ({ cycles, deleteCycle }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg h-full">
            <h3 className="font-bold text-lg text-dark mb-4">Cycle History</h3>
            {cycles.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300"/>
                    <p>No periods logged yet.</p>
                    <p className="text-sm">Use the form to add your first one!</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                    {cycles.map((cycle, index) => {
                        const startDate = new Date(cycle.startDate);
                        const prevStartDate = index < cycles.length - 1 ? new Date(cycles[index + 1].startDate) : null;
                        
                        let cycleLength = null;
                        if (prevStartDate) {
                            const diffTime = startDate.getTime() - prevStartDate.getTime();
                            cycleLength = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        }

                        return (
                            <div key={cycle.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-light transition group">
                                <div className="flex items-center space-x-3">
                                    <CalendarIcon className="h-5 w-5 text-primary"/>
                                    <span className="font-medium text-gray-700">
                                        {startDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {cycleLength && (
                                        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">{cycleLength} days</span>
                                    )}
                                    <button 
                                        onClick={() => deleteCycle(cycle.id)}
                                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                        aria-label="Delete cycle"
                                    >
                                        <TrashIcon className="h-5 w-5"/>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default CycleHistoryList;

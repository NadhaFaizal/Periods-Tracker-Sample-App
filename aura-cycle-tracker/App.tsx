
import React from 'react';
import { useCycleData } from './hooks/useCycleData';
import Dashboard from './components/Dashboard';
import CycleLogForm from './components/CycleLogForm';
import CycleHistoryList from './components/CycleHistoryList';
import NotificationBanner from './components/NotificationBanner';

function App() {
    const { cycles, addCycle, deleteCycle, averageCycleLength, predictedNextStartDate } = useCycleData();

    return (
        <div className="min-h-screen bg-light text-gray-800 font-sans">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.975.435-.975.975v.038c0 .448.33.834.757.944C10.015 10.32 10 10.414 10 10.5c0 .552.448 1 1 1s1-.448 1-1c0-.086-.015-.171-.038-.252.427-.11.757-.507.757-.944v-.038c0-.54-.435-.975-.975-.975h-.375a.75.75 0 0 1-.75-.75V6.75a.75.75 0 0 1 .75-.75h.375c.54 0 .975-.435.975-.975v-.038c0-.448-.33-.834-.757-.944C13.985 4.68 14 4.586 14 4.5c0-.552-.448-1-1-1s-1 .448-1 1c0 .086.015.171.038.252-.427.11-.757.507-.757.944v.038c0 .54.435.975.975.975h.375a.75.75 0 0 1 .75.75v.25a.75.75 0 0 1-.75.75h-.375Zm-.375 3.75a.75.75 0 0 1 .75-.75h.375c.54 0 .975-.435.975-.975v-.038c0-.448-.33-.834-.757-.944C13.985 10.68 14 10.586 14 10.5c0-.552-.448-1-1-1s-1 .448-1 1c0 .086.015.171.038.252-.427.11-.757.507-.757.944v.038c0 .54.435.975.975.975h.375a.75.75 0 0 1 .75.75v.25a.75.75 0 0 1-.75.75h-3.375a.75.75 0 0 1-.75-.75v-.25a.75.75 0 0 1 .75-.75h.375c.54 0 .975-.435.975-.975v-.038c0-.448-.33-.834-.757-.944C7.015 13.32 7 13.414 7 13.5c0 .552.448 1 1 1s1-.448 1-1c0-.086-.015-.171-.038-.252.427-.11.757-.507.757-.944v-.038c0-.54-.435-.975-.975-.975h-.375a.75.75 0 0 1-.75-.75v-.25a.75.75 0 0 1 .75-.75h.375Zm8.375 2.25a.75.75 0 0 1 .75-.75h.375c.54 0 .975-.435.975-.975v-.038c0-.448-.33-.834-.757-.944C18.985 13.68 19 13.586 19 13.5c0-.552-.448-1-1-1s-1 .448-1 1c0 .086.015.171.038.252-.427.11-.757.507-.757.944v.038c0 .54.435.975.975.975h.375a.75.75 0 0 1 .75.75v.25a.75.75 0 0 1-.75.75h-.375c-.54 0-.975.435-.975.975v.038c0 .448.33.834.757.944c.863.224.757.906.757 1.268v.038c0 .54-.435.975-.975.975h-.375a.75.75 0 0 1-.75-.75v-.25a.75.75 0 0 1 .75-.75h.375Z" clipRule="evenodd" />
                    </svg>
                    <h1 className="text-xl font-bold text-dark">Aura Cycle Tracker</h1>
                </div>
            </header>
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <NotificationBanner predictedNextStartDate={predictedNextStartDate} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-8">
                        <Dashboard 
                            averageCycleLength={averageCycleLength} 
                            predictedNextStartDate={predictedNextStartDate} 
                        />
                        <CycleLogForm addCycle={addCycle} />
                    </div>
                    <div className="lg:col-span-2">
                        <CycleHistoryList cycles={cycles} deleteCycle={deleteCycle} />
                    </div>
                </div>
            </main>
            <footer className="text-center py-4 text-xs text-gray-400">
                <p>Designed for you with ♡</p>
            </footer>
        </div>
    );
}

export default App;

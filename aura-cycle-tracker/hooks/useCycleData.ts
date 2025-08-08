
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Cycle } from '../types';

const STORAGE_KEY = 'auraCycleTrackerData';
const DEFAULT_CYCLE_LENGTH = 28;

const getDaysBetween = (dateStr1: string, dateStr2: string): number => {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const useCycleData = () => {
    const [cycles, setCycles] = useState<Cycle[]>([]);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(STORAGE_KEY);
            if (storedData) {
                const parsedData: Cycle[] = JSON.parse(storedData);
                // Sort by date descending on load
                parsedData.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
                setCycles(parsedData);
            }
        } catch (error) {
            console.error("Failed to load or parse cycle data from localStorage", error);
            setCycles([]);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
        } catch (error) {
            console.error("Failed to save cycle data to localStorage", error);
        }
    }, [cycles]);

    const addCycle = useCallback((startDate: Date) => {
        const newCycle: Cycle = {
            id: new Date().toISOString() + Math.random(),
            startDate: startDate.toISOString(),
        };
        setCycles(prevCycles => {
            const updatedCycles = [...prevCycles, newCycle];
            updatedCycles.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
            return updatedCycles;
        });
    }, []);

    const deleteCycle = useCallback((id: string) => {
        setCycles(prevCycles => prevCycles.filter(cycle => cycle.id !== id));
    }, []);

    const averageCycleLength = useMemo(() => {
        if (cycles.length < 2) {
            return DEFAULT_CYCLE_LENGTH;
        }
        const lengths: number[] = [];
        for (let i = 0; i < cycles.length - 1; i++) {
            const length = getDaysBetween(cycles[i].startDate, cycles[i+1].startDate);
            // Ignore outliers that might be due to missed logs
            if (length > 15 && length < 60) {
                 lengths.push(length);
            }
        }
        if(lengths.length === 0) return DEFAULT_CYCLE_LENGTH;
        const total = lengths.reduce((acc, curr) => acc + curr, 0);
        return Math.round(total / lengths.length);
    }, [cycles]);

    const predictedNextStartDate = useMemo(() => {
        if (cycles.length === 0) {
            return null;
        }
        const lastStartDate = new Date(cycles[0].startDate);
        const predictedDate = new Date(lastStartDate);
        predictedDate.setDate(predictedDate.getDate() + averageCycleLength);
        return predictedDate;
    }, [cycles, averageCycleLength]);

    return { cycles, addCycle, deleteCycle, averageCycleLength, predictedNextStartDate };
};

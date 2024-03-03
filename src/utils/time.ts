import { startOfDay, endOfDay, format } from 'date-fns';

export function getStartAndEndOfDay(date: Date = new Date()): { start: string, end: string } {
    // Get the start of the day
    const start = startOfDay(date);

    // Get the end of the day
    const end = endOfDay(date);

    // Format dates to the required string format (e.g., "2010-11-10T03:07:43")
    const formattedStart = format(start, "yyyy-MM-dd'T'HH:mm:ss");
    const formattedEnd = format(end, "yyyy-MM-dd'T'HH:mm:ss");

    return { start: formattedStart, end: formattedEnd };
}
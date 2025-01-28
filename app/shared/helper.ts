


export const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
        return description;
    } else {
        return description.substring(0, maxLength) + '...';
    }
};

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        weekday: 'long', // e.g., 'Monday'
        year: 'numeric', // e.g., 2024
        month: 'long', // e.g., 'July'
        day: 'numeric', // e.g., 11
        hour: 'numeric', // e.g., 9 AM
        minute: 'numeric', // e.g., 54
        second: 'numeric', // e.g., 11
        hour12: true // 12-hour clock
    });
}
export function formatDate(dateString: string, locale: string): string {
    return new Date(dateString).toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}
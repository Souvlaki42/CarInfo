export function formatDate(dateString: string, locale: string): string {
    return new Date(dateString).toLocaleString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    });
}

export function getLocaleFromLanguage(language: string) {
    if (language === "gr") return "el-GR";
    else return "en-US";
}
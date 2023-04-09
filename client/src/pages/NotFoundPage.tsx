import { useTranslation } from "react-i18next";

export const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <p>404 - {t("Page not found")}</p>
        </div>
    );
}
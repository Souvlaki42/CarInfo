import { useTranslation } from "react-i18next";

export const PrivacyPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            <p>{t("We care about your privacy. Promise!")}</p>
        </div>
    );
}
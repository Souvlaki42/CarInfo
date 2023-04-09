import { useTranslation } from "react-i18next";

export const NotesPageLoggedOutView = () => {
	const { t } = useTranslation();
	return <p>{t("Please login to see your notes")}</p>;
};

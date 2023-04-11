import { useTranslation } from "react-i18next";

export const CarsPageLoggedOutView = () => {
	const { t } = useTranslation();
	return <p>{t("Please login to see your cars")}</p>;
};

import { useState } from "react";
import { Alert } from "react-bootstrap";

interface DismissibleAlertProps {
	text: string;
	variant: string;
}

export const DismissibleAlert = ({ text, variant }: DismissibleAlertProps) => {
    const [showAlert, setShowAlert] = useState(true);
	return <Alert dismissible show={showAlert} variant={variant} onClose={() => setShowAlert(false)}>{text}</Alert>;
};

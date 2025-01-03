import { Props } from "../../../types";

export interface EmailFormProps extends Props {
	onEmailSent: (email: {
		id: number;
		recipient: string;
		subject: string;
	}) => void;
}

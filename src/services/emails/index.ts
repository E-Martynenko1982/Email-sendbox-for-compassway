import axiosClient from "../axiosClient";

export const sendEmail = async (
	senderId: number,
	recipient: string,
	subject: string,
	message: string
) => {
	return axiosClient.post("/emails/", {
		sender: senderId,
		recipient,
		subject,
		message,
	});
};

export const getSentEmails = async (page: number) => {
	return axiosClient.get("/emails/", {
		params: {
			page: page,
		},
	});
};

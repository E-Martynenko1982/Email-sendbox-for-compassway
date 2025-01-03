export type EmailItem = {
	id: number;
	recipient: string;
	subject: string;
};

export type EmailTableProps = {
	emails: EmailItem[];
};

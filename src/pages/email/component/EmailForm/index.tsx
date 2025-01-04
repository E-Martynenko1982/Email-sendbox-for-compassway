import React, { useState } from "react";
import { sendEmail } from "../../../../services";
import { TextEditor } from "../TextEditor";
import * as Styled from "./index.styled";
import { EmailFormProps } from "./types";

const EmailForm: React.FC<EmailFormProps> = ({ user, onEmailSent }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted");
    try {
      const response = await sendEmail(user.id, recipient, subject, message);
      console.log("Email Sent:", response.data);
      alert('Email sent successfully!');
      setRecipient("");
      setSubject("");
      setMessage("");
      onEmailSent(response.data);
    } catch (error) {
      console.error(error);
      alert('Sending email failed. Please try again.')
    }
  }

  return (
    <Styled.FormContainer
      onSubmit={handleSend}
      as="form"
    >
      <Styled.RegisterTitle gutterBottom>
        Write a mail please
      </Styled.RegisterTitle>
      <div>
        <label>Sender:</label>
        <span> {user.email}</span>
      </div>
      <Styled.FormInputRecipient
        value={recipient}
        type="email"
        label="Recipient:"
        onChange={(e) => setRecipient(e.target.value)}
        required
        fullWidth
      />
      <Styled.FormInputSubject
        label="Subject"
        type="text"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        fullWidth
      />
      <div>
        <label>Text:</label>
        <TextEditor
          htmlText={message}
          onChangeHTMLText={(val) => setMessage(val)}
          placeholder="Write your message here..."
        />
      </div>

      <Styled.FormButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Send
      </Styled.FormButton>
    </Styled.FormContainer>
  )
}

export default EmailForm;
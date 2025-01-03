import React, { useState } from "react";
import { Props } from "../../types";
import { sendEmail } from "../../../../services";
import RichTextEditor from "../RichTestEditor";
import * as Styled from "./index.styled";

const EmailForm: React.FC<Props> = ({ user }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendEmail(user.id, recipient, subject, message);
      alert('Email sent successfully!');
      setRecipient("");
      setSubject("");
      setMessage("");
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
        onChange={(e) => setRecipient((e.target as HTMLInputElement).value)}
        required
        fullWidth
      />
      <Styled.FormInputSubject
        label="Subject"
        type="text"
        variant="outlined"
        value={subject}
        onChange={(e) => setSubject((e.target as HTMLInputElement).value)}
        required
        fullWidth
      />
      <div>
        <label>Text:</label>
        <RichTextEditor value="text" onChange={(val) => setMessage(val)} />
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
import { useEffect, useState } from 'react'
import { EmailItem } from './types';
import { getSentEmails } from '../../../../services';


const EmailTable = () => {
  const [emails, setEmails] = useState<EmailItem[]>([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);

  const fetchEmails = async (pageNumber: number) => {
    try {
      const response = await getSentEmails(pageNumber)

      setEmails(response.data.results)
      setCount(response.data.count)
      setNext(response.data.next)
      setPrev(response.data.previous)
    } catch (error) {
      console.error(error);
      alert('Could not fetch emails.');
    }
  }

  useEffect(() => {
    fetchEmails(page)
  }, [page]);

  const handleNext = () => {
    if (next) {
      setPage(page + 1)
    }
  };

  const handlePrev = () => {
    if (prev && page > 1) {
      setPage(page - 1)
    }
  };

  return (
    <div>
      <h2>Sent Emails</h2>
      <p>Total emails: {count}</p>
      <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id}>
              <td>{email.id}</td>
              <td>{email.recipient}</td>
              <td>{email.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px' }}>
        <button onClick={handlePrev} disabled={!prev}>Previous</button>
        <span style={{ margin: '0 10px' }}>Page: {page}</span>
        <button onClick={handleNext} disabled={!next}>Next</button>
      </div >
    </div >
  )
}

export default EmailTable;
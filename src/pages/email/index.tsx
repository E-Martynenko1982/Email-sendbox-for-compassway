import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "./types";
import { getCurrentUser, clearCredentials } from "../../services";
import EmailForm from "./component/EmailForm";
import EmailTable from "./component/EmailTable";
import * as Styled from "./index.styled";

const EmailPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);

        alert("You are not authorized. Please log in.");
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);
  const handleLogout = () => {
    clearCredentials();
    navigate("/login");
  };
  if (!currentUser) return <div>Loading user info...</div>;
  return (
    <Styled.EmailPageContainer>
      <div>
        <p>
          <strong>User name:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
      </div>
      <Styled.EmailPageButtons variant="contained" onClick={handleLogout}>Logout</Styled.EmailPageButtons>
      <div>
        <Styled.EmailPageButtons variant="contained" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Hide form" : "Send Email"}
        </Styled.EmailPageButtons>
        {showForm && <EmailForm user={currentUser} />}
      </div>
      <hr />
      <EmailTable />
    </Styled.EmailPageContainer>
  );
};

export default EmailPage;

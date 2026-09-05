import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

function Logoff() {
  const { logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  const handleLogoff = async () => {
    setIsLoggingOff(true);
    setLogoutError("");

    const result = await logout();

    if (!result.success) {
      setLogoutError(result.error);
    }

    setIsLoggingOff(false);
  };

  return (
    <>
      <button type="button" onClick={handleLogoff} disabled={isLoggingOff}>
        {isLoggingOff ? "Logging off..." : "Log Off"}
      </button>

      {logoutError && <p>{logoutError}</p>}
    </>
  );
}

export default Logoff;

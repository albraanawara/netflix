import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Component = () => {
  const { user, users } = useContext(AuthContext);


  return (
    <div>
      <h1>Welcome {user?.name || "Guest"}</h1>

      <p>{user?.email}</p>
    </div>
  );
}

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Component() {
  const { user, users } = useContext(AuthContext);

  // console.log("Current User in Home:", user);
  // console.log("All Users in Home:", users);
  return (
    <div>
      <h1>Welcome {user?.name || "Guest"}</h1>

      <p>{user?.email}</p>
    </div>
  );
}

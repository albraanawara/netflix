import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Component = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/movies", { replace: true });
  }, [navigate]);

  return null;
}

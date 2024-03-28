import { redirect } from "react-router-dom";

export const action = () => {
  localStorage.removeItem("currentUser");
  return redirect("/login");
};

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notification = (
  msg: string,
  type: "warn" | "success" | "error" | "info"
) => {
  if (type === "warn")
    toast.warn(msg, {
      className: "border border-yellow-600",
    });
  else if (type === "success")
    toast.success(msg, {
      className: "border border-green-600",
    });
  else if (type === "error")
    toast.error(msg, {
      className: "border border-red-600",
    });
  else if (type === "info")
    toast.info(msg, {
      className: "border border-blue-600",
    });
};
export default notification;

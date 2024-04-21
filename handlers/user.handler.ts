import { userType } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";

export async function createUser(user: userType) {
  const { data } = await axiosInstance.post("user/create", user);
  console.log(
    `%c daata `,
    "color: white;border:3px solid white;margin:5px",
    data
  );
  return data;
}

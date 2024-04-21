import { userType } from "@/store/store";
import axiosInstance from "@/utils/axiosInstance";

export async function createUser(user: userType) {
  const { data } = await axiosInstance.post("user/create", user);
  return data;
}
export async function updateUser(user: userType) {
  const { data } = await axiosInstance.put(`user/update/${user.pk}`, user);
  return data;
}

import { useAuthState } from "@/store/authSlice";

const useUser = () => {
  const { user } = useAuthState();

  if (!user) {
    throw new Error("User is not defined");
  }

  return {
    user,
  };
};

export default useUser;

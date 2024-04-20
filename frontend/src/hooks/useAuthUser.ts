import { useAuthState } from "@/store/authSlice";

const useAuthUser = () => {
  const { user } = useAuthState();

  return {
    user,
  };
};

export default useAuthUser;

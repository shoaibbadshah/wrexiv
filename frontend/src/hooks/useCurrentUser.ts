import { useMeQuery } from "@/graphql/generated";

const useCurrentUser = () => {
  const { data, refetch } = useMeQuery();
  const user = data?.user;
  return {
    user,
    refetch,
  };
};

export default useCurrentUser;

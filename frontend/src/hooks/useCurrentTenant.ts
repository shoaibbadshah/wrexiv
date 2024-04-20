import { useMyTenantUserQuery } from "@/graphql/generated";

const useCurrentTenantUser = () => {
  const { data, loading, refetch, error } = useMyTenantUserQuery();
  const tenantUser = data?.tenantUser;

  const isInitialized = !loading && tenantUser;

  return {
    tenantUser,
    loading,
    isInitialized,
    refetch,
  };
};

export default useCurrentTenantUser;

import { useGetAdminUserQuery } from "@/graphql/generated";

type PropsType = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: PropsType) => {
  const { data } = useGetAdminUserQuery();
  console.log(data);

  return (
    <div>
      <div>admin</div>
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;

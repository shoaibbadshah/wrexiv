type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return <div className="mt-8 flex justify-center">{children}</div>;
};

export default AuthLayout;

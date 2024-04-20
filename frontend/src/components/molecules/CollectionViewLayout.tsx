import LoadingRings from "../atoms/LoadingRings";

type PropsType = {
  navigation: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
};

const CollectionViewLayout = ({ navigation, children, loading }: PropsType) => {
  return (
    <div className="m-4 grow flex flex-col space-y-4 overflow-hidden">
      <div className="">{navigation}</div>
      {loading ? <LoadingRings /> : children}
    </div>
  );
};

export default CollectionViewLayout;

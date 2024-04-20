import { signInWithGoogle } from "@/lib/firebase";

const ProviderAuthButtons = () => {
  return (
    <div>
      <button className="btn w-full" onClick={() => signInWithGoogle()}>
        Google Sign In
      </button>
    </div>
  );
};

export default ProviderAuthButtons;

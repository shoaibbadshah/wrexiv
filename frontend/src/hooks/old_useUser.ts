import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const useUser = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const asyncFetchUser = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.getUser();
    console.log(error);

    if (error) {
      setLoading(false);
      setError(error.message);
      // throw error;
    }

    if (data.user) {
      setUser(data.user);
    }
    setLoading(false);
  };

  useEffect(() => {
    asyncFetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;

// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  // Redirect to the first page when the user lands on the homepage
  useEffect(() => {
    router.push("/1");
  }, [router]);

  return <div>Loading...</div>;
};

export default Home;

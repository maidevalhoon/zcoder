import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const auth = (Component) => {
  const Auth = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = window.sessionStorage.getItem("token");
      if (!token) {
        router.push("/user/login");
      } else {
        axios
          .get("https://zcoder-zac7.onrender.com/api/getAuth", {
            headers: {
                'Authorization': `${token}`,
            },
          })
          .then((response) => {
            setLoading(false);
          })
          .catch((error) => {
            router.push("/user/login");
          });
      }
    }, [router]);

    if (loading) {
      return (<h1>Loading...</h1>);
    }

    return (<Component {...props} />);
  };

  return Auth;
};
export default auth;

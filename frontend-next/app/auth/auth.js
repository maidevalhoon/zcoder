import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const auth = (Component) => {
  const Auth = (props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const token = window.localStorage.getItem("token");
      if (!token) {
        router.push("/user/login");
      } else {
        axios
          .get("http://localhost:5050/api/getAuth", {
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
    }, []);

    if (loading) {
      return (<h1>Loading...</h1>);
    }

    return (<Component {...props} />);
  };

  return Auth;
};
export default auth;

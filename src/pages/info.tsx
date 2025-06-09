import { useEffect } from "react";
import { getData } from "../util/api.js";

export default function Info() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
    };

    fetchData();
  }, []);

  return <div></div>;
}

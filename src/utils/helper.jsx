import { axiosFetch } from "./axios";
import { useEffect } from "react";

export function checkMissingInputs(inputs) {
  for (const key in inputs) {
    if (!inputs[key]) {
      throw new Error("Please fill out all fields!");
    }
  }
}

export async function useFetchAllWorks(setData, filter = "") {

  useEffect(() => {
    const fetchData = async () => {

      try {
        let data = (await axiosFetch("/freelancer/works")).data["Freelancer works"];

        if (filter) {
          data = data.filter((work) => {
            return work.f_work === filter;
          });
        }

        setData(data);

      } catch (error) {
        throw new Error(error.message);
      }
    }
    fetchData();

  }, [])
}

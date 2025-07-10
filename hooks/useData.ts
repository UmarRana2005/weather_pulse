import apiClient from "@/lib/apiClient";
import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  dep?: string
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get(endpoint, { signal: controller.signal, ...requestConfig })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  }, [dep]);
  return { data, error, isLoading };
};

export default useData;

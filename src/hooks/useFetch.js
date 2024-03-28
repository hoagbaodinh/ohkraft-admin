import { useEffect, useState } from 'react';
import axios from 'axios';
const useFetch = (url, option) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const http = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${http}/api/${url}`, option || {});
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${http}/api/${url}`);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;

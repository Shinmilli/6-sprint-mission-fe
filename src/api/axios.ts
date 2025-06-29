import axiosLib from "axios";
import NProgress from "nprogress";
import { clearTokens, getTokens, setTokens } from "../utils/authToken";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function omitEmptyParams(params: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== "" || typeof value === "undefined")
  );
}

const axios = axiosLib.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axios.interceptors.request.use(
  function (config) {
    NProgress.start();

    // 빈 쿼리 파라미터는 생략해서 보낸다.
    // 예를 들면 keyword 값이 ""인 경우 `keyword=`라는 쿼리를 보내지 않는다.
    config.params = omitEmptyParams(config.params ?? {});

    const { accessToken } = getTokens();
     if (accessToken) {
      config.headers?.set?.("Authorization", `Bearer ${accessToken}`);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    NProgress.done();
    if (response.data?.accessToken && response.data?.refreshToken) {
      const { accessToken, refreshToken } = response.data;
      setTokens({ accessToken, refreshToken });
    }
    return response;
  },
  function (error) {
    NProgress.done();
    if (error.response?.status === 401) {
      clearTokens();
    }

    const responseData = error.response?.data;
    if (!!responseData?.message) {
      return Promise.reject(new Error(responseData.message));
    }

    return Promise.reject(new Error("알 수 없는 오류입니다"));
  }
);

export default axios;

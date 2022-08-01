import service from "@/service";

/**
 * 登录
 */
export const loginUser = (data: any) => {
  return service({
    url: "/sys/login",
    method: "POST",
    data,
  });
};

/**
 * 获取用户信息
 */
export const getProfile = (data?: any) => {
  return service({
    url: "/sys/profile",
    data,
  });
};

/**
 * 注册
 */
export const registerUser = (data: any) => {
  return service({
    url: "/sys/register",
    method: "POST",
    data,
  });
};

/**
 * 获取 OSS 上传凭证
 */
export const getSts = () => {
  return service({
    url: "/sys/sts",
    method: "POST",
  });
};

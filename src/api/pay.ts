import service from "@/service";

export const getVipPayList = (data?: any) => {
  return service({
    url: "/pay/list",
    data,
  });
};

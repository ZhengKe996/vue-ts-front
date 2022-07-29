import service from "@/service";

export const getPexels = () => {
  return service({ url: "/pexels/list" });
};

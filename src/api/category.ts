import service from "@/service";

export const getCategory = () => {
  return service({ url: "/category" });
};

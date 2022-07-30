import service from "@/service";

export const getPexels = () => {
  return service({ url: "/pexels/list" });
};
export const getHint = (q: string) => {
  return service({ url: "/pexels/hint", params: { keyword: q } });
};
export const getThemes = () => {
  return service({ url: "/pexels/themes" });
};

export const getPexelsFromId = (id: number | string) => {
  return service({
    url: `/pexels/${id}`,
  });
};

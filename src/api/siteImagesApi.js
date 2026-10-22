
import api from "./axiosInstance";

export const getSiteImages = () => {
  return api.get("/admin/site-images");
};

export const updateSiteImage = (slot, data) => {
  return api.put(
    `/admin/site-images/${encodeURIComponent(slot)}`,
    data
  );
};

export const deleteSiteImage = (slot) => {
  return api.delete(
    `/admin/site-images/${encodeURIComponent(slot)}`
  );
};

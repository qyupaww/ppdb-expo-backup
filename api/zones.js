import api from "@/api/api";

export const getProvinces = async (search) => {
  const response = await api.get("/zones/provinces", { params: { search } });
  return response.data;
};

export const getRegencies = async (search, provinceId) => {
  const response = await api.get("/zones/regencies", {
    params: { search, provinceId },
  });
  return response.data;
};

export const getDistricts = async (search, regencyId) => {
  const response = await api.get("/zones/districts", {
    params: { search, regencyId },
  });
  return response.data;
};

export const getVillages = async (search, districtId) => {
  const response = await api.get("/zones/villages", {
    params: { search, districtId },
  });

  return response.data;
};

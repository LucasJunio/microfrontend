import { api } from "../../../services/api";

const dashboardGet = async (body) => {

  const { startDate, endDate } = body;
  
  const res = await api.get(`/dashboard?startdate=${startDate.toISOString().split('T')[0]}&enddate=${endDate.toISOString().split('T')[0]}`);
  
  return res;
};

export { dashboardGet };

import { api } from "../../../services/api";

const dashboardGet = async () => {
  // const res = await api.get(`/validation/email/${token}`);
  return {
    chartCardFlag:[
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 16 }
      ],
    chartMovingAverage:[
      { x: 1, y: -3 },
      { x: 2, y: 5 },
      { x: 3, y: 3 },
      { x: 4, y: 1 },
      { x: 5, y: -2 },
      { x: 6, y: -2 },
      { x: 7, y: 5 }
    ],
    valuePeriod:"5,14",
    valueWay:"5,14"
  };
};

export { dashboardGet };

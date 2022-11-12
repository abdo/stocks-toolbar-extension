type Params = {
  startDate: Date;
  endDate: Date;
};

const getHoursDiff = ({ startDate: passedStartDate, endDate: passedEndDate }: Params) => {
  const msInHour = 1000 * 60 * 60;
  const startDate = new Date(passedStartDate);
  const endDate = new Date(passedEndDate);

  return Math.round(Math.abs(endDate.valueOf() - startDate.valueOf()) / msInHour);
}

export default getHoursDiff;

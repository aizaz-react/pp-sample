import moment from 'moment';

const usePreviousData = (dataArray) => {
  const currentDate = moment();

  function isBetweenInclusive(dateToCheck, startDate, endDate) {
    return (
      dateToCheck.isSameOrAfter(startDate) &&
      dateToCheck.isSameOrBefore(endDate)
    );
  }

  const yesterday = currentDate.clone().subtract(1, 'day');

  const previous7DaysStart = currentDate.clone().subtract(7, 'days');
  const previous30DaysStart = currentDate.clone().subtract(30, 'days');

  const todayData = dataArray.filter((item) => {
    const itemDate = moment(item.create_ts);
    return itemDate.isSame(currentDate, 'day');
  });

  const yesterdayData = dataArray.filter((item) => {
    const itemDate = moment(item.create_ts);
    return itemDate.isSame(yesterday, 'day');
  });

  const previous7DaysData = dataArray.filter((item) => {
    const itemDate = moment(item.create_ts);
    return (
      isBetweenInclusive(itemDate, previous7DaysStart, yesterday) &&
      !yesterdayData.some((yd) => yd.conv_id === item.conv_id) &&
      !dataArray.slice(dataArray.indexOf(item) + 1).some((otherItem) => {
        const otherItemDate = moment(otherItem.create_ts);
        return (
          isBetweenInclusive(otherItemDate, previous7DaysStart, yesterday) &&
          otherItem.conv_id === item.conv_id
        );
      })
    );
  });

  const previous30DaysData = dataArray.filter((item) => {
    const itemDate = moment(item.create_ts);
    return (
      isBetweenInclusive(itemDate, previous30DaysStart, previous7DaysStart) &&
      !previous7DaysData.some((p7d) => p7d.conv_id === item.conv_id) &&
      !yesterdayData.some((yd) => yd.conv_id === item.conv_id) &&
      !dataArray.slice(dataArray.indexOf(item) + 1).some((otherItem) => {
        const otherItemDate = moment(otherItem.create_ts);
        return (
          isBetweenInclusive(
            otherItemDate,
            previous30DaysStart,
            previous7DaysStart
          ) && otherItem.conv_id === item.conv_id
        );
      })
    );
  });

  return [
    { day: 'Today', items: todayData },
    { day: 'Yesterday', items: yesterdayData },
    { day: 'Previous 7 Days', items: previous7DaysData },
    { day: 'Previous 30 Days', items: previous30DaysData }
  ];
};

export default usePreviousData;

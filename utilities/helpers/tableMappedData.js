export const tableMappedData = (completedDays) => {
  return Object.keys(completedDays)
    .map(date => {
      const items = completedDays[date].map(item => {
        const key =
          item.key === "wakeupTime"
            ? "Wake Up"
            : item.key === "bedtime"
            ? "Bed Time"
            : item.key.charAt(0).toUpperCase() + item.key.slice(1);

        return {
          key,
          value: item.value,
          select: item.select,
        };
      });

      return {
        date,
        items,
      };
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB - dateA;
    });
};

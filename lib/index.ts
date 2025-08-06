export interface DateObj {
  day: number;
  month: number;
  year: number;
}

/**
 * Generates a 7-day week calendar for any given date with configurable start day.
 *
 * This function calculates the complete week (7 consecutive days) that contains the specified date,
 * starting from the configured day of the week. Useful for building calendar widgets, scheduling
 * applications, or any time-based interfaces that need week-based navigation.
 *
 * @param {startDay} follows Date.getDay() convention
 */

export default (date: Date = new Date(), startDay: number = 1): DateObj[] => {
  const currentDate = new Date(date);
  const jsDay = currentDate.getDay();

  // Calculate how many days back we need to go to reach the start of the week
  const daysFromStart = (jsDay - startDay + 7) % 7;

  // Calculate the first day of the week
  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() - daysFromStart);

  // Generate all 7 days of the week
  const week: DateObj[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);

    week.push({
      day: day.getDate(),
      month: day.getMonth() + 1, // Convert from 0-indexed to 1-indexed month
      year: day.getFullYear(),
    });
  }

  return week;
};

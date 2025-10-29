// Date utility functions
// Single Responsibility: Handle date formatting and calculations

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

export const getToday = (): string => {
  return formatDate(new Date());
};

export const getDaysUntilNewYear = (): number => {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  return Math.ceil((newYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};

export const getWinterStartDate = (): string => {
  const now = new Date();
  return formatDate(new Date(now.getFullYear(), 9, 1)); // October 1
};

export const getDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export const isToday = (date: string): boolean => {
  return date === getToday();
};

export const isPastDate = (date: string): boolean => {
  return date < getToday();
};

export const isFutureDate = (date: string): boolean => {
  return date > getToday();
};

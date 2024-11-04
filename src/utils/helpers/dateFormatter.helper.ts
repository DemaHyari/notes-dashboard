import { format } from "date-fns";

/**
 * Formats a given date string into a specified format.
 *
 * @param date - The date string to be formatted.
 * @param formatType - The format in which the date should be returned. Defaults to 'MMM dd, yyyy hh:mm a'.
 * @returns The formatted date string.
 */
export const dateFormatter = (date: string, formatType: string = 'MMM dd, yyyy hh:mm a'): string => { 
  const dateObject = new Date(date);
  const formattedDate = format(dateObject, formatType);
  return formattedDate;
};
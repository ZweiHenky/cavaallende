import { format, parseISO } from "date-fns";

export const formatterDate = (date: string) => {

    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm:ss");
    
    return formattedDate;
}
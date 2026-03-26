import { format, parseISO } from "date-fns";

export const formatterDate = (date: string) => {

    console.log("date", date);

    const parsedDate = parseISO(date);
    const formattedDate = format(parsedDate, "dd/MM/yyyy HH:mm:ss");

    console.log("formattedDate", formattedDate);
    
    return formattedDate;
}
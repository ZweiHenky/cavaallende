export function formatterDate(date: string) {
    const dateNew = new Date(date); 
    const mexicoDate = dateNew.toLocaleString("es-MX", {
        timeZone: "America/Mexico_City"
    });

    console.log(dateNew);
    console.log(mexicoDate);

    return mexicoDate;
}
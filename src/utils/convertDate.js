export function convertDate(reportMyths) {
    reportMyths.map((x) => {
        const date = new Date(x.createdAt)
        let day = date.getDay();
        let mounth = date.getMonth();
        const year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        };

        if (mounth < 10) {
            mounth = `0${mounth}`;
        };

        const fullDate = `${day}/${mounth}/${year}`;

        x.createdAt = fullDate;
    });

    return reportMyths;
};
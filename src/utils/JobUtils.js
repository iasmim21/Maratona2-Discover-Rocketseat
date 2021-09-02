module.exports = {

    //function para calcular os dias restantes
    remainingDays(job) {

        //cálculo da quantidade de dias para realizar o projeto
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed(); //toFixed para arredondar

        //data do dia que o projeto foi cadastrado
        const createdDate = new Date(job.created_at);

        //dia do mes da data de entrega em milissegundos// getDate pega o dia
        const dueDay = createdDate.getDate() + Number(remainingDays);

        //criando a data de entrega do projeto
        const dueDate = createdDate.setDate(dueDay);

        //diferença em milissegundos da data final para a data atual , dias restantes
        const timeDiff = dueDate - Date.now();

        //tranformar um dia em milissegundos
        const dayInMs = 1000 * 60 * 60 * 24;

        //dias que faltam para a entrega //Math.floor retorna um Number arredondado para baixo
        const dayDiff = Math.ceil(timeDiff / dayInMs);

        return dayDiff
    },
    calculateBudget: (job, valueHour) => job["total-hours"] * valueHour //valor total do projeto

}
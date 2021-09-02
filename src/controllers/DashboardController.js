const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
    async index(req, res) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        //horas trabalhadas por dia dos projetos em progresso
        let jobTotalHours = 0;

        //função para atualizar os jobs com os cálculos
        const updatedJobs = jobs.map((job) => {

            //dias restantes
            const remaining = JobUtils.remainingDays(job);

            //if dia for menor ou igual a zero retorna done = encerrado
            const status = remaining <= 0 ? 'done' : "progress";

            statusCount[status] += 1;

            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours;

            return {
                ...job, //pega os valores que já estão em job
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }

        });

        //qtd de horas do Profile que quero trabalhar/dia menos a quantidade de horas/dia dos projetos em andamento/progress
        const freeHours = profile["hours-per-day"] - jobTotalHours;

        return res.render('index', { jobs: updatedJobs, profile, statusCount, freeHours })
    }
}

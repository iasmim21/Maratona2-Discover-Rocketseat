const Profile = require('../model/Profile');

module.exports = {
    async index(req, res) {
        return res.render('profile', { profile: await Profile.get() });
    },
    async update(req, res) {
        const data = req.body;

        //semanas no ano 
        const weeksPerYear = 52;

        //remover as semanas de férias, para saber quantas semnas tenho que trabalhar no mes
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;

        //total de horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

        //horas trabalhadas no mes 
        const monthlyTotalHours = weekTotalHours * weeksPerMonth;

        //valor da hora
        const valueHour = data["monthly-budget"] / monthlyTotalHours;

        const profile = await Profile.get();
        await Profile.update({
            ...profile,
            ...data,
            "value-hour": valueHour

        });

        return res.redirect('/profile');
    }
}
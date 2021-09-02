//roda uma unica vez, responsavel por criar o arquivo do db
//no bd os codigos sao passados entre crases

const Database = require('./config');

const initDb = {

    async init() {
        const db = await Database(); //inicia conexão

        //executar
        await db.exec(`
            CREATE TABLE profile(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INT,
                hours_per_day INT,
                days_per_week INT,
                vacation_per_year INT,
                value_hour INT
            )
        `);

        await db.exec(`
            CREATE TABLE job(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INT,
                total_hours INT,
                created_at DATETIME
            )
        `);

        //PARA INICIAR O PROJETO JÁ COM UM PERFIL E DOIS JOBS CADASTRADOS
        await db.run(`
            INSERT INTO profile(
                name,
                avatar,
                monthly_budget,
                hours_per_day,
                days_per_week,
                vacation_per_year,
                value_hour
            ) VALUES (
                "iasmim",
                "https://github.com/iasmim21.png",
                3000,
                5,
                5,
                4,
                75
            );
        `)

        await db.run(`
            INSERT INTO job(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Job teste",
                2,
                1,
                1617514376018
            );
        `)

        await db.run(`
            INSERT INTO job(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Job Software",
                3,
                47,
                1617514376018
            );
        `)
        await db.close(); //encerra conexão

    }
}

initDb.init();

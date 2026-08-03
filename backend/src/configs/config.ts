import dotenv from 'dotenv'; 

dotenv.config();

const configs = {
    port: Number(process.env.PORT),
    dbName: String(process.env.DB_NAME),
    dbUsername: String(process.env.DB_USERNAME),
    dbPassword: String(process.env.DB_PASSWORD),
    dbHost: String(process.env.DB_HOST),
    dbDialect: String(process.env.DB_DIALECT),
    dbPort: Number(process.env.DB_PORT),
    frontendUrl: String(process.env.FRONTEND_URL)
};

export default configs;
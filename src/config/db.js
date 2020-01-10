module.exports = {

        database: process.env.DB_DATABASE || 'wordpress',
        username: process.env.DB_USER || 'test',
        password: process.env.DB_PASSWORD || '',
        dialect: 'mysql',
        options: {
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            operatorsAliases: false,
            insecureAuth: true,
            charset: 'utf8mb4',
            pool: {
              max: 5,
              min: 0,
              idle: 10000
            }
	      }


}

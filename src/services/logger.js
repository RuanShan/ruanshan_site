import log4js from 'log4js'

const isProduction = process.env.NODE_ENV === 'production'
log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: 'logs/main.log',
            maxLogSize: 20480,
            backups: 10,
        },
        console: {
            type: 'stdout',
        },
    },
    categories: {
        development: {
            appenders: ['file', 'console'],
            level: 'all',
        },
        production: {
            appenders: ['file'],
            level: 'info',
        },
        default: {
            appenders: ['file'],
            level: 'info',
        },
    },
    pm2: isProduction

})
const logger = isProduction

        ? log4js.getLogger('production')
        : log4js.getLogger('development')

export default logger

const pstgrs_conf = {
    user: 'john',
    host: 'localhost',
    database: 'products',
    password: 'postgres',
    port: 5432
}

module.exports = {
    user: pstgrs_conf.user,
    password: pstgrs_conf.password,
    database: pstgrs_conf.database,
    host: pstgrs_conf.host
}
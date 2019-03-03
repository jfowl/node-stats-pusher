const StatsApi = require('./index.js')
function log(...args) {console.debug('[TEST]', ...args)}

async function test(){

log('Started test script...')

const api = new StatsApi('http://localhost:8080/test_server.php/', '123456')
log('Created StatsApi instance')

try {
    const hbAnswer = await api.heartbeat()
    log('Called heartbeat() -> ',hbAnswer)
} catch (heartbeatErr) {
    log('errored on heartbeat() -> ', heartbeatErr)
}

try {
    const addTotalAnswer = await api.addTotal('cmd_start')
    log('Called addTotal() -> ',addTotalAnswer)
} catch (addTotalErr) {
    log('errored on addTotal() -> ', addTotalErr)
}

try {
    const countAnswer = await api.count('unique_users', 'bob')
    log('Called count() -> ',countAnswer)
} catch (countErr) {
    log('errored on count() -> ', countErr)
}




} test()

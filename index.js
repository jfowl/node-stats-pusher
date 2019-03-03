/*
API Design:

connect(apiKey)

/addTotal?statId&count&apiKey
addTotal(statId: String, count: Int = 1)
-> Adds $count to a counter. gets a timestamp serverside

/count?statId&uid&count&apiKey
count(statId: String, uid: String, count: Int = 1)
-> Instructs the server to count uids.

/heartBeat?apiKey
hearbeat()
-> tells the server that it is alive


*/

const axios = require('axios');

async function getRequest(url, params) {
    try {
        await axios.get(url, {params})
        return true
    } catch (e) {
        console.error('[stats-pusher] getRequest failed. Axios error:', e)
        return false
    }
}

function StatsAPI(url, apiKey) {
    if (typeof apiKey !== 'string')
        throw(new Error("API Key must be a string"))
    if (typeof url !== 'string')
        throw(new Error("url must be a string"))

    const authedRequest = (method, params) => {
        const key = {apiKey}
        return getRequest(url+method, Object.assign({}, params, key))
    }

    this.addTotal = (statId, count = 1) => {
        return authedRequest('addTotal', {statId, count})
    }

    this.count = (statId, uid, count = 1) => {
        return authedRequest('count', {statId, uid, count})
    }

    this.heartbeat = () => {
        return authedRequest('heartbeat', {})
    }
}

module.exports = StatsAPI

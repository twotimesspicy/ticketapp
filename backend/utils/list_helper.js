const lodash = require('lodash')
const mostTickets = (tickets) => {
    const authorcount = lodash.countBy(tickets, 'author')
    // without lodash:
    // const authorcount = {}
    // for (let item of testList) {
    //     (item.author in authorcount) ? authorcount[item.author] += 1
    //         : authorcount[item.author] = 9
    // }
    const authorcount = Object.entries(tickets).sort((a, b) => a[1] - b[1])
    return Object.keys(authorcount).reduce((prev, current) => {
        console.log('current ', current)
        return authorcount[prev] < authorcount[current] ? prev : current
    }, 0)
}

module.exports = {
    mostBlogs: mostTickets,
}

const lodash = require('lodash')
const testList = [
    { 'description': 'blah blah', 'author' : 'hero' },
    { 'description': 'hm', 'author' : 'moose' },
    { 'description': 'hm', 'author' : 'hero' },
    { 'description': 'hm', 'author' : 'animal' },
    { 'description': 'hm', 'author' : 'animal' },
    { 'description': 'hm', 'author' : 'hero' },
    { 'description': 'hm', 'author' : 'animal' },
]
console.log(lodash.countBy(testList, 'author'))

// const authorcount = { 'hero': 5 , 'moose': 6, 'sun': 10 }
// const authorcount = lodash.countBy(testList, 'author')
const authorcount = {}
for (let item of testList) {
    (item.author in authorcount) ? authorcount[item.author] += 1
        : authorcount[item.author] = 9
}

console.log(authorcount)
// const test = Object.keys(authorcount).reduce((prev, current) => {
//     console.log('current ', current)
//     return (authorcount[prev] > authorcount[current]) ? prev : current
// }, 0)

// console.log(Math.max(...Object.values(authorcount)))
const maxauthors = Object.values(authorcount).sort()
console.log(maxauthors[maxauthors.length - 1])
// console.log(authorcount.filter(author => author === ))
// const result = []
// for (let a of Object.keys(authorcount)) {
//     if (authorcount[a] === maxauthors) {
//         result.push(a)
//     }
// }

const result = Object.keys(authorcount).filter((author) => {
    if (authorcount[author] === maxauthors[maxauthors.length - 1]) {
        return author
    }
})
console.log(result)
const authorarr = Object.keys(authorcount)
console.log(authorcount['moose'])
console.log(Object.keys(authorcount).find(key => authorcount[key] === maxauthors[0]))
// console.log(...authorcount)

// let pets = new Set(["Cat", "Dog", "Hamster"]);
// pets["species"] = "mammals";
// console.log(pets)
// for (let pet in pets) {
//    console.log(pet); // "species"
// }

// for (let pet of pets) {
//     console.log(pet); // "Cat", "Dog", "Hamster"
// }

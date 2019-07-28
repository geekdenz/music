import {transpose} from 'chord-transposer'
// let s = transpose('C').up(2)
import {readFileSync} from 'fs'
const csvFilePath='chord2notes.csv'
const read = process.argv[2] !== 'runner' ? process.argv[2] : 'Cmaj7 Bb7 C7 Em Em7 A Em Em7'
let chords = read
const csv = require('csvtojson')
const notes = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11,
}
const sharps = {
    'C#': 1,
    'D#': 3,
    'F#': 6,
    'G#': 8,
    'A#': 10,
}
const flats = {
    'Db': 1,
    'Eb': 3,
    'Gb': 6,
    'Ab': 8,
    'Bb': 10
}
function reverseKeys(obj) {
    const rev = {}
    Object.keys(obj).map(k => rev[obj[k]] = k)
    return rev
}
function join(obj1, obj2) {
    return {...obj1, ...obj2}
}
const notesBack = {...reverseKeys(notes), ...reverseKeys(flats)} //, ...reverseKeys(sharps)}

// notesBack

async function main(chords: string) {
    // const json = await csv().fromFile(csvFilePath)
    const ts = transpose(chords).up(2)
    const {tokens} = ts
    // JSON.stringify(ts) //?
    const chs = tokens[0]
    const fs = chs.filter(c => c.root).map(c => {
        const {root, suffix} = c
        // root
        // suffix
        const minor = suffix.length > 0 ? suffix.charAt(0) === 'm' : false
        // minor
        const seventh = !!(suffix.length && suffix.indexOf('7') !== -1)
        const maj = !!(suffix.indexOf('maj') !== -1)
        // seventh
        let s = ''
        const tonic = notes[root] || flats[root] || sharps[root] || 0
        // tonic
        let third, fifth: number
        if (minor) {
            third = tonic + 3
            fifth = tonic + 7
        } else {
            third = tonic + 4
            fifth = tonic + 7
        }
        // third
        s += `${notesBack[tonic]} ${notesBack[third % 12]} ${notesBack[fifth % 12]}`
        if (maj && seventh) {
            s += ` ${notesBack[(tonic + 11) % 12]}`
        } else if (seventh) {
            s += ` ${notesBack[(tonic + 10) % 12]}`
        }
        return s
    })
    // fs
    const valid = fs.join(' | ')
    console.log(read.split(' ').map((c, i) => c.padStart(fs[i].length, ' ')).join(' | '))
    console.log(valid)
}
main(chords)
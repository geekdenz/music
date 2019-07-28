"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var chord_transposer_1 = require("chord-transposer");
var csvFilePath = 'chord2notes.csv';
var read = process.argv[2] !== 'runner' ? process.argv[2] : 'Cmaj7 Bb7 C7 Em Em7 A Em Em7';
var chords = read;
var csv = require('csvtojson');
var notes = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11
};
var sharps = {
    'C#': 1,
    'D#': 3,
    'F#': 6,
    'G#': 8,
    'A#': 10
};
var flats = {
    'Db': 1,
    'Eb': 3,
    'Gb': 6,
    'Ab': 8,
    'Bb': 10
};
function reverseKeys(obj) {
    var rev = {};
    Object.keys(obj).map(function (k) { return rev[obj[k]] = k; });
    return rev;
}
function join(obj1, obj2) {
    return __assign({}, obj1, obj2);
}
var notesBack = __assign({}, reverseKeys(notes), reverseKeys(flats)); //, ...reverseKeys(sharps)}
// notesBack
function main(chords) {
    return __awaiter(this, void 0, void 0, function () {
        var ts, tokens, chs, fs, valid;
        return __generator(this, function (_a) {
            ts = chord_transposer_1.transpose(chords).up(2);
            tokens = ts.tokens;
            chs = tokens[0];
            fs = chs.filter(function (c) { return c.root; }).map(function (c) {
                var root = c.root, suffix = c.suffix;
                // root
                // suffix
                var minor = suffix.length > 0 ? suffix.charAt(0) === 'm' : false;
                // minor
                var seventh = !!(suffix.length && suffix.indexOf('7') !== -1);
                var maj = !!(suffix.indexOf('maj') !== -1);
                // seventh
                var s = '';
                var tonic = notes[root] || flats[root] || sharps[root] || 0;
                // tonic
                var third, fifth;
                if (minor) {
                    third = tonic + 3;
                    fifth = tonic + 7;
                }
                else {
                    third = tonic + 4;
                    fifth = tonic + 7;
                }
                // third
                s += notesBack[tonic] + " " + notesBack[third % 12] + " " + notesBack[fifth % 12];
                if (maj && seventh) {
                    s += " " + notesBack[(tonic + 11) % 12];
                }
                else if (seventh) {
                    s += " " + notesBack[(tonic + 10) % 12];
                }
                return s;
            });
            valid = fs.join(' | ');
            console.log(read.split(' ').map(function (c, i) { return c.padStart(fs[i].length, ' '); }).join(' | '));
            console.log(valid);
            return [2 /*return*/];
        });
    });
}
main(chords);

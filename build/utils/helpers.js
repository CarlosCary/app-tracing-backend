"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class Helpers {
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hash = yield bcryptjs_1.default.hash(password, salt);
            return hash;
        });
    }
    matchPassword(password, savedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield bcryptjs_1.default.compare(password, savedPassword);
            }
            catch (e) {
            }
        });
    }
    makeRandomString(length) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        });
    }
    getDateToday() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return dd + '-' + mm + '-' + yyyy;
    }
    getCurrentHourDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');
        return hh + ":" + min + ' - ' + dd + '/' + mm + '/' + yyyy;
    }
    getDateTodayEngFormat() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        return mm + '-' + dd + '-' + yyyy;
    }
    getDateEngFormat(date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        return mm + '-' + dd + '-' + yyyy;
    }
    changeDateFormatDDMMYYYtoMMDDYYYY(date) {
        return (date).replace(/(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
    }
}
exports.helpers = new Helpers();

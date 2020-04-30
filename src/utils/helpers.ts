import bcryptjs from 'bcryptjs';

class Helpers {

    async encryptPassword (password:any) {
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        return hash;
    }

    async matchPassword(password:any, savedPassword:any): Promise<any> {
        try {
            return await bcryptjs.compare(password, savedPassword);
        } catch (e) {
            console.log(e);
        }
    }

    async makeRandomString(length:any) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
     }

    getDateToday() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return dd + '-' + mm + '-' + yyyy;
    }

    getDateTodayEngFormat() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        console.log(utc);
        return mm + '-' + dd + '-' + yyyy;  
    }

    getDateEngFormat(date: Date) {
        
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        
        return mm + '-' + dd + '-' + yyyy;  
    }

    changeDateFormatDDMMYYYtoMMDDYYYY(date:string) {
        return (date).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2-$1-$3");
    }
}

export const helpers = new Helpers();
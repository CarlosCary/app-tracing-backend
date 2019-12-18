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
}

export const helpers = new Helpers();

import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

// class PassPortController {
//     constructor () {
//         passport.use('local.signup', new LocalStrategy({
//             usernameField: 'username',
//             passwordField: 'password',
//             passReqToCallback: true
//         }, async (req, username, password, done) => {
//             console.log(req.body);
//         }));
//     }

// }

export default passport.use('local.signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, username, password, done) => {
        console.log(req.body);
    }));


// const passPortController = new PasPortController();
// export default passPortController;
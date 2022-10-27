import local_strategy from 'passport-local';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const LocalStrategy = local_strategy.Strategy

const customFields = {
    usernameField: 'username',
    passwordField: 'password',
}

const verifyCallBack = (email, password, done) => {
    User.findOne({ email })
    .then(user => {
        if(!user) {
            return done(null, false)
        } else {
            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        }
    });
}

const authenticateUser = (passport) => {
    passport.use(new LocalStrategy(customFields, verifyCallBack));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err))
    );
}

export default authenticateUser;
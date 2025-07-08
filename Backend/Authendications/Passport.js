const passport = require('passport')
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { mypocket_info } = require('../model/Db')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'your_secret_key',
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(' Passport is verifying token:', jwt_payload)
    try {
      const user = await mypocket_info.findByPk(jwt_payload.id)
      if (user) {
        return done(null, user) // sets req.user
      }
      return done(null, false)
    } catch (err) {
      return done(err, false)
    }
  })
)

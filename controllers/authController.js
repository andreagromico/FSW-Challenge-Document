const { User } = require('../models')
const passport = require('../lib/passport')

function format(user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken: user.generateToken()
    }
}

module.exports = {
    register: (req, res, next) => {
        User.register(req.body)
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => next(err))
    },

    login: passport.authenticate('local', {
        successRedirect: '/game',
        failureRedirect: '/login',
        failureFlash: true
    }),

    apiLogin: (req, res) => {
        User.authenticate(req.body)
            .then(user => {
                res.json(
                    format(user)
                )
            })
    },
    game: (req, res) => {
        res.render('game', req.user.dataValues)
    },
    apigame: (req, res) => {
        const currentUser = req.user
        res.json(currentUser)
    }
}
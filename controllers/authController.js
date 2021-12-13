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
        successRedirect: '/playerlogin',
        failureRedirect: '/login',
        failureFlash: true
    }),


    game: (req, res) => {
        res.render('game', req.user.dataValues)
    },
    
    game2: (req, res) => {
        res.render('game2', req.user.dataValues)
    },

    apiLogin: (req, res) => {
        User.authenticate(req.body)
            .then(user => {
                res.json(
                    format(user)
                )
            })
    },
    apigame: (req, res) => {
        const currentUser = req.user
        res.json(currentUser)
    }
}
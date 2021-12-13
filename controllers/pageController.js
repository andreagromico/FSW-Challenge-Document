const { User, Profile, Historical} = require('../models')

module.exports = {
    index: (req, res) => {
        console.log(User);
    },

    vCreate: (req,res) =>{
        res.render('create')
    },

    create: (req, res) => {
    User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
    })

    .then(respon => {
        res.json(respon)
    })
   
    },
    dashboard: (req, res) =>{
        User.findAll({}).then(user => {
            res.render('dashboard', {user})
        })
    },

    edit: (req, res) => {
        User.findOne({where: {id: req.params.id}})
        .then(article => {
            res.render('edit', {user})
        })
    }, 

    update: (req, res) => {
        User.update({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
        }, {
        where: { id: req.params.id }
        })
        .then(user => {
            res.render('dashboard', {
                user
            })
        })
    },

    delete: (req, res) => {
        User.destroy({
            where: { id: req.params.id }
        })
        .then(user => {
            res.redirect('/dashboard')
        })
    },
    
    historicalFindAll: (req, res) => {
        Historical.findAll()
        .then(Historical => {
            res.status(200).json(Historical)
        })
    },
    historicalCreate: (req, res) => {
        Historical.create({
            playerChoice: req.body.playerChoice,
            computerChoice: req.body.computerChoice,
            result: req.body.result
        })
        .then(Historical => {
            res.status(201).json(Historical)   
        })
        .catch(err => {
            res.status(422).json(err)
        })
    }

}
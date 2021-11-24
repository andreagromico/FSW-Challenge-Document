const { User } = require('./models')

User.findOne({
    where: { id: 2 }
    })
    .then(article => console.log(article)
)
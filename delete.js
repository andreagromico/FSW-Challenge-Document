const { User } = require('./models')

User.destroy({
    where: {
    username: false
    }
    })
    .then(() => console.log("User data has been deleted" )
)
const { User } = require('./models')

const query = {
where: { id: 1 }
}
User.update({
username: 'usertest'
}, query)
.then(() => {
console.log("Data has been updated")
process.exit()
})
.catch(err => {
console.error("Fail to update Data!!")
})
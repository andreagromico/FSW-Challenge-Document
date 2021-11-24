const { User } = require('./models')
const { Profile } = require('./models')

Profile.create({
    userId: 1,
    nama_lengkap: 'Andrea G',
    email: 'test1@gmail.com',
    alamat: 'padang'
})
    .then(user => {
    console.log(user)
})
'use strict'

const User = use('App/Models/User')
const Helpers = use('Helpers')

class UserService {

    static async update({ request, auth}) {
        const { username,email, password } = request.all()
        
        const user = auth.user
        user.username = username;
        user.email = email;
        password ? user.password = password : null

        try {
            await user.save();
            if(request.file('picture')){
                const profilePic = request.file('picture', {
                    types: ['image'],
                    size: '2mb'
                })
                await profilePic.move(Helpers.publicPath('uploads/users'), {
                    name: 'user_' + user.id + '_profile_picture.'+ profilePic.extname,
                    overwrite: true
                })
                if (!profilePic.moved()) {
                    console.log('image not uploaded')
                }
            }
            
            return 1;

        } catch (error) {
          console.log(error)
          return 0
        }
      }

}

module.exports = UserService

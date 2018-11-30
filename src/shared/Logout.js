import { Auth } from 'aws-amplify'
import { AppConstants } from './constants/constants'

const Logout = () => {
  Auth.signOut()
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      const url = window.location.href
      window.location.href = url.slice(
        0,
        url.indexOf(AppConstants.routes.logout),
      )
    })

  return null
}

export default Logout

import User from '../models/User'

export default function findUserEmail(email) {
    var query = User.find({email: email}).exec()
    return query
}


import bcrypt from 'bcrypt'

//hash the password.
export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (error, salt) => {

            //handle the error.
            if (error) {
                return reject(error)
            }

            //hash the password.
            bcrypt.hash(password, salt, (error, hash) => {

                //handle the error
                if (error) {
                    return reject(error)
                }

                //hash the password.
                resolve(hash)
            })
        })
    })
}

//compare the password.
export const comparePassword = (password, hashedPassword) => {
    return (
        bcrypt.compare(password, hashedPassword)
    )
}
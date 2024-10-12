import bcryptjs from 'bcryptjs'

const hashPassword = (password: string) => {
    return bcryptjs.hashSync(password)
}

const isCorrectPassword = (hashedPassword: string, password: string) => {
    return bcryptjs.compareSync(password, hashedPassword)
}

export { hashPassword, isCorrectPassword }

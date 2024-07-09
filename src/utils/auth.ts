import bcrypt from 'bcryptjs'

export const hashPasswrod = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const checkPassword = async (enteredPasswrod: string, storeHast: string) => {
    return await bcrypt.compare(enteredPasswrod, storeHast)
}
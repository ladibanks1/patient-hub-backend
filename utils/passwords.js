import bcrypt from "bcrypt"
export const hashPassword = async(password) => {
    try{
        const hashPassword = await bcrypt.hash(password , 10)
        return hashPassword
    }catch (error){
        throw error
    }
}

export const comparePassword = async(password, hashPassword) => {
    try {
        const isMatch = await bcrypt.compare(password ,  hashPassword)
        return isMatch
    } catch (error) {
        throw error
    }
}
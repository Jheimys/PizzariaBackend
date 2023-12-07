import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'

interface AuthRequest{
    email:string
    password: string
}

class AuthUserServise {
    async execute({ email, password }: AuthRequest){
        //Verificar se o email existe
        const user = await  prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw new Error("User not found");
        }

        if(!email){
            throw new Error("User/password incorrect")
        }

        //Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/password incorrect")
        }

        return { ok: true}
    }
}

export { AuthUserServise }
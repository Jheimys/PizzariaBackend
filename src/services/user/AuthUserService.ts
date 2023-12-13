import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import {sign } from 'jsonwebtoken'

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

        const token = sign(
            {
                name: user.name,
                email: user.email
            },

            process.env.jwt_secret,

            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserServise }
import express, {Request, Response, NextFunction} from 'express'
import "express-async-errors"
import {router} from './router'

import cors from "cors"

const app = express()

app.use(cors())

app.use(express.json())

app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof Error){
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error', 
        message:'Internal server error'
    })
})

app.use('/user', router)

app.listen(3333, () => console.log('Servidor online!'))

//yarn init -y

//yarn add typescript -D
//yarn add express
//yarn add @types/express -D

//yarn tsc --init

//yarn add ts-node-dev -D

//yarn dev

// yarn add express-async-errors

//yarn add cors

//yarn add @types/cors -D

// yarn add prisma

//yarn add @prisma/client


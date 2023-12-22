import {type ZodIssue } from 'zod'

export interface CreateApiData{    
     error : string | ZodIssure[] | null
     createdApiKey : string | null
}

export interface RevokeApiData{
    error : string | ZodIssure[] | null
    success : boolean
}
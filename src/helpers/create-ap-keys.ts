import { CreateApiData } from "@/Types/api"

export async function createApiKey(){
    const res = await fetch('/api/api-key/create')
    console.log("res",res)

    const data = (await res.json()) 

    console.log("data",data)

    if(data.error || !data.key) {
        if(data.error instanceof Array){
            throw new Error(data.error.join(" "))   
        }
        throw new Error(data.error ?? "Something went wrong try again later")
    }

    return data.key


}

export const errorHandler = (error: any): string[] => {
    let messages: string[] = [];
    if (error.response.status === 400 || error.response.status === 422) 
            for(let i = 0; i < error.response.data.message.length; i++ ){
                console.log(error.response.data);
                const messageArr: string[] = Object.values(error.response.data.message[i].constraints);
                messages.push(...messageArr);
            }
    
    if (error.response.status === 409)
        messages = [
            error.response.data.message
        ];

    return messages;
}
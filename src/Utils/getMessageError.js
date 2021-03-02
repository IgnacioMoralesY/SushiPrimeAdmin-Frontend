export const messageError = (initial) => {
    const data = initial.error.response.data;
    let message = "";

    if(data.errors){
        if(data.errors.length > 0){
            if(data.errors[0].msg){
                message = data.errors[0].msg;
            }
        }
    }else if(data.msg){
        message = data.msg;
    }

    return message;
};
const Message = {
    handlers : {},
    subscribe(msg,fun){
       if(this.handlers.hasOwnProperty(msg)){
            this.handlers[msg].push(fun);
       } else {
            this.handlers[msg] = [fun];
       }
    },
    broadcast(msg){
        if(this.handlers.hasOwnProperty(msg)){
            this.handlers[msg].forEach((e,i) => {
                try{
                    e();
                }catch(error){
                    console.warn(error);
                }
            });
        }
    },
    remove(){
        return delete this.handlers[msg];
    }
}
export default Message;
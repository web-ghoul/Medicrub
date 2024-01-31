import toast from "react-hot-toast"

export const handleAlert =({msg, status, pos,icon,dur,promise,loadMsg,successMsg, errorMsg})=>{
    const options = {
        duration:dur,
        position:pos
    }
    if(icon){
        options.icon = icon
    }
    if(status === "success"){
        toast.success(msg,options)
    }else if(status === "error"){
        toast.error(msg,options)
    }else if(status === "promise"){
        toast.promise(promise,{loading:loadMsg,success:successMsg,error:errorMsg})
    }else{
        toast(msg,options)
    }
} 
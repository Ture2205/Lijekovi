import { App } from "../constants"
import { httpService } from "./httpService";

async function getLijekovi(){
    return await httpService.get('/Lijekovi')
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
    });
}



export default{
    getLijekovi
};
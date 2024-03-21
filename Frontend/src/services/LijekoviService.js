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

async function obrisiLijekovi (sifra){

    return await httpService.delete('/Lijekovi/'+sifra)
    .then((res)=>{
        return {ok:true, poruka:res};
    }).catch((e)=>{
        console.log(e);
    });

}

async function dodaj(lijekovi){
    const odgovor = await httpService.post('/Lijekovi',lijekovi)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno dodano'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}
async function promjeni(sifra,lijekovi){
    const odgovor = await httpService.put('/Lijekovi/'+sifra,lijekovi)
    .then(()=>{
        return {ok: true, poruka: 'Uspješno promijenjeno'}
    })
    .catch((e)=>{
        console.log(e.response.data.errors);
        return {ok: false, poruka: 'Greška'}
    });
    return odgovor;
}
async function getBySifra(sifra){
    return await httpService.get('/Lijekovi/' + sifra)
    .then((res)=>{
        if(App.DEV) console.table(res.data);

        return res;
    }).catch((e)=>{
        console.log(e);
        return {poruka: e}
    });
}

export default{
    getLijekovi,
    obrisiLijekovi,
    dodaj,
    promjeni,
    getBySifra,


};
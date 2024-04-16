import { App } from "../constants";
import { httpService } from "./httpService";

async function getLijekovi() {
  try {
    const res = await httpService.get('/Lijekovi');
    if (App.DEV) console.table(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Došlo je do pogreške prilikom dohvaćanja lijekova");
  }
}

async function obrisiLijekovi(sifra) {
  try {
    const res = await httpService.delete(`/Lijekovi/${sifra}`);
    if (res && res.status === 200) {
      return { ok: true, poruka: "Lijek uspješno obrisan" };
    } else {
      console.error(res);
      throw new Error("Došlo je do pogreške prilikom brisanja lijeka");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Došlo je do pogreške prilikom brisanja lijeka");
  }
}

async function dodaj(lijekovi) {
  try {
    const odgovor = await httpService.post('/Lijekovi', lijekovi);
    return { ok: true, poruka: "Lijek uspješno dodan" };
  } catch (error) {
    console.error(error.response.data.errors);
    throw new Error("Došlo je do pogreške prilikom dodavanja lijeka");
  }
}

async function promjeni(sifra, lijekovi) {
  try {
    const odgovor = await httpService.put(`/Lijekovi/${sifra}`, lijekovi);
    return { ok: true, poruka: "Podaci o lijeku uspješno promijenjeni" };
  } catch (error) {
    console.error(error.response.data.errors);
    throw new Error("Došlo je do pogreške prilikom promjene podataka o lijeku");
  }
}

async function getBySifra(sifra) {
  try {
    const res = await httpService.get(`/Lijekovi/${sifra}`);
    if (App.DEV) console.table(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Došlo je do pogreške prilikom dohvaćanja lijeka po šifri");
  }
}

export default {
  getLijekovi,
  obrisiLijekovi, // Ispravljeno ime funkcije
  dodaj,
  promjeni,
  getBySifra,
};
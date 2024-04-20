import { App } from "../constants";
import { httpService } from "./httpService";

async function getRecepti() {
  try {
    const res = await httpService.get('/Recepti');
    if (App.DEV) console.table(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Došlo je do pogreške prilikom dohvaćanja recepta");
  }
}

async function obrisiRecepti(sifra) {
  try {
    const res = await httpService.delete(`/Recepti/${sifra}`);
    if (res && res.status === 200) {
      return { ok: true, poruka: "Recept uspješno obrisan" };
    } else {
      console.error(res);
      throw new Error("Došlo je do pogreške prilikom brisanja recepta");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Došlo je do pogreške prilikom brisanja recepta");
  }
}

async function dodaj(recepti) {
  try {
    const odgovor = await httpService.post('/Recepti', recepti);
    return { ok: true, poruka: "Recept uspješno dodan" };
  } catch (error) {
    console.error(error.response.data.errors);
    throw new Error("Došlo je do pogreške prilikom dodavanja recepta");
  }
}

async function promjeni(sifra, recepti) {
  try {
    const odgovor = await httpService.put(`/Recepti/${sifra}`, recepti);
    return { ok: true, poruka: "Recept uspješno promijenjen" };
  } catch (error) {
    console.error(error.response.data.errors);
    throw new Error("Došlo je do pogreške prilikom promjene podataka o receptu");
  }
}

async function getBySifra(sifra) {
  try {
    const res = await httpService.get(`/Recepti/${sifra}`);
    if (App.DEV) console.table(res.data);
    return res;
  } catch (error) {
    console.error(error);
    throw new Error("Došlo je do pogreške prilikom dohvaćanja recepta po šifri");
  }
}

export default {
  getRecepti,
  obrisiRecepti,
  dodaj,
  promjeni,
  getBySifra,
};
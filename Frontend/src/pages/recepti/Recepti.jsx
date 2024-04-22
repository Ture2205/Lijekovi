import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ReceptiService from "../../services/ReceptiService";

export default function Recepti() {
  const [recepti, setRecepti] = useState([]);

  async function dohvatiRecepti() {
    try {
      const res = await ReceptiService.getRecepti();
      setRecepti(res.data);
    } catch (error) {
      alert(error);
    }
  }

  async function obrisiRecepti(sifra) {
    try {
      const res = await ReceptiService.obrisiRecepti(sifra);
      if (res && res.ok) {
        dohvatiRecepti();
      } else {
        alert(res.data.poruka || "Došlo je do pogreške prilikom brisanja recepta");
      }
    } catch (error) {
      alert(error.message || "Došlo je do pogreške prilikom komunikacije s poslužiteljem");
    }
  }

  useEffect(() => {
    dohvatiRecepti();
  }, []);

  return (
    <Container>
      <Link to={RoutesNames.RECEPTI_DODAJ} className="btn btn-success gumb">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Redni broj</th>
            <th>Datum podizanja</th>
            <th>Doza</th>
            <th>Ime</th>
            <th>Opcije</th>
          </tr>
        </thead>
        <tbody>
          {recepti.map((recept, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{recept.datumpodizanja || "Nije definirano"}</td>
              <td>{recept.doza || "Nije definirano"}</td>
              <td>{recept.ime || "Nije definirano"}</td>
              <td>
                <Link to={`/recepti/${recept.sifra}`}>
                  <FaEdit size={25} />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => obrisiRecepti(recept.sifra)}>
                  <FaTrash size={25} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
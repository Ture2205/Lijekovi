import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import LijekoviService from "../../services/LijekoviService";

export default function Lijekovi() {
  const [lijekovi, setLijekovi] = useState([]);

  async function dohvatiLijekove() {
    try {
      const res = await LijekoviService.getLijekovi();
      setLijekovi(res.data);
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    dohvatiLijekove();
  }, []);

  return (
    <Container>
      <Link to={RoutesNames.LIJEKOVI_DODAJ} className="btn btn-success gumb">
        <IoIosAdd size={25} /> Dodaj
      </Link>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Entitet</th>
            <th>Tip</th>
            <th>Doza</th>
            <th>Broj tableta</th>
            <th>Nacin primjene</th>
            <th>Datum podizanja</th>
            <th>Opcije</th>
          </tr>
        </thead>
        <tbody>
          {lijekovi.map((lijek, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{lijek.tip || "Nije definirano"}</td>
              <td>{lijek.doza || "Nije definirano"}</td>
              <td>{lijek.brojtableta || "Nije definirano"}</td>
              <td>{lijek.nacinprimjene || "Nije definirano"}</td>
              <td>{lijek.datumpodizanja || "Nije definirano"}</td>
              <td>
                <Link to={`/lijekovi/${lijek.sifra}`}>
                  <FaEdit size={25} />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link>
                  <FaTrash size={25} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
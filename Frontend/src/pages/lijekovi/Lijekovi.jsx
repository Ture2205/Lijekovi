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
            <th>Tip</th>
            <th>Doza</th>
            <th>Brojtableta</th>
            <th>Nacinprimjene</th>
            <th>Datumpodizanja</th>
          </tr>
        </thead>
        <tbody>
          {lijekovi.map((lijek, index) => (
            <tr key={index}>
              <td>{lijek.tip}</td>
              <td className="desno">{lijek.doza}</td>
              <td className={lijek.brojtableta == null ? "sredina" : "desno"}>
                {lijek.nacinprimjene == null ? "Nije definirano" : lijek.nacinprimjene}
              </td>
              <td className="sredina">
                <Link to={`${RoutesNames.LIJEKOVI_PROMJENI}/${lijek.id}`}>
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
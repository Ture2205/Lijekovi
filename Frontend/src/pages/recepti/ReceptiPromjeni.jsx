import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import ReceptiService from "../../services/ReceptiService";
import { useEffect, useState } from "react";
import moment from 'moment';


export default function ReceptiPromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [recepti, setRecepti] = useState({});

  async function dohvatiRecepti() {
    try {
      const res = await ReceptiService.getBySifra(routeParams.sifra);
      if (res && res.data) {
        setRecepti(res.data);
      } else {
        console.log("Nema podataka");
      }
    } catch (error) {
      alert(error.message || "Došlo je do pogreške prilikom dohvaćanja podataka");
    }
  }

  useEffect(() => {
    dohvatiRecepti();
  }, [routeParams.sifra]);

  async function promjeniRecepti(recepti) {
    try {
      const odgovor = await ReceptiService.promjeni(routeParams.sifra, recepti);
      if (odgovor && odgovor.ok) {
        navigate(RoutesNames.RECEPTI_PREGLED);
      } else {
        console.log(odgovor);
        alert(odgovor.poruka || "Došlo je do pogreške prilikom promjene podataka");
      }
    } catch (error) {
      alert(error.message || "Došlo je do pogreške prilikom komunikacije s poslužiteljem");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    const recepti = {
    
      datumpodizanja: moment(podaci.get("datumpodizanja")).format("YYYY-MM-DD"),
      doza: parseInt(podaci.get("doza")),
      ime: podaci.get('ime')
    };

    promjeniRecepti(recepti);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="datumPodizanja">
          <Form.Label>Datum podizanja</Form.Label>
          <Form.Control type="date" defaultValue={moment(recepti.datumPodizanja).format("YYYY-MM-DD")} name="datumPodizanja" />
        </Form.Group>
        <Form.Group controlId="doza">
          <Form.Label>Doza</Form.Label>
          <Form.Control type="text" defaultValue={recepti.doza} name="doza" />
        </Form.Group>
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control type="text" defaultValue={recepti.ime} name="ime" />
        </Form.Group>
        <Row className="akcije">
          <Col>
            <Link className="btn btn-danger" to={RoutesNames.RECEPTI_PREGLED}>
              <RiArrowGoBackFill size={16} />
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              <RiArrowGoForwardFill size={16} />
              Promjeni Recepte
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
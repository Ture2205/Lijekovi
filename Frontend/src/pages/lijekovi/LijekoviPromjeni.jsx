import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import LijekoviService from "../../services/LijekoviService";
import { useEffect, useState } from "react";
import moment from 'moment';


export default function LijekoviPromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [lijekovi, setLijekovi] = useState({});

  async function dohvatiLijekovi() {
    try {
      const res = await LijekoviService.getBySifra(routeParams.sifra);
      if (res && res.data) {
        setLijekovi(res.data);
      } else {
        console.log("Nema podataka");
      }
    } catch (error) {
      alert(error.message || "Došlo je do pogreške prilikom dohvaćanja podataka");
    }
  }

  useEffect(() => {
    dohvatiLijekovi();
  }, [routeParams.sifra]);

  async function promjeniLijekovi(lijekovi) {
    try {
      const odgovor = await LijekoviService.promjeni(routeParams.sifra, lijekovi);
      if (odgovor && odgovor.ok) {
        navigate(RoutesNames.LIJEKOVI_PREGLED);
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

    const lijekovi = {
      tip: podaci.get("tip"),
      doza: parseInt(podaci.get("doza")),
      brojtableta: parseInt(podaci.get("brojtableta")),
      nacinprimjene: podaci.get("nacinprimjene"),
      datumpodizanja: moment(podaci.get("datumpodizanja")).format("YYYY-MM-DD"),
    };

    promjeniLijekovi(lijekovi);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="tip">
          <Form.Label>Tip</Form.Label>
          <Form.Control type="text" defaultValue={lijekovi.tip} name="tip" />
        </Form.Group>
        <Form.Group controlId="doza">
          <Form.Label>Doza</Form.Label>
          <Form.Control type="text" defaultValue={lijekovi.doza} name="doza" />
        </Form.Group>
        <Form.Group controlId="brojtableta">
          <Form.Label>Broj tableta</Form.Label>
          <Form.Control type="text" defaultValue={lijekovi.brojtableta} name="brojtableta" />
        </Form.Group>
        <Form.Group controlId="nacinprimjene">
          <Form.Label>Nacin primjene</Form.Label>
          <Form.Control type="text" defaultValue={lijekovi.nacinprimjene} name="nacinprimjene" />
        </Form.Group>
        <Form.Group controlId="datumpodizanja">
          <Form.Label>Datum podizanja</Form.Label>
          <Form.Control type="date" defaultValue={moment(lijekovi.datumpodizanja).format("YYYY-MM-DD")} name="datumpodizanja" />
        </Form.Group>
        <Row className="akcije">
          <Col>
            <Link className="btn btn-danger" to={RoutesNames.LIJEKOVI_PREGLED}>
              <RiArrowGoBackFill size={16} />
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              <RiArrowGoForwardFill size={16} />
              Promjeni Lijekove
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import LijekoviService from "../../services/LijekoviService";
import moment from 'moment';

export default function LijekoviDodaj() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);

    const lijekovi = {
      tip: podaci.get("tip"),
      doza: parseInt(podaci.get("doza")),
      brojtableta: parseInt(podaci.get("brojTableta")),
      nacinprimjene: podaci.get("nacinPrimjene"),
      datumpodizanja: moment.utc(podaci.get("datumPodizanja"))
    };

    await dodajLijekove(lijekovi);
  }

  async function dodajLijekove(lijekovi) {
    try {
      const odgovor = await LijekoviService.dodaj(lijekovi);
      if (odgovor.ok) {
        navigate(RoutesNames.LIJEKOVI_PREGLED);
      } else {
        console.log(odgovor);
        alert(odgovor.poruka);
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja lijekova:", error?.response?.data || error.message);
      alert("Došlo je do greške prilikom dodavanja lijekova.");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="tip">
          <Form.Label>Tip</Form.Label>
          <Form.Control
            type="text"
            name="tip"
            placeholder="Tip lijeka"
            maxLength={255}
            required
          />
        </Form.Group>
        <Form.Group controlId="doza">
          <Form.Label>Doza</Form.Label>
          <Form.Control
            type="text"
            name="doza"
            placeholder="Doza pacijenta"
            maxLength={10}
          />
        </Form.Group>
        <Form.Group controlId="brojTableta">
          <Form.Label>Broj tableta</Form.Label>
          <Form.Control
            type="text"
            name="brojTableta"
            placeholder="Broj tableta pacijenta"
            maxLength={100}
          />
        </Form.Group>
        <Form.Group controlId="nacinPrimjene">
          <Form.Label>Nacin primjene</Form.Label>
          <Form.Control
            type="text"
            name="nacinPrimjene"
            placeholder="Nacin primjene lijeka"
            maxLength={60}
          />
        </Form.Group>
        <Form.Group controlId="datumPodizanja">
          <Form.Label>Datum podizanja</Form.Label>
          <Form.Control
            type="date"
            name="datumPodizanja"
            
          />
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
              Dodaj lijekove
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
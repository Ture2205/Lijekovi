import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill, RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import ReceptiService from "../../services/ReceptiService";
import moment from 'moment';

export default function ReceptiDodaj() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    
    // Provjera ispravnosti datuma
    const datumPodizanjaValue = podaci.get("datumPodizanja");
    if (!moment(datumPodizanjaValue, moment.ISO_8601, true).isValid()) {
      alert("Neispravan format datuma podizanja.");
      return;
    }

    const recepti = {
      datumpodizanja: moment(datumPodizanjaValue, "YYYY-MM-DD").toISOString(),
      doza: parseInt(podaci.get("doza")),
      ime: podaci.get("ime")
    };

    await dodajRecepti(recepti);
  }

  async function dodajRecepti(recepti) {
    try {
      const odgovor = await ReceptiService.dodaj(recepti);
      if (odgovor.ok) {
        navigate(RoutesNames.RECEPTI);
      } else {
        console.log(odgovor);
        alert(odgovor.poruka);
      }
    } catch (error) {
      console.error("Greška prilikom dodavanja recepta:", error?.response?.data || error.message);
      alert("Došlo je do greške prilikom dodavanja recepta.");
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ime">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            name="ime"
            placeholder="Ime pacijenta"
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
        <Form.Group controlId="datumPodizanja">
          <Form.Label>Datum podizanja</Form.Label>
          <Form.Control
            type="date"
            name="datumPodizanja"
            required
          />
        </Form.Group>
        <Row className="akcije">
          <Col>
            <Link className="btn btn-danger" to={RoutesNames.RECEPTI}>
              <RiArrowGoBackFill size={16} />
              Odustani
            </Link>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              <RiArrowGoForwardFill size={16} />
              Dodaj recept
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
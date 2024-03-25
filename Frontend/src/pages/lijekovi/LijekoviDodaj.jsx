import { Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import LijekoviService from "../../services/LijekoviService";


export default function LijekoviDodaj(){
    const navigate = useNavigate();

    async function dodajLijekove(lijekovi){
        const odgovor = await LijekoviService.dodaj(lijekovi);
        if(odgovor.ok){
          navigate(RoutesNames.LIJEKOVI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        //console.log(podaci.get('naziv'));

        const lijekovi=
        {
          tip: podaci.get('tip'),
          doza: podaci.get('doza'),
          brojTableta: podaci.get('brojTableta'),
          nacinPrimjene: podaci.get('nacinPrimjene'),
          datumPodizanja: podaci.get('datumPodizanja')
        };

        return (
          <Container>
              <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="tip">
                      <Form.Label>Tip</Form.Label>
                      <Form.Control 
                          type='text'
                          name='Tip'
                          placeholder='Tip lijeka'
                          maxLength={255}
                          required
                          />
                  </Form.Group>
                  <Form.Group controlId="doza">
                      <Form.Label>Prezime</Form.Label>
                      <Form.Control 
                          type="text"
                          name="doza"
                          placeholder='Doza pacijenta'
                          maxLength={10}
                          />
                  </Form.Group>
                  <Form.Group controlId="broj tableta">
                      <Form.Label>brojtableta</Form.Label>
                      <Form.Control 
                          type="text"
                          name="brojtableta"
                          placeholder='broj tableta pacijenta'
                          maxLength={100}
                          />
                  </Form.Group>
                  <Form.Group controlId="nacinprimjene">
                      <Form.Label>Nacinprimjene</Form.Label>
                      <Form.Control 
                          type="text"
                          name="nacinprimjene"
                          placeholder='Nacin primjene lijeka'
                          maxLength={60}   
                          />
                  </Form.Group>
                  <Form.Group controlId="datumpodizanja">
                      <Form.Label>Datumpodizanja</Form.Label>
                      <Form.Control 
                          type="text"
                          name="datumpodizanja"
                          placeholder='Datum podizanja lijeka'
                          maxLength={100}
                          />
                  
                </Form.Group>
              <Row className="akcije">
                  <Col>
                      <Link 
                          className="btn btn-danger"
                          to={RoutesNames.LIJEKOVI_PREGLED}>
                          <RiArrowGoBackFill size={16} />    
                      Odustani
                      </Link>
                  </Col>
                  <Col>
                      <Button
                          variant="primary"
                          type="submit">
                          <RiArrowGoForwardFill size ={16} />
                      Dodaj lijekove
                      </Button>
                  </Col>
              </Row>
              </Form>
           </Container>
  
      );
  }
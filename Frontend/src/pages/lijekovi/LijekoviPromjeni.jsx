import { Container, Table } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri"
import { RiArrowGoForwardFill } from "react-icons/ri";
import { RoutesNames } from "../../constants";
import RadnikService from "../../services/LijekovikService";
import { useEffect, useState } from "react";

export default function LijekoviPromjeni(){
    const navigate = useNavigate();
    const routeParams = useParams();
    const [lijekovi,setLijekovi] = useState({});

    async function dohvatiLijekove(){
        await LijekoviService.getBySifra(routeParams.sifra)
        .then((res)=>{
            setLijekovi(res.data)
        })
        .catch((e)=>{
            alert(e.poruka);
        });

    
    }

    useEffect(()=>{
        //console.log("useEffect")
        dohvatiLijekove();
    },[]);

    async function promjeniLijekove(lijekovi){
        const odgovor = await LijekoviService.promjeni(routeParams.sifra,lijekovi);
        if(odgovor.ok){
          navigate(RoutesNames.LIJEKOVI_PREGLED);
        }else{
          console.log(odgovor);
          alert(odgovor.poruka);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);

        const lijekovi = 
        {
            tip: podaci.get('tip'),
          doza: podaci.get('doza'),
          brojTableta: podaci.get('brojTableta'),
          nacinPrimjene: podaci.get('nacinPrimjene'),
          datumPodizanja: podaci.get('datumPodizanja'),
          };

          promjeniLijekove(lijekovi);
        }


    return (

        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="tip">
                    <Form.Label>Tip</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={lijekovi.tip}
                        name="tip"/>
                </Form.Group>
                <Form.Group controlId="doza">
                    <Form.Label>Doza</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={lijekovi.doza}
                        name="doza"/>
                </Form.Group>
                <Form.Group controlId="brojtableta">
                    <Form.Label>Brojtableta</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={lijekovi.brojtableta}
                        name="brojtableta"/>
                </Form.Group>
                <Form.Group controlId="nacinprimjene">
                    <Form.Label>Nacinprimjene</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={lijekovi.nacinprimjene}
                        name="nacinprimjene"/>
                </Form.Group>
                <Form.Group controlId="datumpodizanja">
                    <Form.Label>Datumpodizanja</Form.Label>
                    <Form.Control 
                        type="text"
                        defaultValue={lijekovi.datumpodizanja}
                        name="datumpodizanja"/>
                
                
                    
                
                
                        
                    
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
                    Promjeni Lijekove 
                    </Button>
                </Col>
            </Row>
            </Form>
         </Container>


    );

}
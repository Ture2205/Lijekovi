import { Container, Table } from "react-bootstrap";
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

    return (

        <Container>
           Dodavanje lijeka
        </Container>

    );

}
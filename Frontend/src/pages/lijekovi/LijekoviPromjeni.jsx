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

    return (

        <Container>
           Mjenjanje lijekova
        </Container>

    );

}
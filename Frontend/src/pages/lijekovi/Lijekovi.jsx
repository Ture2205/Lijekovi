import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";
import LijekoviService from "../../services/LijekoviService";


export default function Lijekovi(){

    const [lijekovi,setLijekovi] = useState();

    async function dohvatiLijekove(){
        await LijekoviService.getLijekovi()
        .then((res)=>{
            setLijekovi(res.data);
        })
        .catch((e)=>{
            alert(e);
        });
    }
    
    useEffect(()=>{
        dohvatiLijekove();
    },[]);

    function verificiran(smjer){
        if (smjer.verificiran==null) return 'gray';
        if(smjer.verificiran) return 'green';
        return 'red';
    }

    function verificiranTitle(smjer){
        if (smjer.verificiran==null) return 'Nije definirano';
        if(smjer.verificiran) return 'Verificiran';
        return 'NIJE verificiran';
    }



    return (

        <Container>
            <Link to={RoutesNames.LIJEKOVI_DODAJ} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
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
                    {lijekovi && lijekovi.map((lijekovi,index)=>(
                        <tr key={index}>
                            <td>{lijekovi.tip}</td>
                            <td className="desno">{lijekovi.doza}</td>
                            <td className={lijekovi.brojtableta==null ? 'sredina' : 'desno'}>
                                {lijekovi.nacinprimjene==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={smjer.cijena}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className={smjer.upisnina==null ? 'sredina' : 'desno'}>
                                {smjer.upisnina==null 
                                ? 'Nije definirano'
                                :
                                    <NumericFormat 
                                    value={smjer.upisnina}
                                    displayType={'text'}
                                    thousandSeparator='.'
                                    decimalSeparator=','
                                    prefix={'€'}
                                    decimalScale={2}
                                    fixedDecimalScale
                                    />
                                }
                            </td>
                            <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={verificiran(smjer)}
                            title={verificiranTitle(smjer)}
                            />
                            </td>
                            <td className="sredina">
                                <Link to={RoutesNames.LIJEKOVI_PROMJENI}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Link>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Link>
                                    <FaTrash  
                                    size={25}
                                    />
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}
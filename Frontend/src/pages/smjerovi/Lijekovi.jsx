import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import SmjerService from "../../services/SmjerService";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../constants";


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
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
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
            <Link to={RoutesNames.LIJEKOVI_NOVI} className="btn btn-success gumb">
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
                                {smjer.cijena==null 
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
                                <Link to={RoutesNames.SMJEROVI_PROMJENI}>
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
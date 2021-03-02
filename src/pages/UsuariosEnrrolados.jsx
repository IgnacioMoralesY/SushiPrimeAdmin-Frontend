import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Pagination from '../Utils/pagination';
import { get, getHuellas, removeHuella } from '../actions';
import { useHistory } from 'react-router-dom';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BiTrash } from 'react-icons/bi';
import Swal from 'sweetalert2';

const UsuariosEnrrolados = ({ users, userHuella, getHuellas, removeHuella, get}) => {
    useEffect(() => {
        getHuellas();
        get();
	}, [])

    const history = useHistory();

    useEffect(() => {
        if(users.payload.nombre.length === 0){
            history.push("/login");
        }
	}, [])

    let loading = (<div></div>)
    if(userHuella.loading){
        loading = (
            <div className="text-center col-12 my-5">
                <Loader
                    type="Oval"
                    color="#3f51b5"
                    height={100}
                    width={100}
                    timeout={30000} //3 secs
                />
            </div>
        )
	}

    let nroSinHuellas = 0;
    const [rutFilter, setRutFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
	const [userPerPage] = useState(8);

    const listUsuariosHuella = users.getUsers.map(user => {
        let userMap = { id: user.id, rut: user.rut, nombre: user.nombre, apellido: user.apellido, rol: user.rol, huella: 'No', id_huella: 0 };

        let existeHuella = userHuella.getHuellas.find(userHuella => userHuella.id_usuario === user.id);
        if(existeHuella){
            userMap.huella = 'Si';
            userMap.id_huella = existeHuella.id;
        }else if(user.rol === 2){
            nroSinHuellas++;
        }

        return userMap;
    });

    const filterUsersHuellas = listUsuariosHuella.filter(user => {
        if(user.rut){
            if(user.rut.includes(rutFilter) && user.rol === 2){
                return user
            }
        }
    });

	const indexOfLastUser = currentPage * userPerPage;
	const indexOfFirstUser = indexOfLastUser - userPerPage;
	const currentUsersHuella = filterUsersHuellas.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const botonBoorarHuella = (id_huella) => {
        if(id_huella > 0){
            return (
                <div className='d-flex'>
                    <BiTrash className='iconData delete scale mr-3' onClick={() => confirmarEliminar(id_huella)} /> 
                </div>
            );
        }
        return(<div></div>);
    }

    const confirmarEliminar = (id) => {
		Swal.fire({
			title: 'Estas Seguro?',
			text: "Si Borras esta Huella el trabajador no podra marcar asistencia hasta que registre una nueva!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Borrala!'
		  }).then((result) => {
			if (result.isConfirmed) {
				removeHuella(id);
			}
		  })
	}

    return(
        <Container className="justify-content-md-center">
            <h2 className='text-center' > Usuarios Enrrolados </h2>
            <hr />
            <div className="row">

                { loading }

                <div className='col-12 mt-5'>

                    <Row>
                        <Col className='d-flex'>
                            <p> <b> Existen {nroSinHuellas} Usuarios sin Huella! </b> </p>
                        </Col>
                    </Row>

                    <Row>
                        <Col className='d-flex'>
                            <label className='labelSearch'> Filtrar</label>
                            <input 
                                name='search' 
                                type='text' 
                                className='form-control searchInput' 
                                placeholder='Ingrese Rut ' 
                                onChange={e => setRutFilter(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Table striped bordered hover className='mb-0'>
                        <thead>
                            <tr>
                                <th> Rut </th>
                                <th> Nombre </th>
                                <th> Apellido </th>
                                <th> Posee Huella? </th>
                                <th> Borrar Huella </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentUsersHuella.map((user, i) => (
                                    <tr key={i}>
                                        <td> {user.rut} </td>
                                        <td> {user.nombre} </td>
                                        <td> {user.apellido} </td>
                                        <td> {user.huella} </td>
                                        <td> 
                                            { botonBoorarHuella(user.id_huella) }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Row>
                        <Col className='d-flex'>
                            <Pagination dataPerPage={userPerPage} totalData={filterUsersHuellas.length} paginate={paginate} />
                        </Col>
                        <Col xs={5} className='text-right'>
                            <p className='mb-0 mt-1 mr-2'> Mostrando {currentUsersHuella.length} de {filterUsersHuellas.length} Usuarios </p>
                        </Col>
                    </Row>
                    
                </div>

            </div>
        </Container>
    )
}

const mapStateProps = ({users, userHuella}) => ({users, userHuella});

export default connect(mapStateProps, {getHuellas, removeHuella, get})(UsuariosEnrrolados);
import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Utils/pagination';
import { get, remove, bloquear, desbloquear } from '../../actions';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BiTrash } from 'react-icons/bi';
import EditIcon from '@material-ui/icons/Edit';
import { BiLock } from "react-icons/bi";
import { BiLockOpen } from "react-icons/bi";

import Swal from 'sweetalert2';

const Listar = ({users, get, remove, updateUser, bloquear, desbloquear}) => {
    useEffect(() => {
        get();
	}, [])

    const [rutFilter, setRutFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
	const [userPerPage] = useState(8);

    const filterUsers = users.getUsers.filter(user => {
        if(user.rut){
            if(user.rut.includes(rutFilter) && user.rol === 2){
                return user
            }
        }
    });

	const indexOfLastUser = currentPage * userPerPage;
	const indexOfFirstUser = indexOfLastUser - userPerPage;
	const currentUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const confirmarEliminar = (id) => {
		Swal.fire({
			title: 'Estas Seguro?',
			text: "Si Borras a este usuario se perderán todos sus datos y registros de asistencia!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Borralo!'
		  }).then((result) => {
			if (result.isConfirmed) {
				remove(id);
			}
		  })
	}

	const confirmarBloquear = (id) => {
		Swal.fire({
			title: 'Estas Seguro?',
			text: "Si Bloqueas a este usuario no podra tomar asistencia hasta su desbloqueo!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Bloquealo!'
		  }).then((result) => {
			if (result.isConfirmed) {
				bloquear(id);
			}
		  })
	}

	const confirmarDesBloquear = (id) => {
		Swal.fire({
			title: 'Estas Seguro?',
			text: "Si Desbloqueas a este usuario podra tomar asistencia!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Desbloquealo!'
		  }).then((result) => {
			if (result.isConfirmed) {
				desbloquear(id);
			}
		  })
	}

    return(
        <div>
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
						<th> Bloqueado </th>
				        <th> Acción </th>
			        </tr>
			    </thead>
				<tbody>
					{
						currentUsers.map((user, i) => {
							let botonBloqueo = (
								<BiLock className='iconData super-delete scale mx-3' onClick={() => confirmarBloquear(user.id)} /> 
							)

							if(user.bloqueado === 1){
								botonBloqueo = (
									<BiLockOpen className='iconData success scale mx-3' onClick={() => confirmarDesBloquear(user.id)} /> 
								)
							}

							return (
								<tr key={i}>
									<td> {user.rut} </td>
									<td> {user.nombre} </td>
									<td> {user.apellido} </td>
									<td> { (user.bloqueado === 0) ? "NO" : "SI" } </td>
									<td> 
										<div className='d-flex'>
											{ botonBloqueo }
											<BiTrash className='iconData delete scale mr-3' onClick={() => confirmarEliminar(user.id)} /> 
											<EditIcon className='iconData primary scale' onClick={() => updateUser(user)}/>
										</div>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</Table>
			<Row>
				<Col className='d-flex'>
					<Pagination dataPerPage={userPerPage} totalData={filterUsers.length} paginate={paginate} />
			    </Col>
				<Col xs={5} className='text-right'>
					<p className='mb-0 mt-1 mr-2'> Mostrando {currentUsers.length} de {filterUsers.length} Usuarios </p>
			    </Col>
			</Row>
			
		</div>
    )
}

const mapStateProps = ({users}) => ({users});

export default connect(mapStateProps, {get, remove, bloquear, desbloquear})(Listar);
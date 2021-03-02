import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Pagination from '../../Utils/pagination';
import { get, remove } from '../../actions/tienda';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BiTrash } from 'react-icons/bi';
import EditIcon from '@material-ui/icons/Edit';

import Swal from 'sweetalert2';

const Listar = ({tiendas, get, remove, updateTienda}) => {
    useEffect(() => {
        get();
	}, [])

    const [dataFilter, setDataFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage] = useState(8);

    const filterTiendas = tiendas.getTiendas.filter(tienda => {
        if(tienda.nombre){
            if(tienda.nombre.includes(dataFilter)){
                return tienda
            }
        }
    });

	const indexOfLastUser = currentPage * dataPerPage;
	const indexOfFirstUser = indexOfLastUser - dataPerPage;
	const currentData = filterTiendas.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const confirmarEliminar = (id) => {
		Swal.fire({
			title: 'Estas Seguro?',
			text: "Si Borras esta Tienda se perderán todos sus datos y registros de asistencia!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, Borrala!'
		  }).then((result) => {
			if (result.isConfirmed) {
				remove(id);
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
						placeholder='Ingrese Nombre ' 
						onChange={e => setDataFilter(e.target.value)}
					/>
			    </Col>
			</Row>

			<Table striped bordered hover className='mb-0'>
			    <thead>
			    	<tr>
				        <th> ID </th>
				        <th> Nombre </th>
				        <th> Acción </th>
			        </tr>
			    </thead>
				<tbody>
					{
						currentData.map((tienda, i) => (
							<tr key={i}>
								<td> {tienda.id} </td>
								<td> {tienda.nombre} </td>
								<td> 
                                    <div className='d-flex'>
                                        <BiTrash className='iconData delete scale mr-3' onClick={() => confirmarEliminar(tienda.id)} /> 
                                        <EditIcon className='iconData primary scale' onClick={() => updateTienda(tienda)}/>
                                    </div>
                                </td>
							</tr>
						))
					}
				</tbody>
			</Table>
			<Row>
				<Col className='d-flex'>
					<Pagination dataPerPage={dataPerPage} totalData={filterTiendas.length} paginate={paginate} />
			    </Col>
				<Col xs={5} className='text-right'>
					<p className='mb-0 mt-1 mr-2'> Mostrando {currentData.length} de {filterTiendas.length} Tiendas </p>
			    </Col>
			</Row>
			
		</div>
    )
}

const mapStateProps = ({tiendas}) => ({tiendas});

export default connect(mapStateProps, {get, remove})(Listar);
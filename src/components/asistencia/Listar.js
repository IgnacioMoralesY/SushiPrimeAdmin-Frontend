import React, {useEffect, useState } from 'react';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';

import { connect } from 'react-redux';
import Pagination from '../../Utils/pagination';

import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Listar = ({asistencias}) => {

    const [dataFilter, setDataFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage] = useState(8);

    const filterData = asistencias.filter(asistencia => {
        if(asistencia.usuario.rut){
            if(asistencia.usuario.rut.includes(dataFilter)){
                return asistencia
            }
        }
    });

	const indexOfLastUser = currentPage * dataPerPage;
	const indexOfFirstUser = indexOfLastUser - dataPerPage;
	const currentData = filterData.slice(indexOfFirstUser, indexOfLastUser);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const tdSalida = (fecha_salida) => {
		if(fecha_salida === null || fecha_salida === undefined){
			return (
				<td> En turno  </td>
			)
		}else{
			return (
				<td> <Moment format="DD/MM/YYYY HH:mm"  date={fecha_salida} />  </td>
			)
		}
	}

    return(
        <div>

			<Row className="mt-3 mb-2">
				<Col className='d-flex'>
					<label className='labelSearch'> Filtrar</label>
					<input 
						name='search' 
						type='text' 
						className='form-control searchInput' 
						placeholder='Ingrese Rut ' 
						onChange={e => setDataFilter(e.target.value)}
					/>
			    </Col>
			</Row>

			<Table striped bordered hover className='mb-0'>
			    <thead>
			    	<tr>
				        <th> Tienda </th>
				        <th> Rut </th>
				        <th> Nombre </th>
                        <th> Apellido </th>
                        <th> Fecha Entrada </th>
                        <th> Fecha Salida </th>
			        </tr>
			    </thead>
				<tbody>
					{
						currentData.map((asistencia, i) => {
							const td = tdSalida(asistencia.fecha_salida);

							return (
								<tr key={i}>
									<td> {asistencia.tienda.nombre} </td>
									<td> {asistencia.usuario.rut} </td>
									<td> {asistencia.usuario.nombre} </td>
									<td> {asistencia.usuario.apellido} </td>
									<td> <Moment format="DD/MM/YYYY HH:mm"  date={asistencia.fecha_entrada} />  </td>
									{td}
								</tr>
							)
						})
					}
				</tbody>
			</Table>
			<Row>
				<Col className='d-flex'>
					<Pagination dataPerPage={dataPerPage} totalData={filterData.length} paginate={paginate} />
			    </Col>
				<Col xs={5} className='text-right'>
					<p className='mb-0 mt-1 mr-2'> Mostrando {currentData.length} de {filterData.length} Registros </p>
			    </Col>
			</Row>
			
		</div>
    )
}

const mapStateProps = ({}) => ({});

export default connect(mapStateProps, {})(Listar);
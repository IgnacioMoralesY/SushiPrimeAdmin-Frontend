import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Container from 'react-bootstrap/Container';
import Listar from '../components/asistencia/Listar'

import { getAll } from '../actions/asistencia';

import Button from 'react-bootstrap/Button';
import ReactExport from "react-export-excel";

import { DataSetAsistencia } from '../Utils/dataSetAsistencia';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Col from 'react-bootstrap/Col';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const HistoricoPage = ({users, asistencias, getAll}) => {
    const history = useHistory();
    const [fechaBusqueda, setFechaBusqueda] = useState({});
    const [inicio, setInicio] = useState(moment().subtract(1, 'months'));
    const [termino, setTermino] = useState(moment());

    const titulo = "Historico de Asistencias";

    let listAsistencias = asistencias.getAsistencias.filter(asistencia => {
        let fechaEntrada = moment(asistencia.fecha_entrada);

        if(fechaEntrada >= inicio && fechaEntrada <= termino){
            return asistencia;
        }
    });

    useEffect(() => {
        if(users.payload.nombre.length === 0){
            history.push("/login");
        }else{
            buscarInformacion();
        }
	}, []);

    const buscarInformacion = async() => {
        await getAll();

        setFechaBusqueda(moment());
    }

    let loading = (<div></div>)
    if(users.loading){
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

    const elementExport = (
        <Button 
            variant="primary" 
        >
            Exportar Datos a Excel
        </Button>
    );

    const dataSet = DataSetAsistencia(listAsistencias);

    return(
        <Container className="justify-content-md-center postContainer">
            <h2 className='text-center' > { titulo } </h2>
            <hr />



            <div className=" d-flex rounded border py-2 col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
				<Col className='d-flex border-right pt-2'>
					<label className='labelHistorico'> Inicio </label>
                    <DatePicker selected={inicio.toDate()} onChange={date => setInicio(moment(date))} dateFormat='dd/MM/yyyy' name='inicio' className='form-control historyInput' />
			    </Col>

                <Col className='d-flex  pt-2'>
					<label className='labelHistorico'> Termino </label>
                    <DatePicker selected={termino.toDate()} onChange={date => setTermino(moment(date))} dateFormat='dd/MM/yyyy' name='termino' className='form-control historyInput' />
			    </Col>
			</div>
            
            <div className="row">

                { loading }

                <div className="col-12">
                    <h5 className="mt-3 mb-2"> Datos cargados a las <Moment format="HH:mm:ss"  date={fechaBusqueda} /> </h5>
                    <div className="col-12 rounded border ">
                        <Listar className="p-3 mt-5" asistencias={listAsistencias} />
                    </div>

                    <div className="mt-2">
                        <Button 
                            variant="primary" 
                            className="mr-4"
                            onClick={() => buscarInformacion() }
                        >
                            Actualizar Datos
                        </Button>

                        {listAsistencias.length !== 0 ? (
                            <ExcelFile element={<button className="btn btn-primary"> Exportar Datos a Excel </button>} filename={titulo} >
                                <ExcelSheet dataSet={dataSet} name="Control Asistencia" />
                            </ExcelFile>
                        ): null}

                    </div>
                </div>
            </div>
        </Container>
    )
}

const mapStateProps = ({users, asistencias}) => ({users, asistencias});

export default connect(mapStateProps, {getAll})(HistoricoPage);
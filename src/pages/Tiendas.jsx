import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Container from 'react-bootstrap/Container';

import Create from '../components/tienda/create';
import Listar from '../components/tienda/listar';

const Tiendas = ({tiendas, users}) => {
    const history = useHistory();

    useEffect(() => {
        if(users.payload.nombre.length === 0){
            history.push("/login");
        }
	}, [])

    let loading = (<div></div>)
    if(tiendas.loading){
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

    const [tiendaUpdate, setUpdateTienda] = useState({});

    return(
        <Container className="justify-content-md-center">
            <h2 className='text-center' > Tiendas </h2>
            <hr />
            <div className="row">

                { loading }

                <div className="col-12 col-lg-4">
                    <Create tiendaUpdate={tiendaUpdate} />
                </div>

                <div className="col-12 col-lg-8">
                    <div className="col-12 rounded border p-3 mt-5">
                        <Listar updateTienda={setUpdateTienda} />
                    </div>
                </div>
            </div>
        </Container>
    )
}

const mapStateProps = ({tiendas, users}) => ({tiendas, users});

export default connect(mapStateProps, {})(Tiendas);
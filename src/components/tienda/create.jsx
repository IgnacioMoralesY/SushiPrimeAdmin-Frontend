import React, {  useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import swal from 'sweetalert';

import { save, update} from '../../actions/tienda';

const Create = ({save, tiendaUpdate, update}) => {
    
    let [id, setId] = useState(0);
    let [nombre, setNombre] = useState('');
    
    if(tiendaUpdate.id && tiendaUpdate.id !== id){
        setId(tiendaUpdate.id);
        setNombre(tiendaUpdate.nombre);
    }

    const createTienda = async() => {
        if(nombre){
            if(nombre.length > 0 ){
                let tienda = { nombre };
                await save(tienda);
            }else{
                swal("Ups!", "Nombre es obligatorio", "warning")
            }
        }else{
            swal("Ups!", "Nombre es obligatorio", "warning")
        }
	}

    const modificarTienda = async() => {
        if(id && id > 0){
            if(nombre){
                if( nombre.length > 0 ){
                    let tienda = { nombre };
                    await update(tienda, id);
                }else{
                    swal("Ups!", "Nombre es obligatorio", "warning")
                }
            }else{
                swal("Ups!", "Nombre es obligatorio", "warning")
            }
        }else{
            swal("Ups!", "Esta tienda no puede ser modificada", "warning")
        }
       
	}
 
    let buttons = (
        <Button 
            variant="primary" 
            onClick={() => createTienda() }
        >
            Crear Tienda
        </Button>
    );

    if(id && id > 0){
        buttons = (
            <Button 
                variant="primary" 
                onClick={() => modificarTienda() }
            >
                Modificar Tienda
            </Button>
        );
    }

    return(
        <div className="col-12 rounded border p-3 mt-5">
            <h4 className="mt-1 mb-3 text-center">Datos de Tienda</h4>
            <Form className="">

                <Form.Group controlId="formBasicNombre">
                    <Form.Label>*Nombre</Form.Label>
                    <input 
                        name='nombre' 
                        type='text' 
                        className='form-control' 
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </Form.Group>

                { buttons }
                
            </Form>
        </div>
    )
}

const mapStateProps = ({}) => ({});

export default connect(mapStateProps, {save, update})(Create);
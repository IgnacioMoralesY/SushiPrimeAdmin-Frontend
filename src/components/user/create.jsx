import React, {  useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import swal from 'sweetalert';

import { save, update} from '../../actions';

const Create = ({save, userUpdate, update}) => {
    
    let [id, setId] = useState(0);
    let [rut, setRut] = useState('');
    let [nombre, setNombre] = useState('');
    let [apellido, setApellido] = useState('');
    
    if(userUpdate.id && userUpdate.id !== id){
        setId(userUpdate.id);
        setRut(userUpdate.rut);
        setNombre(userUpdate.nombre);
        setApellido(userUpdate.apellido);
    }

    const createUser = async() => {
        if(rut && nombre && apellido){
            if(rut.length > 0 && nombre.length > 0 && apellido.length > 0){
                let newUser = {rut, nombre, apellido, rol: 2};
                await save(newUser);
            }else{
                swal("Ups!", "Rut, Nombre y Apellido son obligatorios", "warning")
            }
        }else{
            swal("Ups!", "Rut, Nombre y Apellido son obligatorios", "warning")
        }
	}

    const modificarUser = async() => {
        if(id && id > 0){
            if(rut && nombre && apellido){
                if(rut.length > 0 && nombre.length > 0 && apellido.length > 0){
                    let userUpdate = {rut, nombre, apellido, rol: 2};
                    await update(userUpdate, id);
                }else{
                    swal("Ups!", "Rut, Nombre y Apellido son obligatorios", "warning")
                }
            }else{
                swal("Ups!", "Rut, Nombre y Apellido son obligatorios", "warning")
            }
        }else{
            swal("Ups!", "Este usuario no puede ser modificado", "warning")
        }
       
	}
 
    let buttons = (
        <Button 
            variant="primary" 
            onClick={() => createUser() }
        >
            Crear Usuario
        </Button>
    );

    if(id && id > 0){
        buttons = (
            <Button 
                variant="primary" 
                onClick={() => modificarUser() }
            >
                Modificar Usuario
            </Button>
        );
    }

    return(
        <div className="col-12 rounded border p-3 mt-5">
            <h4 className="mt-1 mb-3 text-center">Datos Usuario</h4>
            <Form className="">
                <Form.Group controlId="formBasicRut">
                    <Form.Label>*Rut</Form.Label>
                    <input 
                        name='name' 
                        type='text' 
                        className='form-control' 
                        placeholder='ej: 18123456-9' 
                        value={rut}
                        onChange={e => setRut(e.target.value)}
                    />
                </Form.Group>


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

                <Form.Group controlId="formBasicApellido">
                    <Form.Label>*Apellido</Form.Label>
                    <input 
                        name='apellido' 
                        type='text' 
                        className='form-control' 
                        value={apellido}
                        onChange={e => setApellido(e.target.value)}
                    />
                </Form.Group>

                { buttons }
                
            </Form>
        </div>
    )
}

const mapStateProps = ({}) => ({});

export default connect(mapStateProps, {save, update})(Create);
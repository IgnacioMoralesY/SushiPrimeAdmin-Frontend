import React, {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import { useHistory } from 'react-router-dom';

import { login } from '../actions';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import swal from 'sweetalert';

const LoginPage = ({users, login, clearMessage}) => {
    const history = useHistory();
   
    if(users.payload.nombre.length > 0){
        localStorage.setItem('payload', JSON.stringify(users.payload));
        history.push("/home");
    }
    const [rut, setRut] = useState('');
    const [password, setPassword] = useState('');

	const addPost = async() => {
        if(rut.length > 0 && password.length > 0){
            users.payload.rut = rut;
            users.payload.password = password;
    
            login(users.payload);
        }else{
            swal("Ups!", "Debe completar todos los datos para poder iniciar sesión", "warning")
        }
	}

    const setInputPassword = (value) => {
        setPassword(value);
    }

    const setInputRut = (value) => {
        setRut(value);
    }

    let loading = (<div></div>)

    if(users.loading){
        loading = (
            <div className="text-center my-5">
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

    return(
        <Container className="justify-content-md-center">
            <h2 className='text-center' > Inicie Sesión para poder navegar </h2>
            <hr />
            {loading}
            
            <div className="col-12 col-md-8 col-lg-6 mx-auto rounded border p-5 mt-5">
                <Form className="">
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Rut</Form.Label>
                        <input 
                            name='name' 
                            type='text' 
                            className='form-control' 
                            placeholder='ej: 18123456-9' 
                            value={rut}
                            onChange={e => setInputRut(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Password</Form.Label>
                        <input 
                            name='password' 
                            type='password' 
                            className='form-control' 
                            placeholder='******' 
                            value={password}
                            onChange={e => setInputPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button 
                        variant="primary" 
                        onClick={() => addPost() }
                    >
                        Iniciar Sesión
                    </Button>
                </Form>
            </div>
            
        </Container>
    )
}

LoginPage.propTypes = {

}

const mapStateProps = ({users}) => ({users});

export default connect(mapStateProps, {login})(LoginPage);
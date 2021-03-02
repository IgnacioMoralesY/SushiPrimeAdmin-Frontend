import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';


const NotFoundPage = props => {
    return(
        <Container className="justify-content-md-center postContainer">
            <div>
              <Link to='/'> Ir a Home </Link>
            </div>
            <h2 className='text-center' > Pagina no encontrada </h2>
        </Container>
    )
}

NotFoundPage.propTypes = {

}

export default NotFoundPage;
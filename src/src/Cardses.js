import React from 'react';

import { Card, Button } from 'react-bootstrap';

function Cardses(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.logo} alt={props.title}/>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <p id='description'>
          {props.description}
        </p>
        <Button variant="primary"><a href='/'>Open</a></Button>
      </Card.Body>
    </Card>
  );
}

export default Cardses;
import React from 'react';
import { Card, Button, ButtonGroup } from 'react-bootstrap';

export default function Offer(props) {
  let show = props.show;
  const requestUrl = props.id === 4 
    ? 'http://localhost:3000/responsetemplate?surveyId=eeb96362-0e5f-4058-9218-1b2343b52d75' 
    : props.to;

  return (
    <Card style={{ width: '18rem', height: '16rem' }} key={props?.key}>
      <Card.Body>
        <Card.Text>{props.logo}</Card.Text>
        <Card.Title>{props.title}</Card.Title>
        <Card.Title id='description'>{props.description}</Card.Title>
        <Card.Text>{props.category}</Card.Text>
      </Card.Body>
      <ButtonGroup>
        {show ? 
          <Button className='fixit' variant="warning" onClick={props.onClick}>Preview</Button> : null}
        <Button variant="primary" href={requestUrl}>{props.word}</Button>
      </ButtonGroup>
    </Card>
  );
}

// CatalogPage.js
import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import catalogItems from './Catalog.json';
import PreviewModal from './previews/PreviewModal'; // Import the PreviewModal component
import './CatalogPage.css';

const CatalogPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePreview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='catalogpage_body'>
      <Container>
        <h1 className="mt-4 mb-4">Catalog</h1>
        <Row>
          {catalogItems.map(item => (
            <Col key={item.id} md={4}>
              <Card className="catalog_card mb-4">
                <Card.Body>
                  <Card.Title>{item.tool}</Card.Title>
                  <Card.Text>
                    {item.CATEGORY.map(cat => (
                      <div key={cat}>{cat}</div>
                    ))}
                  </Card.Text>
                  <Button
                    className="btn-primary"
                    style={{ backgroundColor: '#FFBA53', marginLeft: '5px', marginRight: '5px' }}
                    onClick={handlePreview} // Add onClick handler to show the modal
                  >
                    Preview
                  </Button>
                  <Button className="btn-secondary" style={{ backgroundColor: '#EEBA99', marginLeft: '5px', marginRight: '5px' }} >Request</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Render the PreviewModal component */}
      <PreviewModal show={showModal} onHide={handleCloseModal} />
    </div>
  );
};

export default CatalogPage;

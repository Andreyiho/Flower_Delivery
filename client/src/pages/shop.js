import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import TypeBar from '../components/TypeBar';
import ProductList from '../components/ProductList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchProducts, fetchTypes } from '../http/productAPI';
import Button from 'react-bootstrap/Button';







const Shop = observer(() => {
  const { product } = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => product.setTypes(data))
    fetchProducts(1).then(data => product.setProducts(data.rows))
  }, [])
  useEffect(() => {
    fetchProducts(product.selectedType.id).then(data => product.setProducts(data.rows))
  }, [product.selectedType])


  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <b> Shops:</b>
          <TypeBar />
        </Col>
        <Col md={9}>
          <div className='d-flex justify-content-end mb-3'>
            <Button variant="link" onClick={() => product.setSort('price')}>
              Sort by price
            </Button>
            <Button variant="link" onClick={() => product.setSort('date')}>
              Sort by date
            </Button>
          </div>
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
}
)
export default Shop;





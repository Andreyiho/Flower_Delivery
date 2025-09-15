import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
         <Nav.Link style={{color:'white'}} href='/'>Flower Delivery</Nav.Link>
          <Nav className="ml-auto">
            <Nav.Link href="/">Shop</Nav.Link>
            <Nav.Link href="cart">Shopping Cart</Nav.Link>
            <Nav.Link href="#pricing">History</Nav.Link>
            <Nav.Link href="#Coupons">Coupons</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
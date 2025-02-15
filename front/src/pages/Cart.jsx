import React,{ useEffect } from 'react'
import CommonSection from '../components/Ui/CommonSection';
import Helmet from '../components/Helmet/Helmet'
import { Container,Row,Col } from 'reactstrap'
import '../styles/cart.css'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { removeFromCart,clearCart,getTotals } from '../store/CartSlice'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const handleRemoveFromCart = (item) =>{
    dispatch(removeFromCart(item))
  }

  const handleClearCart = () =>{
    dispatch(clearCart())
  }

  useEffect(() =>{
    dispatch(getTotals())
  },[cart,dispatch])

  window.scroll(0,0)
  return (
    <Helmet title={'Cart'}>
      <CommonSection title={'Shopping Cart'}/>
      {
        cart.cartItems?.length > 0 ? (
          <section>
          <Container>
            <Row>
              <Col lg='9'>
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody className="align-items-center">
                    {
                    cart.cartItems?.map((item) => (
                    <tr key={item.id}>
                      <td><img src={item.image} alt='cart'/></td>
                      <td>
                        {item.product}
                        <div className="text-danger remove" onClick={ () => handleRemoveFromCart(item) }>
                          <motion.i whileTap={{ scale:1.2 }} className='ri-delete-bin-line'></motion.i> Remove
                        </div>
                      </td>
                      <td>{item.price}</td>
                      <td>{item.cartQuantity}</td>
                      <td>{"TND. " + Number(item.cartQuantity * item.price.replace('TND.','').replace(/,/g,'')).toLocaleString()}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-danger remove" onClick={ () => handleClearCart() }>
                    <motion.i whileTap={{ scale:1.2 }} className='ri-delete-bin-line'></motion.i> clear cart
                </div>
              </Col>
              <Col lg='3' md='6'>
                <div className="totals gap-3">
                  <h6 className="d-flex align-items-center justify-content-between">
                    SubTotal
                    <span className="fs-4 fw-bold">{"TND." + Number(cart.totalAmount).toLocaleString()}</span>
                  </h6>
                </div>
                <p className="fs-6 mt-2">Taxes and shipping will calculated at checkout.</p>
                <div className="buttons">
                  <motion.button whileTap={{ scale:1.2 }} className="shop__btn w-100">
                    <Link to="/">CheckOut</Link>
                  </motion.button>
                  <motion.button whileTap={{ scale:1.2 }} className="shop__btn w-100">
                    <Link to="/shop">Continue shopping</Link>
                  </motion.button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        ):(
          <section>
            <Container> 
                <Row>
                <Col lg="12" className="text-center align-items-center">
                    <span>
                        <i className="ri-file-damage-line ri-10x text-muted"></i>
                    </span>
                    <h1 className="text-muted">Your shopping cart is empty.</h1>
                    <div className="buttons">
                      <motion.button whileTap={{ scale:1.2 }} className="shop__btn">
                        <Link to="/">Continue shopping</Link>
                      </motion.button>
                    </div>
                </Col>
                </Row>
            </Container>
        </section>
        )
      }
    </Helmet>
  )
}

export default Cart
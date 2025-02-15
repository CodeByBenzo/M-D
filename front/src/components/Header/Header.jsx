import React,{useRef,useEffect} from 'react'
import './header.css'
import { Container,Row } from 'reactstrap'
import { motion } from 'framer-motion'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { NavLink,Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const nav_links =[
  {
    path:'/',
    display:'Home'
  },
  {
    path:'shop',
    display:'Shop'
  },
  {
    path:'cart',
    display:'Cart'
  },
]

const Header = () => {
  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const { totalQuantity } = useSelector((state) => state.cart)

  const stickyHeader = () =>{
    window.addEventListener('scroll',() =>{
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headerRef.current.classList.add('sticky__header');
      }else{
        headerRef.current.classList.remove('sticky__header');
      }  
    })
  }

  useEffect(() =>{
    stickyHeader()

    return () =>
      window.removeEventListener('scroll',stickyHeader())
  })

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo"/>
              <div>
                <h1>
                  <Link to="/">M & D</Link>
                </h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                  {
                    nav_links.map((nav,index) =>(
                      <li className="nav__item" key={index}>
                            <NavLink 
                              to={nav.path} 
                              className={
                                (navClass) => 
                                  navClass.isActive ? 'nav__active':''
                              }
                            >
                              {nav.display}
                            </NavLink>
                      </li>
                    ))
                  }
              </ul>
            </div>
            <div className="nav__icons">
                <span className="fav__icon">
                  <i className="ri-heart-line"></i>
                  <span className="badge">1</span>
                </span>
                <span className="cart__icon">
                  <Link to="/cart">
                    <i className="ri-shopping-cart-line"></i>
                    <span className="badge">
                      {totalQuantity}
                    </span>
                  </Link>
                </span>
                <span>
                  <motion.img whileTap={{scale:1.1}} src={userIcon} alt="user"/>
                </span>
                <div className="mobile__menu">
                  <span onClick={menuToggle}>
                    <i className="ri-menu-line"></i>
                  </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header
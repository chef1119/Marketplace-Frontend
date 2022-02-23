import React, { useEffect, useState, useContext, useCallback } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { Button, Dropdown } from 'react-bootstrap';
import { Link } from '@reach/router';
import { ellipseAddress } from "../../utils/blockchain";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider"
import useOnclickOutside from "react-cool-onclickoutside";
import "./style.scss";


setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = props => (
  <Link 
    {...props}
    getProps={({ isCurrent }) => {
      // the object returned here is passed to the
      // anchor element's props
      return {
        className: isCurrent ? 'active' : 'non-active',
      };
    }}
  />
);



const Header= function() {

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    const [openMenu2, setOpenMenu2] = React.useState(false);
    const [openMenu3, setOpenMenu3] = React.useState(false);
    const closeMenu = (): void => {
      setOpenMenu(false);
    };
    const closeMenu1 = (): void => {
      setOpenMenu1(false);
    };
    const closeMenu2 = (): void => {
      setOpenMenu2(false);
    };
    const closeMenu3 = (): void => {
      setOpenMenu3(false);
    };
    const ref = useOnclickOutside(() => {
      closeMenu();
    });
    const ref1 = useOnclickOutside(() => {
      closeMenu1();
    });
    const ref2 = useOnclickOutside(() => {
      closeMenu2();
    });
    const ref3 = useOnclickOutside(() => {
      closeMenu3();
    });
    const { connect, disconnect, account } = useContext(Web3ModalContext);

    const handleConnectWallet = useCallback(() => {
      connect();
    }, [connect]);

    const handleDisconnectWallet = useCallback(() => {
      disconnect();
    }, [disconnect]);


    const [showmenu, btn_icon] = useState(false);
    useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
        btn_icon(false);
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          totop.classList.add("show");
          
        } else {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
          closeMenu();
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }, []);
    return (
    <header id="myHeader" className='navbar white'>
    <div className='container'>
      <div className='row w-100-nav'>
          <div className='logo px-0'>
              <div className='navbar-title navbar-item'>
                <NavLink to="/">
                  <img
                    src="./img/logo-light.png"
                    className="logo d-none"
                    alt="#"
                  />
                </NavLink>
              </div>
          </div>
                    
              <BreakpointProvider>
                <Breakpoint l down>
                  {showmenu && 
                  <div className='menu'>
                  {/* <div className='navbar-item'>
                      <div ref={ref}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onMouseEnter={handleBtnClick} onMouseLeave={closeMenu}>
                          Home
                          <span className='lines'></span>
                          {openMenu && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu}>
                              <NavLink to="/">Homepage</NavLink>
                              <NavLink to="/home1">Homepage 1</NavLink>
                              <NavLink to="/home2">Homepage 2</NavLink>
                            </div>
                          </div>
                        )}
                        </div>
                        
                      </div>
                  </div> */}
                  <div className='navbar-item'>
                    <NavLink to="/home2">
                    Home
                    <span className='lines'></span>
                    </NavLink>
                  </div>
                  {/* <div className='navbar-item'>
                    <div ref={ref1}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onMouseEnter={handleBtnClick1} onMouseLeave={closeMenu1}>
                          Explore
                          <span className='lines'></span>
                          {openMenu1 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/explore">Explore</NavLink>
                            <NavLink to="/explore2">Explore 2</NavLink>
                            <NavLink to="/rangking">Rangking</NavLink>
                            <NavLink to="/colection">Collection</NavLink>
                            <NavLink to="/ItemDetail">Items Details</NavLink>
                            <NavLink to="/Auction">Live Auction</NavLink>
                            <NavLink to="/helpcenter">Help Center</NavLink>
                            </div>
                          </div>
                        )}
                        </div>
                        
                      </div>
                  </div> */}
                  {/* <div className='navbar-item'>
                    <div ref={ref2}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onMouseEnter={handleBtnClick2} onMouseLeave={closeMenu2}>
                          Pages
                          <span className='lines'></span>
                          {openMenu2 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu2}>
                            <NavLink to="/Author">Author</NavLink>
                            <NavLink to="/wallet">Wallet</NavLink>
                            <NavLink to="/create">Create</NavLink>
                            <NavLink to="/news">News</NavLink>
                            <NavLink to="/works">Gallery</NavLink>
                            <NavLink to="/login">login</NavLink>
                            <NavLink to="/loginTwo">login 2</NavLink>
                            <NavLink to="/register">Register</NavLink>
                            <NavLink to="/contact">Contact Us</NavLink>
                            </div>
                          </div>
                        )}
                        </div>
                      </div>
                  </div> */}
                  <div className='navbar-item'>
                    <NavLink to="/collection">
                    My Cars
                    <span className='lines'></span>
                    </NavLink>
                  </div>
                  {/* <div className='navbar-item'>
                    <div ref={ref3}>
                        <div className="dropdown-custom dropdown-toggle btn" 
                          onMouseEnter={handleBtnClick3} onMouseLeave={closeMenu3}>
                          Elements
                          <span className='lines'></span>
                          {openMenu3 && (
                          <div className='item-dropdown'>
                            <div className="dropdown" onClick={closeMenu3}>
                            <NavLink to="/elegantIcons">Elegant Icon</NavLink>
                            <NavLink to="/etlineIcons">Etline Icon</NavLink>
                            <NavLink to="/fontAwesomeIcons">Font Awesome Icon</NavLink>
                            <NavLink to="/accordion">Accordion</NavLink>
                            <NavLink to="/alerts">Alerts</NavLink>
                            <NavLink to="/price">Pricing Table</NavLink>
                            <NavLink to="/progressbar">Progess Bar</NavLink>
                            <NavLink to="/tabs">Tabs</NavLink>
                            </div>
                          </div>
                        )}
                        </div>
                      </div>
                  </div> */}
                </div>
                  }
                </Breakpoint>

                <Breakpoint xl>
                  <div className='menu'>
                    {/* <div className='navbar-item'>
                        <div ref={ref}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                            onMouseEnter={handleBtnClick} onMouseLeave={closeMenu}>
                            Home
                            <span className='lines'></span>
                            {openMenu && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu}>
                                <NavLink to="/">Homepage</NavLink>
                                <NavLink to="/home1">Homepage 1</NavLink>
                                <NavLink to="/home2">Homepage 2</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                          
                        </div>
                    </div> */}
                    <div className='navbar-item'>
                      <NavLink to="/home2">
                      Home
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                    {/* <div className='navbar-item'>
                      <div ref={ref1}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                            onMouseEnter={handleBtnClick1} onMouseLeave={closeMenu1}>
                            Explore
                            <span className='lines'></span>
                            {openMenu1 && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu1}>
                              <NavLink to="/explore">Explore</NavLink>
                              <NavLink to="/explore2">Explore 2</NavLink>
                              <NavLink to="/rangking">Rangking</NavLink>
                              <NavLink to="/colection">Collection</NavLink>
                              <NavLink to="/ItemDetail">Items Details</NavLink>
                              <NavLink to="/Auction">Live Auction</NavLink>
                              <NavLink to="/helpcenter">Help Center</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                          
                        </div>
                    </div> */}
                    {/* <div className='navbar-item'>
                      <div ref={ref2}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                            onMouseEnter={handleBtnClick2} onMouseLeave={closeMenu2}>
                            Pages
                            <span className='lines'></span>
                            {openMenu2 && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu2}>
                              <NavLink to="/Author">Author</NavLink>
                              <NavLink to="/wallet">Wallet</NavLink>
                              <NavLink to="/create">Create</NavLink>
                              <NavLink to="/news">News</NavLink>
                              <NavLink to="/works">Gallery</NavLink>
                              <NavLink to="/login">login</NavLink>
                              <NavLink to="/loginTwo">login 2</NavLink>
                              <NavLink to="/register">Register</NavLink>
                              <NavLink to="/contact">Contact Us</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                        </div>
                    </div> */}
                    <div className='navbar-item'>
                      <NavLink to="/collection">
                      My Cars
                      <span className='lines'></span>
                      </NavLink>
                    </div>
                    {/* <div className='navbar-item'>
                      <div ref={ref3}>
                          <div className="dropdown-custom dropdown-toggle btn" 
                            onMouseEnter={handleBtnClick3} onMouseLeave={closeMenu3}>
                            Elements
                            <span className='lines'></span>
                            {openMenu3 && (
                            <div className='item-dropdown'>
                              <div className="dropdown" onClick={closeMenu3}>
                              <NavLink to="/elegantIcons">Elegant Icon</NavLink>
                              <NavLink to="/etlineIcons">Etline Icon</NavLink>
                              <NavLink to="/fontAwesomeIcons">Font Awesome Icon</NavLink>
                              <NavLink to="/accordion">Accordion</NavLink>
                              <NavLink to="/alerts">Alerts</NavLink>
                              <NavLink to="/price">Pricing Table</NavLink>
                              <NavLink to="/progressbar">Progess Bar</NavLink>
                              <NavLink to="/tabs">Tabs</NavLink>
                              </div>
                            </div>
                          )}
                          </div>
                        </div>
                    </div> */}
                  </div>
                </Breakpoint>
              </BreakpointProvider>

              <div className='mainside'>
                {!account ? (
                  <Button className="coinracer-header__connect-wallet-btn mx-3 my-3" onClick={handleConnectWallet}>
                    CONNECT WALLECT
                  </Button>
                ) : (
                  <Dropdown className="align-self-center">
                    <Dropdown.Toggle className="coinracer-header__connect-wallet-btn">
                      {ellipseAddress(account)}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleDisconnectWallet}>Disconnect</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
                  
      </div>

        <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
          <div className="menu-line white"></div>
          <div className="menu-line1 white"></div>
          <div className="menu-line2 white"></div>
        </button>

      </div>     
    </header>
    );
}
export default Header;
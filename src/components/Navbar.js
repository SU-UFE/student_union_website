import React from 'react'
import { Link } from 'gatsby'

import zurag from '../../static/img/reallogo.svg'
import Search from './GatsbySearch'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger() {
    // toggle the active boolean in the state
    this.setState(
      { active: !this.state.active },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className='navbar is-transparent has-shadow is-fixed-top  '
        role='navigation'
        aria-label='main-navigation'
      >
        <div className='container a py-3 '>
          <div className='navbar-brand'>
            <Link
              to='/'
              className='navbar-item'
              title='Logo'
              style={{ padding: '0' }}
            >
              <img src={zurag} alt='holboo' style={{ width: '230px' }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target='navMenu'
              role='menuitem'
              tabIndex={0}
              onKeyPress={() => this.toggleHamburger()}
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id='navMenu'
            className={`navbar-menu ${this.state.navBarActiveClass}`}
            style={{ justifyContent: 'space-between' }}
          >
            <div className='navbar-start has-text-centered is-size-5'>
              <Link className='navbar-item ' to='/'>
                Нүүр хуудас
              </Link>
              <div className='navbar-item has-dropdown is-hoverable'>
                <Link className='navbar-item' to='/aboutus'>
                  Бидний тухай
                  <div class='navbar-dropdown is-boxed'>
                    <Link className='navbar-item' to='/aboutus'>
                      Бидэнтэй хамт
                    </Link>
                    <hr className='navbar-divider' />
                    <Link className='navbar-item' to='/documents'>
                      Баримт бичиг
                    </Link>
                    <hr className='navbar-divider' />
                    <Link className='navbar-item' to='/holbogdoh'>
                      Холбогдох
                    </Link>
                  </div>
                </Link>
              </div>
              <Link className='navbar-item' to='/club'>
                Клуб
              </Link>
              <Link className='navbar-item' to='/event'>
                Арга хэмжээ
              </Link>
              <Link className='navbar-item' to='/news'>
                Мэдээ мэдээлэл
              </Link>
              <Link className='navbar-item' to='/ufepedia'>
                UFEpedia
              </Link>

              <Link className='navbar-item' to='/contact'>
                Санал хүсэлт
              </Link>
            </div>
            <div class='navbar-end'>
              <div class='navbar-item a' style={{ position: 'fixed' }}>
                <Search />
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar

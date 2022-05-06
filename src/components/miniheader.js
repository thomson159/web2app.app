import React, { useRef, useState } from 'react'

import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Uni from '../images/uni.inline.svg'
import { Sun, Moon, Home } from 'react-feather'

import MenuIcon from '../images/menu.inline.svg'
import CloseIcon from '../images/x.inline.svg'
import Discord from '../images/discord.inline.svg'
import Github from '../images/githubicon.inline.svg'

import { useDarkMode } from '../contexts/Application'

const StyledHeader = styled.header`
  display: flex;
  position: fixed;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey4};
  left: 0px;
  padding: 1rem 1.25rem;
  width: 100%;
  z-index: 3;
  height: 65px;
  max-width: 100vw;
  min-width: 100vw;
  @media (max-width: 960px) {
    flex-direction: column;
    padding: 1.5rem 2rem;
    height: ${({ open }) => (open ? '100vh' : '125px;')};
  }
`
const StyledButton = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.colors.textColor};
  :focus {
    outline: none;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
  a {
    height: 24px;
    color: ${({ theme }) => theme.textColor};
  }
  svg path {
    fill: ${({ theme, fill }) => fill && theme.textColor};
    stroke: ${({ theme }) => theme.textColor};
  }
`

const StyledNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: right 0.25s ease;
  @media (max-width: 960px) {
    position: fixed;
    top: 0px;
    right: ${({ open }) => (open ? '0px' : '-100%')};
    align-items: flex-start;
    flex-wrap: wrap;
    -webkit-overflow-scrolling: touch;
    background-color: ${({ theme }) => theme.colors.grey1};
    width: 100%;
    height: 100%;
    z-index: 999;
    padding: 2rem;
    overflow: auto;
    box-shadow: ${({ theme }) => theme.shadows.huge};
  }
`

const StyledNavTitleWrapper = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const StyledHomeLink = styled(Link)`
  max-height: 48px;
  display: flex;
  align-items: center;
`

const StyledUni = styled(Uni)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  margin: 0;
  width: 20px;
  height: 20px;
  margin-right: 0.35rem;
  margin-top: -4px;
  transform: rotate(0deg);
  transition: transform 0.2s linear;
  :hover {
    transform: rotate(-10deg);
  }
`

const StyledCloseIcon = styled(CloseIcon)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.textColor};
  }
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const MenuToggle = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.grey9};
  display: none;
  z-index: 9999;
  width: 24px;
  height: 24px;
  padding: 0px;

  :focus {
    outline: none;
  }
  @media (max-width: 960px) {
    display: initial;
    position: ${({ open }) => (open ? 'fixed' : 'relative')};
    right: ${({ open }) => (open ? '1.5rem' : 'initial')};
    top: ${({ open }) => (open ? '1.5rem' : 'initial')};
  }
`

const Header = () => {
  const node = useRef()
  const [darkMode, toggleDarkMode] = useDarkMode()

  const button = useRef()
  const [isMenuOpen, updateIsMenuOpen] = useState(false)

  return (
    <StyledHeader open={isMenuOpen}>
      <Row>
        <StyledNavTitleWrapper>
          <StyledHomeLink to="/" style={{ textDecoration: `none` }}>
            <StyledUni />
          </StyledHomeLink>
        </StyledNavTitleWrapper>
        <MenuToggle ref={button} open={isMenuOpen} onClick={() => updateIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <StyledCloseIcon /> : <StyledMenuIcon />}
        </MenuToggle>
        <StyledNav ref={node} open={isMenuOpen}>
          <StyledButton type="button" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </StyledButton>
          <StyledButton fill>
            <a href="https://discord.gg/FCfyBSbCU5">
              <Discord />
            </a>
          </StyledButton>
          <StyledButton fill>
            <a href="https://github.com/Uniswap">
              <Github width={20} />
            </a>
          </StyledButton>
          <StyledButton type="button">
            <Link to="/">
              <Home size={20} />{' '}
            </Link>
          </StyledButton>
        </StyledNav>
      </Row>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header

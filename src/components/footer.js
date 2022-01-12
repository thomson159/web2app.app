import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import Github from '../images/github.inline.svg'
import Discord from '../images/discord.inline.svg'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  position: relative;
  padding: 2rem;

  @media (max-width: 960px) {
    padding: 1rem;
  }
`

const StyledFooterLinkSection = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`

const StyledFooterLink = styled(Link)`
  margin-right: 12px;
  color: ${({ theme }) => theme.textColor};
`

export const StyledDiscord = styled(Discord)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }

  width: 32px;
  height: 32px;
`

const StyledGithub = styled(Github)`
  path {
    fill: ${({ theme }) => theme.textColor};
  }
  width: 32px;
  height: 32px;
  margin-right: 12px;
`

const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterLinkSection>
        <StyledFooterLink to="/"></StyledFooterLink>
        <a href="https://github.com/thomson159/web2app.app" rel="noopener noreferrer" target="_blank">
          <StyledGithub />
        </a>
        {/* <a href="https://discord.gg/cf8cZ8Vw" rel="noopener noreferrer" target="_blank">
          <StyledDiscord />
        </a> */}
      </StyledFooterLinkSection>
    </StyledFooter>
  )
}
export default Footer

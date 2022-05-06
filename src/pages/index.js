import React, { useState } from 'react'
import styled from 'styled-components'
import Layout from '../layouts'
import SEO from '../components/seo'
import { Button } from '../components/button'
import DevImage from '../images/developer.png'
import GovImage from '../images/governance.png'
import AppsImage from '../images/apps.png'
import BG from '../components/bg'
import ImageCa from '../images/ca.png'
import ImageBu from '../images/bu.png'
import { useDarkMode } from '../contexts/Application'
import axios from 'axios'
import CookieConsent from 'react-cookie-consent'

const StyledBody = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.buttonBorder};
  @media (max-width: 960px) {
    margin-bottom: 0;
    padding: 1rem;
    padding-bottom: 3rem;
  }
`

const StyledTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  will-change: transform;
  align-items: flex-start;
  margin-bottom: 4rem;
`

const StyledBodyTitle = styled.h1`
  font-size: 56px;
  white-space: wrap;
  overflow-wrap: normal;
  margin: 2rem 0 2rem 0;

  @media (max-width: 640px) {
    width: 100%;
    font-weight: 500;
    text-align: left;
    font-size: 58px;
  }

  @media (max-width: 440px) {
    font-weight: 500;
    text-align: left;
    font-size: 52px;
  }
`
const StyledBodySubTitle = styled.h2`
  max-width: 720px;
  line-height: 125%;
  font-weight: 400;
  text-align: left;

  @media (max-width: 640px) {
    text-align: left;
  }
`

const StyledBodySubText = styled.h3`
  max-width: 960px;
  line-height: 140%;
  opacity: 0.8;
  @media (max-width: 640px) {
    text-align: left;
  }
`

const StyledItemRow = styled.nav`
  display: flex;
  flex-direction: column;

  margin: 0rem;
  & > *:not(:first-of-type) {
    margin-top: 12px;
  }
  @media (min-width: 960px) {
    flex-direction: row;
    & > * {
      margin-bottom: 12px;
    }
    & > *:not(:first-of-type) {
      margin-top: 0;
      margin-left: 12px;
    }
  }
`

const StyledItemColumn = styled.nav`
  display: flex;
  flex-direction: column;

  & > *:not(:last-of-type) {
    margin-bottom: 12px;
  }
`

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.cardBG};
  border: 1px solid ${({ theme }) => theme.buttonBorder};
  padding: 2rem;
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.huge};
`

const StyledTradeButton = styled.button`
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  background-color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  color: white;
  border-radius: 12px;
  display: inline-block;
  font-weight: 500;
  width: 100%;
  width: min-content;
  white-space: nowrap;
  margin-left: 1rem;
  border: 1px solid transparent;
  box-shadow: ${({ theme }) => theme.shadows.small};
  background: linear-gradient(128.17deg, #BD00FF -14.78%, #FF1F8A 110.05%);

  :hover,
  :focus {
    border: 1px solid white;
  }
`

const StyledInput = styled.input`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.grey9};
  background-color: transparent;
  position: relative;
  font-weight: 500;
  outline: none;
  width: 100%;
  border: none;
  float: "left";
  font-size: 24px;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  border-bottom: 1px solid;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  [type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::placeholder {
  }
`

const IndexPage = props => {
  const [url, setUrl] = useState('')
  const [show, setShow] = useState('url')
  const [finalUrl, setFinalUrl] = useState('')
  const [darkMode] = useDarkMode()

  async function handleSubmit(e) {
    e.preventDefault()
    setShow('load')
    try {
      const response = await axios.post(`https://api.web2app.app/create`, JSON.stringify({
        url: url
      }))

      if (response.status === 200) {
        var urlRegex = /(https?:\/\/[^]*.apk)/
        const matches = await response.json().responseLogs.substring(500).match(urlRegex)[0]
        setFinalUrl(matches)
        setShow('success')
      } else {
        setShow('error')
      }
    } catch {
      setShow('error')
    }
  }

  return (
    <Layout path={props.location.pathname} id='up'>
      <CookieConsent
        location="bottom"
        buttonText="OK"
        cookieName="web2app-cookies"
        expires={150}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
      <SEO title='Turn website into app' path={props.location.pathname} description='Turn website into app' />
      <BG />
      <img src={!darkMode ? ImageCa : ImageBu} alt="character"
        style={{
          position: 'fixed',
          top: 140,
          left: 900,
          width: 600,
        }} />
      <StyledBody>
        <StyledTitle>
          <StyledBodyTitle>
            <span style={{ fontWeight: 200 }}>Turn </span>
            web<span style={{ fontWeight: 200 }}>site in</span>to app
          </StyledBodyTitle>
          {show === 'url' &&
            <form onSubmit={handleSubmit}>
              <StyledBodySubTitle>
                <span role='img' aria-label='img'>😎</span> Free. No account. Enter the website address.
              </StyledBodySubTitle>
              <StyledInput
                required={true}
                value={url}
                onChange={e => setUrl(e.target.value)}
                type='url'
                placeholder='https://yourwebsite.com/'
              />
              <StyledTradeButton type='submit'>
                Create app
              </StyledTradeButton>
              <div style={{ marginTop: 30 }}>
                Estimated time is 20 minutes.
                <br />To download the application, you must have a permanent internet connection.
                <br />You cannot turn off the website and you have to wait until the app is built.
              </div>
            </form>
          }
          {show === 'load' &&
            <>
              <StyledBodySubTitle>
                ️<span role='img' aria-label='img'>⏱</span> Application development is in progress.
              </StyledBodySubTitle>
              <div className='lds-ring' style={{ marginBottom: 10 }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              Don't turn off the page. This may take a while. Estimated time is 20 minutes.
              <br />The availability of the offer and the time of building the application depend on the server load.
            </>
          }
          {show === 'error' &&
            <>
              <StyledBodySubTitle>
                <span role='img' aria-label='img'>😡</span> Something went wrong. Please try again later.
              </StyledBodySubTitle>
            </>
          }
          {show === 'success' &&
            <>
              <StyledBodySubTitle>
                <span role='img' aria-label='img'>👍</span> Application development completed successfully.
              </StyledBodySubTitle>
              <StyledTradeButton onClick={() => { window.open(finalUrl, '_blank') }}>
                Download app
              </StyledTradeButton>
            </>
          }
          <StyledItemColumn style={{ marginTop: 80 }}>
            <Button style={{ borderRadius: '20px' }} outlined href='#offer'>
              <div>
                <StyledBodySubTitle style={{ marginBottom: '0.25rem' }}>
                  <b>Free Demo <span>↗</span></b>
                </StyledBodySubTitle>
                <StyledBodySubTitle style={{ marginBottom: '0.25rem', fontSize: 20 }}>
                  Application available only on Android.
                </StyledBodySubTitle>
                <StyledInfoText style={{ opacity: '0.6' }}>
                  Find out more about the offer.
                </StyledInfoText>
              </div>
            </Button>
          </StyledItemColumn>
        </StyledTitle>
        <EcosystemSection props={props} />
        <DeveloperSection props={props} />
      </StyledBody>
    </Layout >
  )
}

export default IndexPage

const StyledSectionHeader = styled.h1`
  font-size: 20px;
  white-space: wrap;
  overflow-wrap: normal;
  max-width: 900px;
  font-weight: 500;

  a {
    color: ${({ theme }) => theme.textColor};
  }

  @media (max-width: 960px) {
    width: 100%;
    line-height: 2.5rem;
    max-width: 600px;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    font-weight: 400;
    text-align: left;
  }
`

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;

  @media (max-width: 640px) {
    margin: 0;
  }
`

export const DeveloperCard = styled(StyledCard)`
  mix-blend-mode: ${({ isDark }) => (isDark ? 'overlay' : 'lighten')};
  background: url(${DevImage});
  color: white;
  background-size: cover;
  background-repeat: no-repeat;
`

export const GovernanceCard = styled(StyledCard)`
  mix-blend-mode: ${({ isDark }) => (isDark ? 'overlay' : 'lighten')};
  background: url(${GovImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 12px;
  @media (max-width: 960px) {
    margin-bottom: 12px;
    margin-right: 0px;
  }
`

export const AppsCard = styled(StyledCard)`
  background: url(${AppsImage});
  background-size: cover;
  background-repeat: no-repeat;
  margin-right: 12px;
  width: 100%;
  min-height: 290px;
  max-width: 590px;

  h1 {
    font-size: 48px;
    font-weight: 700;
    margin: 0;
    margin-bottom: 0.25rem;
  }

  p {
    opacity: 0.6;
    font-size: 20px;
    font-weight: 300;
  }

  @media (max-width: 960px) {
    margin-bottom: 12px;
    margin-right: 0px;
    max-width: unset;
  }
`

export const GrantsCard = styled(StyledCard)`
  max-width: 375px;
  @media (max-width: 960px) {
    max-width: unset;
  }
`

const StyledInfoText = styled.div`
  text-align: 'left';
  opacity: 1;
  margin: 0;
  font-size: 16px;
  font-weight: 400px;
`

const EcosystemSection = () => {
  return (
    <StyledSection id='offer'>
      <StyledItemRow>
        <span>
          <StyledSectionHeader>How does this work? →</StyledSectionHeader>
          <StyledBodySubText style={{ marginRight: '48px' }}>
            The application displays the content of the website.
            <br />The website must be adapted to mobile devices.
          </StyledBodySubText>
        </span>
      </StyledItemRow>
    </StyledSection>
  )
}

const DeveloperSection = () => {
  return (
    <>
      <StyledSection>
        <StyledItemRow>
          <StyledItemColumn>
            <Button style={{ backdropFilter: 'blur(4px)', borderRadius: '20px' }} outlined href='#up'>
              <StyledBodySubTitle style={{ marginBottom: '0.25rem' }}>
                <b>Demo <span>↗</span></b>
              </StyledBodySubTitle>
              <StyledBodySubTitle style={{ marginBottom: '0.25rem', fontSize: 20 }}>
                Free
              </StyledBodySubTitle>
              <StyledInfoText>
                🛠 Application available only on Android.
                <br />
                🛠 The offer allows you to download a .apk file with a size of 56.4 MB once.
                <br />
                🛠 The application requires a permanent internet connection.
                <br />
                ✅ You don't have to worry about updating the application. If you make changes to the website, the application will be updated automatically.
                <br />
                ✅ To build the application, you only need to enter the website address. You can enter any address. You
                don't need to be the site owner and have access to the code or the server.
                <br />
                ❌ You cannot set your icon, application name and assign applications with your own keys.
                <br />
                ❌ The application cannot be customized and implemented to the Google Play store and other stores.
                <br />
                ❌ It is not possible to make additional changes in the application.
                <br />
                ❌ We do not provide technical support, but if we have such an opportunity, we will be happy to answer
                your questions.
              </StyledInfoText>
            </Button>
          </StyledItemColumn>
        </StyledItemRow>
      </StyledSection>
      <div style={{ marginTop: '4rem' }}>
        Illustration by <a rel='noreferrer' target='_blank' href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">Icons 8</a> from <a rel='noreferrer' target='_blank' href="https://icons8.com/illustrations">Ouch!</a>
      </div>
    </>
  )
}

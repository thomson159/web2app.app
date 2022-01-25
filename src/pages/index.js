import React, { useState } from 'react'
import styled from 'styled-components'
import Layout from '../layouts'
import SEO from '../components/seo'
import { Button } from '../components/button'
import DevImage from '../images/developer.png'
import GovImage from '../images/governance.png'
import AppsImage from '../images/apps.png'

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
    padding-bottom: 8rem;
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
  @media (max-width: 1024px) {
    margin: 2rem 0 0rem 0;
  }

  @media (max-width: 640px) {
    width: 100%;
    margin: 2rem 0 2rem 0;
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

  async function handleSubmit(e) {
    e.preventDefault()
    setShow('load')
    const data = {
      url: url
    }
    try {
      const response = await fetch('https://api.web2app.app/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://api.web2app.app/'
        },
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify(data)
      })
      const test = await response.json()
      if (response.status === 200) {
        var urlRegex = /(https?:\/\/[^ ]*)/
        const matches = test.responseLogs.substring(500).match(urlRegex)[0]
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
      <SEO title='' path={props.location.pathname} description='' />
      <StyledBody>
        <StyledTitle>
          <StyledBodyTitle>
            <span style={{ fontWeight: 200 }}>Turn website </span>
            into app
          </StyledBodyTitle>
          {show === 'url' &&
            <form onSubmit={handleSubmit}>
              <StyledBodySubTitle>
                😎 Enter the website address.
              </StyledBodySubTitle>
              <StyledItemRow>
                <StyledInput
                  required={true}
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  type='url'
                  placeholder='https://yourwebsite.com/'
                />
              </StyledItemRow>
              <b>
                Free. No account. Estimated time is 20 minutes.
              </b>
              <div style={{ marginTop: 30 }}>
              </div>
              <StyledTradeButton type='submit'>
                Create app
              </StyledTradeButton>
            </form>
          }
          {show === 'load' &&
            <>
              <StyledBodySubTitle>
                ️⏱ Application development is in progress.
              </StyledBodySubTitle>
              <div className='lds-ring' style={{ marginBottom: 10 }}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              Wait. This may take a while. The availability of the offer and the time of building the application depend on the server load.
            </>
          }
          {show === 'error' &&
            <>
              <StyledBodySubTitle>
                😡 Something went wrong. Please try again later.
              </StyledBodySubTitle>
            </>
          }
          {show === 'success' &&
            <>
              <StyledBodySubTitle>
                👍 Application development completed successfully.
              </StyledBodySubTitle>
              <StyledTradeButton onClick={() => { window.open(finalUrl, '_self') }}>
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
                  Application available only on <span><b>Android</b></span>.
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
    margin-top: 4rem;
  }
  
  @media (max-width: 640px) {
    width: 100%;
    font-weight: 400;
    margin-top: 4rem;
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
    <StyledSection>
      <StyledItemRow>
        <span>
          <StyledSectionHeader>How does this work? →</StyledSectionHeader>
          <StyledBodySubText style={{ marginRight: '48px' }}>
            The application displays the content of the website.
            The website must be adapted to mobile devices.
          </StyledBodySubText>
        </span>
      </StyledItemRow>
    </StyledSection>
  )
}

const DeveloperSection = () => {
  return (
    <>
      <StyledSection id='offer'>
        <StyledItemRow>
          <StyledItemColumn>
            <Button style={{ borderRadius: '20px' }} outlined href='#up'>
              <div>
                <StyledBodySubTitle style={{ marginBottom: '0.25rem' }}>
                  <b>Demo <span>↗</span></b>
                </StyledBodySubTitle>
                <StyledBodySubTitle style={{ marginBottom: '0.25rem', fontSize: 20 }}>
                  Free
                </StyledBodySubTitle>
                <StyledInfoText>
                  🛠 Application available only on <b><span>Android</span></b>.
                </StyledInfoText>
                <StyledInfoText>
                  🛠 The offer allows you to download a <b><span>.apk</span></b> file with a size of 56.4 MB once.
                </StyledInfoText>
                <StyledInfoText>
                  🛠 The application works in a hybrid manner. It is a combination of two solutions, a native application and a web application. This means that the website gains the advantages of a native solution.
                </StyledInfoText>
                <StyledInfoText>
                  🛠 The application requires a permanent internet connection.
                </StyledInfoText>
                <StyledInfoText>
                  ✅ You don't have to worry about updating the application.
                  If you make changes to the website, the application will be updated automatically.
                </StyledInfoText>
                <StyledInfoText>
                  ✅ To build the application, you only need to enter the website address. You can enter any address. You
                  don't need to be the site owner and have access to the code or the server.
                </StyledInfoText>
                <StyledInfoText>
                  ✅ You don't need to create an account.
                </StyledInfoText>
                <StyledInfoText>
                  ❌ The availability of the offer and the time of building the application depend on the server load.
                </StyledInfoText>
                <StyledInfoText>
                  ❌ You cannot set your icon, application name and assign applications with your own keys.
                </StyledInfoText>
                <StyledInfoText>
                  ❌ The application cannot be customized and implemented to the Google Play store and other stores.
                </StyledInfoText>
                <StyledInfoText>
                  ❌ It is not possible to make additional changes in the application.
                </StyledInfoText>
                <StyledInfoText>
                  ❌ The application cannot be stored on our website. To download the application, you must have a
                  permanent internet connection. You cannot turn off the website and you have to wait until the app is
                  built.
                </StyledInfoText>
                <StyledInfoText>
                  ❌ We do not provide technical support, but if we have such an opportunity, we will be happy to answer
                  your questions.
                </StyledInfoText>
              </div>
            </Button>
          </StyledItemColumn>
        </StyledItemRow>
      </StyledSection>
    </>
  )
}

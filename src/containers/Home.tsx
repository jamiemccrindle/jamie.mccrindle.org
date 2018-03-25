import React from 'react';
import { withSiteData, Link } from 'react-static';

import backgroundMe from '../images/background-me.jpg';
import glamorous from 'glamorous';
import { RollingTextEffect } from '../components/RollingTextEffect';

import FaGithub from 'react-icons/lib/fa/github';
import FaTwitter from 'react-icons/lib/fa/twitter';
import FaLinkedin from 'react-icons/lib/fa/linkedin';
import FaAt from 'react-icons/lib/fa/at';

const BackgroundMeImg = glamorous.div({
  width: '100%',
  position: 'absolute',
  height: '100vh',
  backgroundImage: `url(${backgroundMe})`,
  backgroundSize: 'cover',
  zIndex: -3,
  top: 0,
  left: 0,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const OverlayDiv = glamorous.div({
  width: '100%',
  position: 'absolute',
  height: '100vh',
  zIndex: -2,
  top: 0,
  left: 0,
  opacity: 0.6,
  backgroundColor: 'black',
});

const CoverDiv = glamorous.div({
  position: 'relative'
});

const ContentDiv = glamorous.div({
})

const HeaderAndMeDiv = glamorous.div({
  height: '100vh',
  display: 'flex',
  flexFlow: 'column',
})

const HeaderDiv = glamorous.div({
  flex: 0,
});

const NavUl = glamorous.ul({
  margin: 0,
  padding: 0,
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  listStyleType: 'none',
});

const NavLi = glamorous.li({
  margin: 0,
  padding: '1rem',
  fontWeight: 100,
  '> a': {
    color: 'white',
    textDecoration: 'none',
    '&:hover': {
      textShadow: '0 0 5px white'
    }
  }
});

const ActiveNavLi = glamorous(NavLi)({
  fontSize: '2rem',
});

const MeAndLinksDiv = glamorous.div({
  flex: 1,
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center',
  justifyContent: 'center'
})

const MeDiv = glamorous.div({

});

const MeH1 = glamorous.h1({
  textShadow: '0 0 20px white',
  '@media(max-width: 768px)': {
    fontSize: 60,
    textShadow: '0 0 10px white',
  },
  fontSize: 120,
  color: 'white',
  fontWeight: 100,
  fontFamily: 'Consolas, Monaco, Menlo, "Lucida Console", monospace',
  margin: 0,
  userSelect: 'none',
  textAlign: 'center',
});

const LinksToMeDiv = glamorous.div({
  // borderTop: '2px solid white',
  paddingTop: '0.5rem',
  display: 'flex',
  flexFlow: 'row',
  '> a': {
    padding: '0 0.5rem',
    color: 'white',
    fontSize: '1.4rem',
  }
});

const LinkA = glamorous.a({

});

export default withSiteData(() => (
  <ContentDiv>
    <CoverDiv>
      <OverlayDiv />
      <BackgroundMeImg src={backgroundMe} alt="me" />
      <HeaderAndMeDiv>
        <HeaderDiv>
          <NavUl>
            {/* <ActiveNavLi><Link to="/">Home</Link></ActiveNavLi>
            <NavLi><Link to="/blog">Words</Link></NavLi> */}
          </NavUl>
        </HeaderDiv>
        <MeAndLinksDiv>
          <MeDiv>
            <MeH1>
              <RollingTextEffect
                messages={[
                  'Developer',
                  'CTO',
                  'Founder',
                ]}
              />
            </MeH1>
          </MeDiv>
          <LinksToMeDiv>
            <LinkA href="https://github.com/jamiemccrindle" alt="github"><FaGithub/></LinkA>
            <LinkA href="https://twitter.com/foldr" alt="twitter"><FaTwitter/></LinkA>
            <LinkA href="https://www.linkedin.com/in/jamiemccrindle" alt="linkedin"><FaLinkedin/></LinkA>
            <LinkA href="mailto:jamiemccrindle@gmail.com" alt="email"><FaAt/></LinkA>
          </LinksToMeDiv>
        </MeAndLinksDiv>
      </HeaderAndMeDiv>
    </CoverDiv>
  </ContentDiv>
))

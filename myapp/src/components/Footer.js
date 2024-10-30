import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <GradientLine />
      <FooterContent>
        <FooterGrid>
          <BrandSection>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BrandName>
                Code<span className="highlight">X</span>
              </BrandName>
              <BrandDescription>
                Empowering the next generation of developers through innovative education.
              </BrandDescription>
              <SocialLinks>
                {['twitter', 'github', 'linkedin', 'youtube'].map((platform) => (
                  <SocialIcon
                    key={platform}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={`https://${platform}.com/codex`}>
                      <img
                        src={`/api/placeholder/24/24`}
                        alt={`${platform} icon`}
                      />
                    </Link>
                  </SocialIcon>
                ))}
              </SocialLinks>
            </motion.div>
          </BrandSection>

          {[
            {
              title: 'Platform',
              links: ['Courses', 'Workshops', 'Mentorship', 'Community'],
            },
            {
              title: 'Resources',
              links: ['Blog', 'Documentation', 'Guides', 'API'],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Contact', 'Press'],
            },
          ].map((section, index) => (
            <LinksSection
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <SectionTitle>{section.title}</SectionTitle>
              <LinksList>
                {section.links.map((link) => (
                  <LinkItem
                    key={link}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link to={`/${link.toLowerCase()}`}>{link}</Link>
                  </LinkItem>
                ))}
              </LinksList>
            </LinksSection>
          ))}
        </FooterGrid>

        <Divider />

        <BottomSection>
          <Copyright>
            © {currentYear} CodeX. All rights reserved.
          </Copyright>
          <LegalLinks>
            {['Terms', 'Privacy', 'Security'].map((item, index) => (
              <React.Fragment key={item}>
                <LegalLink
                  whileHover={{ color: '#00c4ff' }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                </LegalLink>
                {index < 2 && <span>•</span>}
              </React.Fragment>
            ))}
          </LegalLinks>
        </BottomSection>
      </FooterContent>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  position: relative;
  background: #0a0a0a;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const GradientLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    #00c4ff 20%,
    #00ff8f 50%,
    #00c4ff 80%,
    transparent 100%
  );
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BrandSection = styled.div`
  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }
`;

const BrandName = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;

  .highlight {
    background: linear-gradient(120deg, #00c4ff, #00ff8f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const BrandDescription = styled.p`
  color: #a0a0a0;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  max-width: 400px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled(motion.div)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 196, 255, 0.2);
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

const LinksSection = styled(motion.div)``;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  background: linear-gradient(120deg, #00c4ff, #00ff8f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled(motion.li)`
  margin-bottom: 0.8rem;

  a {
    color: #a0a0a0;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #ffffff;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 3rem 0 2rem;
`;

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const LegalLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    color: #666;
    font-size: 0.8rem;
  }
`;

const LegalLink = styled(motion.div)`
  a {
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.3s ease;

    &:hover {
      color: #00c4ff;
    }
  }
`;

export default Footer;
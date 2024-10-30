import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import keyframes from 'styled-components';

const noise = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -5%); }
  20% { transform: translate(-10%, 5%); }
  30% { transform: translate(5%, -10%); }
  40% { transform: translate(-5%, 15%); }
  50% { transform: translate(-10%, 5%); }
  60% { transform: translate(15%, 0); }
  70% { transform: translate(0, 10%); }
  80% { transform: translate(-15%, 0); }
  90% { transform: translate(10%, 5%); }
`;

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    company: "TechCorp",
    image: "/api/placeholder/80/80",
    text: "CodeX transformed my career. The interactive learning approach and expert mentoring helped me land my dream job in just 6 months.",
    rating: 5
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Software Engineer",
    company: "StartupX",
    image: "/api/placeholder/80/80",
    text: "The project-based curriculum is incredibly effective. I built a real-world portfolio that impressed employers right away.",
    rating: 5
  },
  {
    id: 3,
    name: "Maya Patel",
    role: "Frontend Developer",
    company: "DesignLabs",
    image: "/api/placeholder/80/80",
    text: "The mentorship program exceeded my expectations. Having an industry expert guide me made all the difference in my learning journey.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <Container>
      <GradientOverlay />
      <NoiseOverlay />
      
      <Content
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Header>
          <Title>
            Student <span className="highlight">Success</span> Stories
          </Title>
          <Subtitle>
            Join thousands of developers who have transformed their careers with CodeX
          </Subtitle>
        </Header>

        <TestimonialsWrapper>
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => setAutoplay(false)}
              onMouseLeave={() => setAutoplay(true)}
            >
              <CardContent>
                <QuoteIcon>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"
                      fill="currentColor"
                    />
                  </svg>
                </QuoteIcon>
                
                <TestimonialText>{testimonials[activeIndex].text}</TestimonialText>
                
                <AuthorInfo>
                  <AuthorImage src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} />
                  <AuthorDetails>
                    <AuthorName>{testimonials[activeIndex].name}</AuthorName>
                    <AuthorRole>
                      {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                    </AuthorRole>
                  </AuthorDetails>
                </AuthorInfo>

                <Rating>
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i}>★</Star>
                  ))}
                </Rating>
              </CardContent>

              <CardGlow />
            </TestimonialCard>
          </AnimatePresence>

          <Navigation>
            {testimonials.map((_, index) => (
              <NavDot
                key={index}
                active={index === activeIndex}
                onClick={() => {
                  setActiveIndex(index);
                  setAutoplay(false);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </Navigation>
        </TestimonialsWrapper>
      </Content>
    </Container>
  );
};

const Container = styled.section`
  position: relative;
  min-height: 100vh;
  background: #0a0a0a;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, 
    rgba(16, 16, 16, 0.8) 0%,
    rgba(10, 10, 10, 0.9) 50%,
    rgba(8, 8, 8, 1) 100%
  );
  z-index: 1;
`;

const NoiseOverlay = styled.div`
  position: absolute;
  top: -200%;
  left: -100%;
  right: -100%;
  bottom: -100%;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  opacity: 0.15;
  animation: ${noise} 8s steps(1) infinite;
  z-index: 1;
  pointer-events: none;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  
  .highlight {
    background: linear-gradient(120deg, #00c4ff, #00ff8f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #a0a0a0;
  max-width: 600px;
  margin: 0 auto;
`;

const TestimonialsWrapper = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const TestimonialCard = styled(motion.div)`
  position: relative;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    rgba(0, 196, 255, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${TestimonialCard}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
`;

const QuoteIcon = styled.div`
  color: #00c4ff;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

const TestimonialText = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const AuthorImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #00c4ff;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  color: #ffffff;
  font-weight: 600;
  font-size: 1.1rem;
`;

const AuthorRole = styled.span`
  color: #a0a0a0;
  font-size: 0.9rem;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Star = styled.span`
  color: #00c4ff;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const NavDot = styled(motion.button)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.active ? '#00c4ff' : 'rgba(255, 255, 255, 0.2)'};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#00c4ff' : 'rgba(255, 255, 255, 0.4)'};
  }
`;

export default Testimonials;
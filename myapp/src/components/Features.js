import React from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #0a0a0a;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    
    @media (max-width: 1024px) {
      font-size: 14px;
    }
    
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const FeaturesPage = () => {
  const topRowFeatures = [
    {
      icon: "💻",
      title: "Interactive Coding",
      description: "Write, run, and debug code in real-time with instant feedback.",
      color: "#00c4ff"
    },
    {
      icon: "🎯",
      title: "Project-Based",
      description: "Build real-world applications that matter.",
      color: "#00ff8f"
    },
    {
      icon: "👥",
      title: "Expert Mentorship",
      description: "Get guidance from industry experts.",
      color: "#ff7eb6"
    },
    {
      icon: "🚀",
      title: "Career Growth",
      description: "Fast-track your development career.",
      color: "#7c3aed"
    }
  ];

  const bottomRowFeatures = [
    {
      icon: "🌐",
      title: "Modern Stack",
      description: "Learn cutting-edge technologies and practices.",
      color: "#fbbf24"
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Join a thriving developer community.",
      color: "#34d399"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <StyledWrapper>
        <GradientOverlay />
        <NoiseOverlay />
        <div className="container">
          <FeaturesContent>
            <HeaderSection
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlowText>
                Powerful <span className="highlight">Features</span> for Modern Developers
              </GlowText>
              <SubTitle>
                Discover the tools and resources that will accelerate your journey
              </SubTitle>
            </HeaderSection>

            <FeatureRows
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <TopRow>
                {topRowFeatures.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index}
                    style={{
                      background: `linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.95))`,
                    }}
                  >
                    <CardContent>
                      <FeatureIcon style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}40)` }}>
                        {feature.icon}
                      </FeatureIcon>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                      <GlowingBorder style={{ '--color': feature.color }} />
                    </CardContent>
                  </FeatureCard>
                ))}
              </TopRow>

              <BottomRow>
                {bottomRowFeatures.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    custom={index + 4}
                    style={{
                      background: `linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(26, 26, 26, 0.95))`,
                    }}
                  >
                    <CardContent>
                      <FeatureIcon style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}40)` }}>
                        {feature.icon}
                      </FeatureIcon>
                      <FeatureTitle>{feature.title}</FeatureTitle>
                      <FeatureDescription>{feature.description}</FeatureDescription>
                      <GlowingBorder style={{ '--color': feature.color }} />
                    </CardContent>
                  </FeatureCard>
                ))}
              </BottomRow>
            </FeatureRows>

            <CTASection
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <StartButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Learning Now
              </StartButton>
            </CTASection>
          </FeaturesContent>
        </div>
      </StyledWrapper>
    </>
  );
};

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-5px) rotate(1deg); }
  75% { transform: translateY(5px) rotate(-1deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const glowing = keyframes`
  0% { box-shadow: 0 0 5px var(--color), 0 0 10px var(--color), 0 0 15px var(--color); }
  50% { box-shadow: 0 0 10px var(--color), 0 0 20px var(--color), 0 0 25px var(--color); }
  100% { box-shadow: 0 0 5px var(--color), 0 0 10px var(--color), 0 0 15px var(--color); }
`;

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

const glow = keyframes`
  0% { text-shadow: 0 0 20px rgba(0, 196, 255, 0.3), 0 0 40px rgba(0, 196, 255, 0.2); }
  50% { text-shadow: 0 0 40px rgba(0, 196, 255, 0.4), 0 0 60px rgba(0, 196, 255, 0.3); }
  100% { text-shadow: 0 0 20px rgba(0, 196, 255, 0.3), 0 0 40px rgba(0, 196, 255, 0.2); }
`;

const StyledWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  background: #0a0a0a;
  overflow: hidden;
  width: 100%;

  .container {
    position: relative;
    z-index: 2;
    min-height: 100vh;
    width: 100%;
    padding: 0 1rem;
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

const FeaturesContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  height: 100vh;
  justify-content: center;
`;

const HeaderSection = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const GlowText = styled.h1`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  animation: ${glow} 3s infinite;
  line-height: 1.1;

  .highlight {
    background: linear-gradient(120deg, #00c4ff, #00ff8f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SubTitle = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: #a0a0a0;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const FeatureRows = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  padding: 0 15%;
`;

const CardContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  z-index: 1;
`;

const GlowingBorder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardContent}:hover & {
    opacity: 1;
    animation: ${glowing} 2s infinite;
  }
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  background: rgba(26, 26, 26, 0.9);
  border-radius: 16px;
  height: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const FeatureIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  animation: ${float} 6s ease-in-out infinite;
`;

const FeatureTitle = styled.h3`
  color: #ffffff;
  font-size: clamp(1rem, 1.25vw, 1.25rem);
  margin: 0;
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: #a0a0a0;
  font-size: clamp(0.875rem, 1vw, 1rem);
  line-height: 1.4;
  margin: 0;
  text-align: center;
`;

const CTASection = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const StartButton = styled(motion.button)`
  cursor: pointer;
  background: linear-gradient(135deg, #00c4ff, #00ff8f);
  color: #000000;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  box-shadow: 0 8px 24px rgba(0, 196, 255, 0.2);

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 196, 255, 0.4);
  }
`;

export default FeaturesPage;
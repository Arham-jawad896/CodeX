import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 20px rgba(0, 196, 255, 0.3), 0 0 40px rgba(0, 196, 255, 0.2); }
  50% { text-shadow: 0 0 40px rgba(0, 196, 255, 0.4), 0 0 60px rgba(0, 196, 255, 0.3); }
  100% { text-shadow: 0 0 20px rgba(0, 196, 255, 0.3), 0 0 40px rgba(0, 196, 255, 0.2); }
`;

// Styles
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

    @media (max-width: 768px) {
      padding: 0 0.5rem;
    }
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

const HeroContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4rem;

  @media (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 2rem 1rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    padding: 5rem 0.5rem 1rem 0.5rem;
    min-height: auto;
  }
`;

const TextSection = styled(motion.div)`
  flex: 1;
  max-width: 600px;

  @media (max-width: 1200px) {
    max-width: 100%;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem;
  }
`;

const GlowText = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  animation: ${glow} 3s infinite;
  line-height: 1.1;

  .highlight {
    background: linear-gradient(120deg, #00c4ff, #00ff8f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    margin-top: 95px;
    margin-bottom: 1rem;
  }
`;

const SubTitle = styled.p`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #a0a0a0;
  margin-bottom: 2.5rem;
  animation: ${fadeIn} 1s ease-out;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const Features = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    justify-content: center;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ffffff;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
`;

const FeatureIcon = styled.span`
  font-size: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.button)`
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(1.6rem, 4vw, 2.4rem);
  border-radius: 12px;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;
  width: fit-content;
  min-width: 200px;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 100%;
    min-width: unset;
  }
`;

const StartButton = styled(Button)`
  background: linear-gradient(135deg, #00c4ff, #00ff8f);
  color: #000000;
  box-shadow: 0 8px 24px rgba(0, 196, 255, 0.2);
  border: none;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 196, 255, 0.4);
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(0, 196, 255, 0.1);
  color: #00c4ff;
  border: 2px solid #00c4ff;
  box-shadow: 0 4px 16px rgba(0, 196, 255, 0.1);

  &:hover {
    background: rgba(0, 196, 255, 0.15);
    box-shadow: 0 4px 24px rgba(0, 196, 255, 0.2);
  }
`;

const CodeWindow = styled(motion.div)`
  flex: 1;
  max-width: 650px;
  width: 100%;
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1200px) {
    max-width: 100%;
  }
`;

const WindowHeader = styled.div`
  background: #2a2a2a;
  padding: clamp(0.5rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1.5rem);
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Dots = styled.div`
  display: flex;
  gap: clamp(4px, 1vw, 8px);
`;

const Dot = styled.span`
  width: clamp(8px, 2vw, 12px);
  height: clamp(8px, 2vw, 12px);
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const WindowTitle = styled.span`
  color: #888;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
`;

const CodeContent = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  min-height: 400px;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 300px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    min-height: 250px;
  }
`;

const LineNumbers = styled.div`
  display: flex;
  flex-direction: column;
  color: #666;
  font-family: "Fira Code", monospace;
  font-size: 1.1rem;
  line-height: 1.6;
  user-select: none;
  text-align: right;
  padding-right: 1rem;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

const CodeText = styled.div`
  flex: 1;
  color: #f4f4f4;
  font-family: "Fira Code", monospace;
  font-size: clamp(0.8rem, 2vw, 1.1rem);
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
`;

const TypedLine = styled.div`
  display: flex;
  white-space: pre;
`;

const Cursor = styled.span`
  animation: ${blink} 1s step-end infinite;
  color: #00c4ff;
`;

const Hero = () => {
  const [text, setText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  // Memoize code lines to prevent unnecessary re-renders
  const codeLines = useMemo(
    () => [
      "async function initializeJourney() {",
      "  const skills = ['JavaScript', 'React', 'Node.js'];",
      "  const future = await CodeX.masterAll(skills);",
      "  return { success: true, achievement: '🚀' };",
      "}",
    ],
    []
  );

  // Memoize typing logic
  const typeText = useCallback(() => {
    if (currentLineIndex < codeLines.length) {
      if (currentCharIndex < codeLines[currentLineIndex].length) {
        setText((prev) => prev + codeLines[currentLineIndex][currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setText((prev) => prev + "\n");
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }
  }, [currentLineIndex, currentCharIndex, codeLines]);

  useEffect(() => {
    const timeout = setTimeout(typeText, 50);
    return () => clearTimeout(timeout);
  }, [typeText]);

  // Memoize animation variants
  const textVariants = useMemo(
    () => ({
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.8, delay: 0.2 },
    }),
    []
  );

  const codeVariants = useMemo(
    () => ({
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay: 0.4 },
    }),
    []
  );

  // Memoize line numbers
  const lineNumbers = useMemo(
    () => text.split("\n").map((_, i) => <span key={i}>{i + 1}</span>),
    [text]
  );

  // Memoize code lines
  const codeTextLines = useMemo(
    () =>
      text.split("\n").map((line, index) => (
        <TypedLine key={index}>
          <span>{line}</span>
          {index === currentLineIndex && <Cursor>|</Cursor>}
        </TypedLine>
      )),
    [text, currentLineIndex]
  );

  return (
    <main role="main">
      <GlobalStyle />
      <StyledWrapper>
        <GradientOverlay aria-hidden="true" />
        <NoiseOverlay aria-hidden="true" />
        <div className="container">
          <HeroContent>
            <TextSection {...textVariants}>
              <GlowText>
                Transform Your Future with{" "}
                <span className="highlight">CodeX</span>
              </GlowText>
              <SubTitle>
                Embark on a journey through advanced programming, guided by
                industry experts and cutting-edge curriculum.
              </SubTitle>
              <Features>
                <FeatureItem>
                  <FeatureIcon role="img" aria-label="rocket">
                    🚀
                  </FeatureIcon>
                  Interactive Learning
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon role="img" aria-label="light bulb">
                    💡
                  </FeatureIcon>
                  Real Projects
                </FeatureItem>
                <FeatureItem>
                  <FeatureIcon role="img" aria-label="target">
                    🎯
                  </FeatureIcon>
                  Expert Mentoring
                </FeatureItem>
              </Features>
              <ButtonGroup>
                <Link to="/courses" aria-label="Begin your learning journey">
                  <StartButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Begin Your Journey
                  </StartButton>
                </Link>
                <Link to="/courses" aria-label="Browse available courses">
                  <SecondaryButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Courses
                  </SecondaryButton>
                </Link>
              </ButtonGroup>
            </TextSection>

            <CodeWindow {...codeVariants} role="presentation">
              <WindowHeader>
                <Dots aria-hidden="true">
                  <Dot color="#FF4D4D" />
                  <Dot color="#FFB84D" />
                  <Dot color="#4DFF7C" />
                </Dots>
                <WindowTitle>journey.js</WindowTitle>
              </WindowHeader>
              <CodeContent>
                <LineNumbers aria-hidden="true">{lineNumbers}</LineNumbers>
                <CodeText>{codeTextLines}</CodeText>
              </CodeContent>
            </CodeWindow>
          </HeroContent>
        </div>
      </StyledWrapper>
    </main>
  );
};

export default React.memo(Hero);
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

// Add custom syntax highlighting colors
const syntaxStyles = `
  .token.comment { color: #6a9955; }
  .token.string { color: #ce9178; }
  .token.number { color: #b5cea8; }
  .token.keyword { color: #569cd6; }
  .token.function { color: #dcdcaa; }
  .token.operator { color: #d4d4d4; }
  .token.class-name { color: #4ec9b0; }
  .token.builtin { color: #4ec9b0; }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 20px rgba(0, 196, 255, 0.3), 0 0 40px rgba(0, 196, 255, 0.2); }
  50% { text-shadow: 0 0 40px rgba(0, 196, 255, 0.4), 0 0 60px rgba(0, 196, 255, 0.3); }
  100% { text-shadow: 0 0 20px rgba(0, 196, 255, 0.3), 0 0 40px rgba(0, 196, 255, 0.2); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  ${syntaxStyles}
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

const Content = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
  animation: ${glow} 3s infinite;
  
  .highlight {
    background: linear-gradient(120deg, #00c4ff, #00ff8f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const EditorContainer = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const WindowHeader = styled.div`
  background: #2a2a2a;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const WindowTitle = styled.span`
  color: #888;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
`;

const EditorWrapper = styled.div`
  .editor {
    min-height: 300px;
    font-family: "Fira Code", monospace !important;
    font-size: 1rem;
    line-height: 1.6;
    background: #1a1a1a;
    
    &:focus-within {
      outline: none;
      box-shadow: inset 0 0 0 2px rgba(0, 196, 255, 0.3);
    }

    textarea {
      outline: none;
    }
  }
`;

const RunButton = styled(motion.button)`
  background: linear-gradient(135deg, #00c4ff, #00ff8f);
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 196, 255, 0.2);
  
  &:hover {
    box-shadow: 0 8px 32px rgba(0, 196, 255, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const OutputContainer = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const OutputContent = styled.div`
  background: #0d0d0d;
  color: #00ff8f;
  padding: 1.5rem;
  min-height: 200px;
  font-family: "Fira Code", monospace;
  white-space: pre-wrap;
  position: relative;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background-color: #00ff8f;
  margin-left: 4px;
  animation: ${blink} 1s step-end infinite;
`;

const LineNumbers = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 40px;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem 0.5rem;
  color: #666;
  font-family: "Fira Code", monospace;
  font-size: 0.9rem;
  text-align: right;
  user-select: none;
`;

const initialCode = `# Welcome to Python Playground!
def greet(name):
    """Simple greeting function"""
    return f"Hello, {name}!"

# Test the function
message = greet("World")
print(message)

# Try some math
numbers = [1, 2, 3, 4, 5]
sum_result = sum(numbers)
print(f"Sum of numbers: {sum_result}")`;

const Playground = () => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      if (data.error) {
        setOutput(data.error);
      } else {
        setOutput(data.output || 'No output');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const highlightCode = code => {
    return Prism.highlight(code, Prism.languages.python, 'python');
  };

  const generateLineNumbers = () => {
    const lines = code.split('\n');
    return lines.map((_, i) => <div key={i}>{i + 1}</div>);
  };

  return (
    <Container>
      <GradientOverlay />
      <Content>
        <Title>
          Python <span className="highlight">Playground</span>
        </Title>
        
        <EditorContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <WindowHeader>
            <Dots>
              <Dot color="#FF4D4D" />
              <Dot color="#FFB84D" />
              <Dot color="#4DFF7C" />
            </Dots>
            <WindowTitle>code.py</WindowTitle>
          </WindowHeader>
          
          <EditorWrapper>
            <div style={{ position: 'relative' }}>
              <LineNumbers>
                {generateLineNumbers()}
              </LineNumbers>
              <div style={{ marginLeft: '40px' }}>
                <Editor
                  value={code}
                  onValueChange={setCode}
                  highlight={highlightCode}
                  padding={20}
                  className="editor"
                  style={{
                    fontFamily: '"Fira Code", monospace',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>
          </EditorWrapper>
          
          <RunButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={executeCode}
            disabled={isLoading}
          >
            {isLoading ? 'Running...' : 'Run Code'}
          </RunButton>
        </EditorContainer>

        <OutputContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <WindowHeader>
            <Dots>
              <Dot color="#FF4D4D" />
              <Dot color="#FFB84D" />
              <Dot color="#4DFF7C" />
            </Dots>
            <WindowTitle>output</WindowTitle>
          </WindowHeader>
          
          <OutputContent>
            {output || 'Output will appear here...'}
            <Cursor />
          </OutputContent>
        </OutputContainer>
      </Content>
    </Container>
  );
};

export default Playground;
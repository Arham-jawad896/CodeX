import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import styled, { keyframes, createGlobalStyle, css } from 'styled-components';
import { motion } from 'framer-motion';

// Animations
const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 196, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 196, 255, 0.4); }
  100% { box-shadow: 0 0 20px rgba(0, 196, 255, 0.3); }
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background: #0a0a0a;
    color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }
`;

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #0a0a0a;
  color: #ffffff;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
`;

const LessonContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  height: 100vh;
  
`;

const ContentScroll = styled.div`
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(120deg, #00c4ff, #00ff8f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }
`;

const EditorPane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  height: 100vh;
  margin-top: 67px;
`;

const EditorContainer = styled.div`
  flex: 1;
  overflow: hidden;
`;

const Terminal = styled.div`
  background: #1a1a1a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  height: ${props => props.isExpanded ? '250px' : '0px'};
  transition: height 0.3s ease;
  overflow-y: auto;
  font-family: 'Fira Code', monospace;
`;

const TerminalContent = styled.div`
  padding: 1rem;
  color: #00ff8f;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const TerminalOutput = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${props => props.error ? '#ff4646' : '#ffffff'};
  font-family: 'Fira Code', monospace;
`;

const NavigationBar = styled.div`
  padding: 1rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  background: #1a1a1a;
`;

const NavButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${props => props.primary ? css`
    background: linear-gradient(135deg, #00c4ff, #00ff8f);
    color: #000;
    border: none;
    animation: ${glow} 3s infinite;
    &:hover {
      opacity: 0.9;
    }
  ` : css`
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EditorControls = styled.div`
  padding: 1rem;
  background: #2d2d2d;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RunButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #00c4ff;
  color: #000;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #00b4ef;
  }
`;

const TerminalToggle = styled.button`
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const LessonPage = () => {
    const { courseId } = useParams();
    const [lessons, setLessons] = useState([]);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")\n');
    const [terminalOutput, setTerminalOutput] = useState([]);
    const [isTerminalExpanded, setIsTerminalExpanded] = useState(true);
    const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`http://localhost:1337/api/courses/${courseId}?populate=lessons`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const relatedLessons = data.data?.lessons || [];
        setLessons(relatedLessons);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId]);

  const executeCode = async () => {
    setIsExecuting(true);
    setIsTerminalExpanded(true);
    setTerminalOutput([{ type: 'system', content: '$ Executing Python code...' }]);

    try {
      const response = await fetch('http://localhost:5000/execute', {  // Adjust this URL to match your Python backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.error) {
        setTerminalOutput(prev => [...prev, { type: 'error', content: data.error }]);
      } else {
        // Split the output by newlines and add each line separately
        const outputLines = data.output.split('\n');
        outputLines.forEach(line => {
          if (line.trim()) {
            setTerminalOutput(prev => [...prev, { type: 'log', content: line }]);
          }
        });
      }
    } catch (error) {
      setTerminalOutput(prev => [...prev, { 
        type: 'error', 
        content: 'Failed to execute code. Please make sure the Python backend server is running.' 
      }]);
    } finally {
      setIsExecuting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-[#00c4ff] text-xl">Loading your lesson...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 text-red-400 rounded-lg m-4">
        {error}
      </div>
    );
  }

  const currentLesson = lessons[currentLessonIndex] || { Title: 'Sample Lesson', Content: 'This is a sample lesson content.' };

  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <ContentArea>
          <LessonContent>
            <ContentScroll>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 style={{marginTop: 100}}>{currentLesson.Title}</h1>
                <div className="prose prose-invert">
                  <p>{currentLesson.Content}</p>
                </div>
              </motion.div>
            </ContentScroll>
            <NavigationBar>
              <NavButton
                onClick={() => setCurrentLessonIndex(prev => Math.max(0, prev - 1))}
                disabled={currentLessonIndex === 0}
              >
                ← Previous
              </NavButton>
              <NavButton
                primary
                onClick={() => setCurrentLessonIndex(prev => Math.min(lessons.length - 1, prev + 1))}
                disabled={currentLessonIndex === lessons.length - 1}
              >
                Next →
              </NavButton>
            </NavigationBar>
          </LessonContent>

         <EditorPane>
            <EditorContainer>
              <Editor
                height="100%"
                defaultLanguage="python"  // Changed to python
                theme="vs-dark"
                value={code}
                onChange={value => setCode(value)}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </EditorContainer>
            <EditorControls>
              <TerminalToggle style={{}} onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}>
                {isTerminalExpanded ? 'Hide Terminal' : 'Show Terminal'}
              </TerminalToggle>
              <RunButton onClick={executeCode} disabled={isExecuting}>
                {isExecuting ? 'Executing...' : 'Run Code'}
              </RunButton>
            </EditorControls>
            <Terminal isExpanded={isTerminalExpanded}>
              <TerminalContent>
                {terminalOutput.map((output, index) => (
                  <TerminalOutput key={index} error={output.type === 'error'}>
                    {output.content}
                  </TerminalOutput>
                ))}
              </TerminalContent>
            </Terminal>
          </EditorPane>
        </ContentArea>
      </PageWrapper>
    </>
  );
};

export default LessonPage;
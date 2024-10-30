import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';
import { AuthContext } from '../components/AuthContext';

// Animations
const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(0, 196, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 196, 255, 0.4); }
  100% { box-shadow: 0 0 20px rgba(0, 196, 255, 0.3); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
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
  }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 67px;
`;

const PageTitle = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(120deg, #00c4ff, #00ff8f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const CourseCard = styled(motion.div)`
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 196, 255, 0.5);
    animation: ${glow} 3s infinite;
    
    &:before {
      opacity: 1;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00c4ff, #00ff8f);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

const CourseTitle = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  margin-bottom: 1rem;
  display: block;
  
  background: linear-gradient(120deg, #ffffff, #00c4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`;

const CourseDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.5rem;
  color: #00c4ff;
`;

const ErrorContainer = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  color: #ff4646;
  text-align: center;
  margin: 2rem auto;
  max-width: 600px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 3rem;
  font-size: 1.2rem;
`;

const Courses = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loginPrompt, setLoginPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchCourses = async () => {
          try {
              const response = await fetch('http://localhost:1337/api/courses?populate=lessons');
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              const data = await response.json();
              setCourses(data.data);
          } catch (error) {
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };
      fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
      if (isLoggedIn) {
          navigate(`/lessons/${courseId}`);
      } else {
          setLoginPrompt(true);
      }
  };

    if (loading) {
        return (
            <>
                <GlobalStyle />
                <LoadingContainer>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Loading your learning journey...
                    </motion.div>
                </LoadingContainer>
            </>
        );
    }

    if (error) {
        return (
            <>
                <GlobalStyle />
                <ErrorContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.div>
                </ErrorContainer>
            </>
        );
    }

    if (courses.length === 0) {
        return (
            <>
                <GlobalStyle />
                <EmptyState>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No courses available at the moment.
                    </motion.div>
                </EmptyState>
            </>
        );
    }

    return (
        <>
            <GlobalStyle />
            {loading && (
                <LoadingContainer>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Loading your learning journey...
                    </motion.div>
                </LoadingContainer>
            )}
            {error && (
                <ErrorContainer>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {error}
                    </motion.div>
                </ErrorContainer>
            )}
            {courses.length === 0 && !loading && (
                <EmptyState>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        No courses available at the moment.
                    </motion.div>
                </EmptyState>
            )}
            {loginPrompt && (
                <ErrorContainer>
                    <p>Please log in to access the course content.</p>
                </ErrorContainer>
            )}
            <PageContainer>
                <PageTitle
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Available Courses
                </PageTitle>
                <CourseGrid>
                    {courses.map((course, index) => (
                        <CourseCard
                            key={course.documentId}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => handleCourseClick(course.documentId)}
                        >
                            <CourseTitle as="span">
                                {course.Title || 'No Title'}
                            </CourseTitle>
                            <CourseDescription>
                                {course.Description || 'No Description'}
                            </CourseDescription>
                        </CourseCard>
                    ))}
                </CourseGrid>
            </PageContainer>
        </>
    );
};

export default Courses;
import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a0a;
  padding: 2rem;
`;

const FormCard = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 16px;
  padding: 2.5rem;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.2rem);
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(120deg, #00c4ff, #00ff8f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 400px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00c4ff;
    background: rgba(0, 196, 255, 0.05);
    box-shadow: 0 0 20px rgba(0, 196, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #00c4ff, #00ff8f);
  color: #000000;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s ease;
  width: 450px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-out;
  background: ${props => props.error ? 'rgba(255, 77, 77, 0.1)' : 'rgba(77, 255, 124, 0.1)'};
  color: ${props => props.error ? '#ff4d4d' : '#4dff7c'};
  border: 1px solid ${props => props.error ? 'rgba(255, 77, 77, 0.2)' : 'rgba(77, 255, 124, 0.2)'};
  margin-bottom: 1rem;
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Initialize navigate
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await axios.post('http://127.0.0.1:5000/register', {
          username,
          password,
        });
        setMessage(response.data.msg);
        setIsError(false);
        setUsername('');
        setPassword('');
        navigate('/login'); // Redirect to login page on success
      } catch (error) {
        setMessage(error.response ? error.response.data.msg : "Something went wrong!");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <Container>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Create Account</Title>
        {message && (
          <Message error={isError}>{message}</Message>
        )}
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </InputGroup>
          <SubmitButton
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </SubmitButton>
        </Form>
      </FormCard>
    </Container>
  );
};

export default Register;
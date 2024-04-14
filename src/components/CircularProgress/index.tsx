import { Circle, Container } from "./styles";

const CircularProgress = ({ size = 16, color = '#007bff' }) => {
  return (
    <Container size={size}>
      <Circle color={color} />
    </Container>
  );
};

export default CircularProgress
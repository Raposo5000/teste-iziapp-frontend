import styled from 'styled-components';

export const StyledInput = styled.input`
    padding: 12px;
    border: solid 2px #7a7979;
    border-radius: 8px;
    width: -webkit-fill-available;
    font-size: 18px;

    &:focus {
      outline: none;
      border: solid 2px #892cdc;
    }
`;

import styled from "styled-components";

const SimpleButton = styled.button`
    font-size: 2.4rem;
    padding: 0.5em;
    margin: 0.5em;
    border-radius: 5px;
    color: ${(props) => props.color || "#fff"};
    &:hover {
        color: red;
    }
`;

interface Props {
    text?: string;
    color?: string;
}

const Button: React.FC<Props> = ({ text = "Click", color }) => {
    return (
        <div>
            <SimpleButton color={color}>{text}</SimpleButton>
        </div>
    );
};

export default Button;

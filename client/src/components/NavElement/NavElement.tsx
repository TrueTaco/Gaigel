import styled from "styled-components";

const S_NavElement = styled.a`
    font-size: 1.6rem;
    text-decoration: none;
    color: white;
    padding: 1rem;
    display: block;
`;

interface Props {
    text: string;
}

const NavElement: React.FC<Props> = ({ text }) => {
    return (
        <>
            <S_NavElement href="#">{text}</S_NavElement>
        </>
    );
};

export default NavElement;

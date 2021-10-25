import styled from "styled-components";

const S_DomainName = styled.div`
    font-size: 2.4rem;
    margin: 0.8rem;
`;

interface Props {}

const DomainName: React.FC<Props> = () => {
    return (
        <>
            <S_DomainName>obrm.tech</S_DomainName>
        </>
    );
};

export default DomainName;

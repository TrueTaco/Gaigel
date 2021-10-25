import React, { useRef, useState } from "react";

interface Person {
    firstName: string;
    lastName: string;
}

interface Props {
    // Basic types
    text: string;
    ok?: boolean;
    i?: number;
    // Functions
    fn?: (name: string) => string;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    // Objects
    obj1?: {
        f1: string;
    };
    obj2?: Person;
}

const TextField: React.FC<Props> = ({ handleChange }) => {
    const [count, setCount] = useState<number | null>(5);
    setCount(5);

    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={divRef}>
            <h2>Test</h2>
            <input ref={inputRef} onChange={handleChange} />
        </div>
    );
};

export default TextField;

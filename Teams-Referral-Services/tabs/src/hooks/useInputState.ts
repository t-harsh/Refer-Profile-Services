import { useState } from 'react';

export interface InputState {
    value: string;
    handleChange: (e: any) => void;
    handleReset: () => void;
    handleSet: (set: string) => void
    values: {value: string; onChange: (e: any) => void;}
}

const useInputState = (init?: string): InputState => {
    const initialState = init || '';

    const [value, setValue] = useState<string>(initialState);

    const handleChange = (e: any): void => setValue(e.target.value);

    const values = { value, onChange: handleChange};

    const handleReset = (): void => setValue(initialState);

    const handleSet = (set: string): void => setValue(set);

    return { value, handleChange, handleReset, handleSet ,values};
};

export default useInputState
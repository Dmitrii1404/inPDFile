import React, { useRef, useState, useEffect } from 'react';
import styles from './ConfirmCodeForm.module.css';

type ConfirmCodeFormProps = {
    onSubmit: (code: string) => void;
};

function ConfirmCodeForm({ onSubmit }: ConfirmCodeFormProps) {
    const [values, setValues] = useState<string[]>(['', '', '', '']);
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (values.every(val => val !== '')) {
            const code = values.join('');
            onSubmit(code);
        }
    }, [values, onSubmit]);

    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        if (!val) return;
        const newValues = [...values];
        newValues[index] = val.charAt(0);
        setValues(newValues);
        if (index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number) => (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !values[index] && index > 0) {
            const prevIndex = index - 1;
            inputsRef.current[prevIndex]?.focus();
            const newValues = [...values];
            newValues[prevIndex] = '';
            setValues(newValues);
        }
    };

    return (
        <form className={styles.form} onSubmit={e => e.preventDefault()}>
            {values.map((val, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={val}
                    onChange={handleChange(idx)}
                    onKeyDown={handleKeyDown(idx)}
                    ref={el => { inputsRef.current[idx] = el; }}
                    className={styles.input}
                />
            ))}
        </form>
    );
}

export default ConfirmCodeForm;
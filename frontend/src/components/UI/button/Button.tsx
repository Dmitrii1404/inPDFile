import styles from './Button.module.css';
import React from "react";
import classNames from 'classnames'

export type ButtonProps = {
    children: React.ReactNode
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

function Button ({
                   children,
                   onClick,
                   disabled = false,
                   type = 'button',
                   className,
                   } : ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classNames(styles.button, className, {
                [styles.disabled]: disabled,
            })}
        >
            {children}
        </button>
    )
}

export default Button;
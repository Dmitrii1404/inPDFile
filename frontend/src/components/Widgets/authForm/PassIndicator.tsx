import styles from './PassIndicator.module.css';

interface PasswordStrengthIndicatorProps {
    strength: number;
}

function PassIndicator({ strength } : PasswordStrengthIndicatorProps) {
    const getStrengthColor = (strength: number): string => {
        if (strength <= 2) return 'red';
        if (strength <= 4) return 'orange';
        return 'green';
    };

    const getStrengthText = (strength: number): string => {
        if (strength <= 2) return 'Слабый';
        if (strength <= 4) return 'Средний';
        return 'Сильный';
    };

    const strengthColor = getStrengthColor(strength);
    const strengthText = getStrengthText(strength);

    return (
        <div className={styles.strength_container}>
            <div className={styles.strength_bars}>
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={`${styles.strength_bar} ${
                            level <= strength
                                ? styles[`strength_bar_${strengthColor}`]
                                : styles.strength_bar_inactive
                        }`}
                    />
                ))}
            </div>
            <span className={`${styles.strength_text} ${styles[`strength_text_${strengthColor}`]}`}>
        {strengthText}
      </span>
        </div>
    );
};

export default PassIndicator;
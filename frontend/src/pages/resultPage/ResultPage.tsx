import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ResultPage.module.css';
import Button from '../../components/UI/button/Button';

type LocationState = {
    imageUrl?: string;
};

function ResultPage() {
    const { state } = useLocation() as { state: LocationState };
    const navigate = useNavigate();

    const imageUrl = state?.imageUrl;

    useEffect(() => {
        if (!imageUrl) {
            navigate('/', { replace: true });
        }
    }, [imageUrl, navigate]);

    if (!imageUrl) return null;

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Результат анализа</h1>
            <div className={styles.imageContainer}>
                <img src={imageUrl} alt="Результат анализа" className={styles.image}/>
            </div>
            <Button onClick={() => navigate(-1)}>
                Назад
            </Button>
        </div>
    );
}

export default ResultPage;
import styles from './Home.module.css';
import {useContext, useState} from "react";
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';
import NProgress from 'nprogress';
import axios from "axios";
import Button from "../../components/UI/Button/Button.tsx";
// @ts-ignore
import Cross from "../../assets/Cross.svg?react";
import {UserContext} from "../../context/UserContext.tsx";


function Home () {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const userContext = useContext(UserContext);
    const { login } = userContext;
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!login) {
            toast.error('Войдите в аккаунт');
            event.target.value = '';
            return;
        }

        const chosen = event.target.files?.[0];
        if (!chosen) return;

        if (chosen.type !== 'application/pdf' && !chosen.name.toLowerCase().endsWith('.pdf')) {
            toast.error('Неверный формат файла — нужен PDF');
            event.target.value = '';
            return;
        }

        if (chosen.size === 0) {
            toast.error('Файл пустой');
            event.target.value = '';
            return;
        }

        setFile(chosen);
    };

    const handleFileUpload= async () => {
        if (!file) {
            toast.error("Выберите файл!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        setLoading(true);
        NProgress.start();

        await axios.post("http://localhost:8000/pdf/analyze", formData, {
            onUploadProgress: (progressEvent) => {
                if (!progressEvent.total) return;
                const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) / 100;
                NProgress.set(percentage);
            },
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
            responseType: 'blob',
        }).then(response => {
            const blob = response.data as Blob;
            const url = URL.createObjectURL(blob);
            setResultImage(url);
            navigate('/result', { state: { url } });
            toast.success('Файл загружен');
        }).catch (e => {
            setFile(null);
            toast.error('Ошибка загрузки');
            console.error(e);
        }).finally(() => {
            NProgress.done();
            setLoading(false);
        })
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = () => {
        setDragActive(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setDragActive(false);
        if (!login) {
            toast.error('Войдите в аккаунт');
            return;
        }
        const dropped = event.dataTransfer.files?.[0];
        if (!dropped) return;

        if (dropped.type !== 'application/pdf' && !dropped.name.toLowerCase().endsWith('.pdf')) {
            toast.error('Неверный формат файла — нужен PDF');
            return;
        }

        if (dropped.size === 0) {
            toast.error('Файл пустой');
            return;
        }

        setFile(dropped);
    };

    const handleDeleteFile = ()=> {
        setFile(null);
        setResultImage(null);
    };

    const classFileDropZone = [
        styles.fileDropZone,
        dragActive ? styles.dragActive : null
    ].filter(Boolean).join(' ');

    return (
        <main className={styles.home}>
            <div className={styles.list}>
                <div className={styles.box_description}>
                    <p className={styles.description}>Документы окружают нас повсюду - договоры, чеки, соглашения. Важно быстро определить их тип, будь то в работе или повседневной жизни.</p>
                </div>
                <div className={styles.box_description}>
                    <p className={styles.description}>Наш сервис бесплатно определяет тип документа в PDF-файле за секунды. Просто загрузите файл - и получите результат без лишних усилий</p>
                </div>
            </div>
            <div className={styles.container_upload}>
                <div className={styles.box_selectFile}>
                    <label htmlFor="file-upload" className={styles.selectFile}>
                        Выберите PDF-файл
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div
                    className={classFileDropZone}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {file ? (
                        <div className={styles.currentFile}>
                            <p className={styles.textDropZone}>Выбран файл: {file.name}</p>
                            <button onClick={handleDeleteFile} className={styles.crossButton}><Cross className={styles.cross}/></button>
                        </div>
                    ) : (
                        <p className={styles.textDropZone}>Перетащите сюда ваши файлы</p>
                    )}
                </div>

                {file && (
                    <div className={`${styles.box_description} ${styles.file}`}>
                        <div className={styles.currentFile}>
                            <p className={styles.description}>Выбран файл: {file.name}</p>
                            <button onClick={handleDeleteFile} className={styles.crossButton}><Cross className={styles.cross}/></button>
                        </div>
                    </div>
                )}

                <Button onClick={handleFileUpload} disabled={!file || loading}>
                    {loading ? 'Загрузка...': 'Загрузить файл'}
                </Button>
            </div>
        </main>
    )
}

export default Home;
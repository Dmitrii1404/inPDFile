import styles from './Home.module.css';
import {useState} from "react";
import {toast} from "react-toastify";
import NProgress from 'nprogress';
import axios from "axios";

function Home () {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [dragActive, setDragActive] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
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

        await axios.post("http://localhost:8000/pdf/upload", formData, {
            onUploadProgress: (progressEvent) => {
                if (!progressEvent.total) return;
                const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) / 100;
                NProgress.set(percentage);
                console.log('progress loading: ' + percentage);
            },
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(response => {
            toast.success('Файл загружен');
            setFile(null);
            console.log("Файл загружен:", response.data);
        }).catch (e => {
            setFile(null);
            toast.error('Ошибка загрузки');
            console.error(e);
        }).finally(() => {
            NProgress.done;
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
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const classFileDropZone = [
        styles.fileDropZone,
        dragActive ? styles.dragActive : null
    ].filter(Boolean).join(' ');

    const classUploadFile = [
        styles.uploadFile,
        !file || loading ? styles.uploadFileActive : null
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
                        <p className={styles.textDropZone}>Выбран файл: {file.name}</p>
                    ) : (
                        <p className={styles.textDropZone}>Перетащите сюда ваши файлы</p>
                    )}
                </div>

                <button className={classUploadFile} onClick={handleFileUpload} disabled={!file || loading}>
                    <p className={styles.selectFile}>{loading ? 'Загрузка...': 'Загрузить файл'}</p>
                </button>
            </div>
        </main>
    )
}

export default Home;
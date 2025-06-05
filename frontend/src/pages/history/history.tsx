import styles from "./History.module.css";
import { useEffect, useState } from "react";
import { historyAPI } from "../../API";
import LoadingOrbitBar from "../../components/UI/LoadingOrbitBar/LoadingOrbitBar.tsx";
import type { responseHistory } from "../../types";


function History () {
    const [files, setFiles] = useState<responseHistory[]>([]);
    const [visibleFiles, setVisibleFiles] = useState<responseHistory[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);

            historyAPI()
                .then(response => {
                    setFiles(response.data);
                    setVisibleFiles(response.data.slice(0, 10));
                }).catch (e => {
                    console.error("Ошибка загрузки истории файлов:", e);
                }).finally(() => {
                    setLoading(false);
                });
        };

        fetchFiles();
    }, []);

    const loadMoreFiles = () => {
        const newIndex = currentIndex + 10;
        setVisibleFiles(files.slice(0, newIndex + 10));
        setCurrentIndex(newIndex);
    };

    return (
        <div className={styles.historyWrapper}>
            <h1 className={styles.title}>История загруженных файлов</h1>
            {loading ? (
                <LoadingOrbitBar />
            ) : (
                <div>
                    {visibleFiles.length === 0 ? (
                        <p className={styles.noFilesText}>У вас нет загруженных файлов</p>
                    ) : (
                        <div className={styles.scrollContainer}>
                            <ul className={styles.fileList}>
                                {visibleFiles.map((file, index) => (
                                    <li key={index} className={styles.fileItem}>
                                        <p className={styles.infoText}><strong>{file.file_name}</strong> <span className={styles.size}>({file.file_size})</span></p>
                                        <p className={styles.infoText}><strong>Дата загрузки:</strong> {file.upload_date}</p>
                                        <p className={styles.infoText}><strong>Статус:</strong> {file.status}</p>
                                        <p className={styles.infoText}><strong>Классификация:</strong> {file.classification}</p>
                                        <p className={styles.infoText}><strong>Тип документа:</strong> {file.document_type}</p>
                                        <p className={styles.infoText}><strong>Подпись:</strong> {file.has_signature}</p>
                                        <p className={styles.infoText}><strong>Печать:</strong> {file.has_stamp}</p>
                                    </li>
                                ))}
                            </ul>

                            {visibleFiles.length < files.length && (
                                <button onClick={loadMoreFiles} className={styles.loadMoreButton}>
                                    Показать ещё
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default History;
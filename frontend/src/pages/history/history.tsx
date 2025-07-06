import styles from "./History.module.css";
import { useEffect, useState } from "react";
import { historyAPI } from "../../api";
import LoadingOrbitBar from "../../components/UI/loadingOrbitBar/LoadingOrbitBar.tsx";
import type { responseHistory } from "../../types";
import FilesHistory from "../../components/layouts/filesHistory/FilesHistory.tsx";


function History () {
    const [files, setFiles] = useState<responseHistory[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            setLoading(true);

            historyAPI()
                .then(response => {
                    setFiles(response.data);
                }).catch (e => {
                    console.error("Ошибка загрузки истории файлов:", e);
                }).finally(() => {
                    setLoading(false);
                });
        };
        fetchFiles();
    }, []);

    return (
        <div className={styles.historyWrapper}>
            <h1 className={styles.title}>История загруженных файлов</h1>
            {loading ? (
                <LoadingOrbitBar />
            ) : (
                <div>
                    {files.length === 0 ? (
                        <p className={styles.noFilesText}>У вас нет загруженных файлов</p>
                    ) : (
                        <FilesHistory files={files}/>
                    )}
                </div>
            )}
        </div>
    )
}

export default History;
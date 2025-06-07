import styles from './FilesHistory.module.css';
import type { responseHistory } from "../../../types";

export interface Files {
    files: responseHistory[];
}

function FilesHistory ({ files }: Files) {
    return (
        <div className={styles.scrollContainer}>
            <ul className={styles.fileList}>
                {files.map((file, index) => (
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
        </div>
    )
}

export default FilesHistory;
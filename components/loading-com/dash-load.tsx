import styles from "./loading-com.module.scss";

export default function LoadingDashScreen() {
    return (
        <div className={styles.pageDash}>
            <span className={styles.loader1}></span>
        </div>
    )
}
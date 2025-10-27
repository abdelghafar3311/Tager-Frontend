import Image from "next/image";
import styles from "./loading-com.module.scss";

export default function LoadingMainScreen() {
    return (
        <div className={styles.page}>
            <Image src="/tlogo.png" alt="logo" width={300} height={300} />
            <span className={styles.loader}></span>
        </div>
    )
}
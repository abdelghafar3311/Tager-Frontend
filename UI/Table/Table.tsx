import classes from "./Table.module.scss";

interface Props {
    children: React.ReactNode;
}

export default function Table({ children }: Props) {
    return (
        <div className={classes.containerTable}>
            <table className={classes.table}>
                {children}
            </table>
        </div>
    )
}
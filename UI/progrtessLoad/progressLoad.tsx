import classes from "./progressLoad.module.scss"


interface Props {
    color?: string
}

export default function ProgressLoad({ color }: Props) {
    return (
        <div className={classes.progress}>
            <div className={`${classes.bar} ${classes.barLoad1}`} style={{ background: color || "#1a73e8" }}></div>
        </div>
    )
}
import classes from "./card.module.scss"

interface Props {
    icon?: React.ReactNode,
    title?: string,
    children: React.ReactNode,
    color?: {
        bg?: string,
        text?: string
    }
    ClassName?: string
}


export default function Card({ icon, title, color, ClassName, children }: Props) {

    return (
        <div className={`${classes.card} ${ClassName || ""}`} style={{ backgroundColor: color?.bg || "#fff", color: color?.text || "#000" }}>
            {icon && <div className={classes.icon} style={{ color: color?.text || "#000" }}>{icon}</div>}
            {title && <div className={classes.title}>{title}</div>}
            {children}
        </div>
    )
}
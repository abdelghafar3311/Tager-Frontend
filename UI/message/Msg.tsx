import style from "./Msg.module.scss"
interface Props {
    children: React.ReactNode
    msg: string | React.ReactNode,
    dir: "l" | "r" | "t" | "b",
    effect?: "trans" | "fade" | "scale",
    keys?: string | number | any
}

export default function Msg({ children, msg, dir, keys, effect = "fade" }: Props) {
    return (
        <div className={`${style.con}`} key={keys}>
            {children}
            <span className={`${style.msg} ${style[dir]} ${style[effect]}`}>{msg}</span>
        </div>
    )
}
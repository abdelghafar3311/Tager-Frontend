import style from "./Msg.module.scss"
interface Props {
    children: React.ReactNode
    msg: string,
    dir: "l" | "r" | "t" | "b"
}

export default function Msg({ children, msg, dir }: Props) {
    return (
        <div className={`${style.con}`}>
            {children}
            <span className={`${style.msg} ${style[dir]}`}>{msg}</span>
        </div>
    )
}
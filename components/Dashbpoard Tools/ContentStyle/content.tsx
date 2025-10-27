import classes from "./style.module.scss"
interface Props {
    children: React.ReactNode,
    name?: string
    caseName?: "main" | "sub",
    isLoading?: boolean,
    ClassName?: string,
    CustomColor?: boolean,
    Custom?: string

}

export default function Content({ children, name, caseName = "main", isLoading = false, ClassName, CustomColor = false, Custom }: Props) {
    if (isLoading) {
        return (
            <div className="mb-2">
                {name && <h1 className={`${caseName == "main" ? "text-3xl font-extrabold text-gray-500 animate-pulse rounded" : "text-xl font-extralight text-gray-500 animate-pulse rounded"}  mb-2`}>loading ...</h1>}
                <div className={`${ClassName} ${CustomColor ? Custom : "bg-white"} p-4 rounded shadow h-[80%]`}>
                    <div className={classes.pageDash}>
                        <span className={classes.loader1}></span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="mb-2 overflow-x-hidden">
            <h1 className={`${caseName == "main" ? "text-3xl font-extrabold" : "text-xl font-extralight"}  mb-2 text-slate-500`}>{name}</h1>
            <div className={`${ClassName} ${CustomColor ? Custom : "bg-white"} p-4 rounded shadow`}>
                {children}
            </div>
        </div>
    )
}
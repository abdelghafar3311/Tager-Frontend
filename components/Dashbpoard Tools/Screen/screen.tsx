
interface Props {
    children: React.ReactNode
}

export default function Screen({ children }: Props) {
    return (
        <div className="p-4 overflow-auto bg-[#F9F5F5] flex-9 md:flex-8">
            {children}
        </div>
    )
}
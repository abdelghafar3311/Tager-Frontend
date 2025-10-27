import FormStore from "@/components/Dashboard/owner/pages/Store/FormStore"

export default function ViewStorePage({ params }: { params: { id: string } }) {
    return (
        <div>
            <FormStore workIt="Edit" ID={params.id} />
        </div>
    )
}
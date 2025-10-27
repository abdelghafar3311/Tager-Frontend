
import ViewStore from "@/components/Dashboard/owner/pages/Store/view";

export default function ViewStorePage({ params }: { params: { id: string } }) {
    return (
        <div>
            <ViewStore id={params.id} />
        </div>
    )
}


import UpdateProduct from "@/components/Dashboard/customer/Pages/Products/updateProduct";

export default function UpdateProductPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <UpdateProduct id={params.id} />
        </div>
    )
}
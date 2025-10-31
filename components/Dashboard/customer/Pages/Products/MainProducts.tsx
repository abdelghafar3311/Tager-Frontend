"use client"
import { useState, useEffect } from "react";
// axios
import axios, { AxiosError } from "axios";
// notification
import notification from "@/hooks/useNotifications";
// cookies
import { getCookie } from "cookies-next";
// load page
import LoadingDashScreen from "@/components/loading-com/dash-load";
// routes
import { ProductRoutes } from "@/config/routes";
// actions
import { SellOneProduct, SellAllProduct, SellCountProduct, DeleteProduct } from "./actions";

// next
import Link from "next/link";
// ui
import Card from "@/UI/Card/Card";
import Table from "@/UI/Table/Table";
import Modal from "@/UI/Modal/modal";
import Inp from "@/UI/input/Inp";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/UI/ContextMenu/context-menu";
import Pagination from "@/UI/pagination/pagination";

// icons
import { IoMdRefresh } from "react-icons/io";
import { FaPlus, FaAngleDoubleUp, FaEdit } from "react-icons/fa";
import { CiAlignLeft, CiViewTable } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Btn from "@/UI/BTN/Btn";
// Redux product
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setProducts, setIsCachingUpdate } from "@/Redux/slices/customer/products";
import { GetCustomer } from "@/fetchData/fetch";


export interface IProduct {
    _id: string;
    nameProduct: string;
    category: string;
    count: number;
    price: number;
    taxes: number;
    ads: number;
    gain: number;
    discount: number;
    Rental_Id: {
        _id: string;
        subscriptionState: "active" | "inactive" | string;
        isDeleted: boolean;
        isAccept: "accept" | "reject" | "pending" | string;
        Area_Id: string;
        Room_Id: {
            _id: string;
            nameRoom: string;
        };
        Owner_Id: string;
        Customer_Id: string;
        startDate: string;
        endDate: string;
        expires: string;
        pay: number;
    };
    createdAt: string;
    updatedAt: string;
}


export default function MainProducts() {
    const [typeShow, setTypeShow] = useState("table");
    // redux
    const dispatch = useAppDispatch();
    const { products, isCachingUpdate } = useAppSelector((state) => state.products);
    // loading page
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    // const [products, setProducts] = useState<IProduct[]>([]);
    // Modal status
    const [showModal, setShowModal] = useState<boolean>(false);
    const [msgModal, setMsgModal] = useState<{
        title: string;
        text: string;
        btn: string;
        fun: string;
    }>({
        title: "",
        text: "",
        btn: "",
        fun: "",
    });

    // modal count
    const [showModalCount, setShowModalCount] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [numProduct, setNumProduct] = useState<number>(0);
    // set id
    const [IdProduct, setIdProduct] = useState<string>("")
    // load btn
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false);
    // search data
    const [search, setSearch] = useState<string>("");
    // data after search
    const [searchData, setSearchData] = useState<IProduct[]>([]);


    // search fun
    const searchFun = () => {
        if (!search) return setSearchData(products);
        const data = products.filter((item) => {
            return item.nameProduct.toLowerCase().includes(search.toLowerCase());
        });
        setSearchData(data);
    }
    // useSearchKey
    const useSearchKey = (
        text: string,
        keywords: string
    ): React.ReactNode[] => {
        const keywordArray: string[] = keywords.toLowerCase().split("");

        return Array.from(text).map((char: string, index: number) => {
            const lowerChar = char.toLowerCase();

            if (keywordArray.includes(lowerChar)) {
                return (
                    <span key={index} className="bg-yellow-400">
                        {char}
                    </span>
                );
            }
            return <>{char}</>;
        });
    };

    // fun get products
    const getProducts = async () => {
        setLoadingPage(true);
        try {
            const res = await axios.get(ProductRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`,
                },
            });
            const data = await res.data;
            dispatch(setProducts(data));
            dispatch(setIsCachingUpdate(true));
            setSearchData(data);
            await GetCustomer(dispatch);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        } finally {
            setLoadingPage(false);
        }
    }

    const getProductsWithoutLoad = async () => {
        try {
            const res = await axios.get(ProductRoutes.getAll, {
                headers: {
                    token: `${getCookie("token")}`,
                },
            });
            const data = await res.data;
            dispatch(setProducts(data));
            dispatch(setIsCachingUpdate(true));
            await GetCustomer(dispatch);
            setSearchData(data);
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            console.log(err);
        }
    }

    // fun open modal
    const OpenModal = (title: string, text: string, fun: string, btn: string, id: string) => {
        setShowModal(true);
        setIdProduct(id);
        setMsgModal({
            title: title,
            text: text,
            btn: btn,
            fun: fun,
        });
    }

    // open modal count
    const openModalCount = (id: string, count: number) => {
        setShowModalCount(true);
        setNumProduct(count);
        setIdProduct(id);
    }

    const actionsProduct = async (act: string) => {
        setLoadingBtn(true);
        try {
            if (act === "sellOne") {
                await SellOneProduct(IdProduct)
                await getProductsWithoutLoad()
                setShowModal(false);
            } else if (act === "sellAll") {
                await SellAllProduct(IdProduct)
                await getProductsWithoutLoad()
                setShowModal(false);
            } else if (act === "delete") {
                await DeleteProduct(IdProduct)
                await getProductsWithoutLoad()
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingBtn(false);
        }
    }



    // fun count
    const countFun = async () => {
        setLoadingBtn(true);
        try {
            await SellCountProduct(IdProduct, count)
            await getProductsWithoutLoad()
            setShowModalCount(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingBtn(false);
        }
    }

    useEffect(() => {
        searchFun();
    }, [search])

    useEffect(() => {
        if (!isCachingUpdate) {
            getProducts();
        }
        if (isCachingUpdate) setLoadingPage(false);
        console.log("isCachingUpdate: ", isCachingUpdate);
    }, [isCachingUpdate]);

    // loading
    if (loadingPage) {
        return (
            <div className="h-screen">
                <LoadingDashScreen />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4 flex justify-between">
                <h1 className="text-3xl font-extrabold">Products</h1>
                <div className="flex items-center gap-2">
                    <Link href={"/dashboard_customer/product/single_product"} className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-2 rounded-full text-white bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500 text-[12px] hover:shadow cursor-pointer relative font-extrabold"><span><FaPlus /></span>Product<span></span></Link>
                    <Link href={"/dashboard_customer/product/add_products"} className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-2 rounded-full text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-[12px] hover:shadow cursor-pointer relative font-extrabold"><span><FaPlus /></span>Products<span></span></Link>
                    <button className="flex items-center justify-center gap-1 transition-all px-3 text-2xl py-3 rounded-full bg-white border border-gray-200 text-[12px] hover:shadow cursor-pointer relative" onClick={getProducts}><IoMdRefresh /></button>
                </div>
            </div>

            <div className="flex gap-4 mt-4 justify-between items-center border-b border-gray-400 mb-2 p-2">
                <div className="flex gap-4">
                    <div onClick={() => setTypeShow("table")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${typeShow == "table" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                        <CiViewTable />
                        <span>Table</span>
                    </div>
                    <div onClick={() => setTypeShow("cards")} className={`flex items-center justify-center gap-1 transition-all px-1 text-[12px] py-1 rounded border ${typeShow == "cards" ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"} text-[12px] hover:shadow cursor-pointer relative`}>
                        <CiAlignLeft />
                        <span>Cards</span>
                    </div>
                </div>
                <div>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="px-1 py-1 border border-gray-400 rounded-md" />
                </div>
            </div>
            {searchData.length > 0 ? <Pagination data={searchData} itemsPerPage={10}>
                {(items: IProduct[]) => (
                    <>
                        {typeShow === "cards" && <div className="w-full flex flex-col xl:grid xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                            {items.map((item: IProduct) => (
                                <Card key={item._id} ClassName="xl:w-[30rem]">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-2xl font-bold">{useSearchKey(item.nameProduct, search)}</h3>
                                            <span className="text-gray-500 text-sm">
                                                ${(item.price + item.ads + item.taxes + item.gain) - item.discount}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Category</h4>
                                                <span className="text-gray-500">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Count</h4>
                                                <span className="text-gray-500">
                                                    {item.count}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Store Name</h4>
                                                <span className="text-gray-500">
                                                    {item.Rental_Id.Room_Id.nameRoom}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Total</h4>
                                                <span className="text-gray-500">
                                                    ${((item.price + item.ads + item.taxes + item.gain) - item.discount) * item.count}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center gap-3 mt-2 text-sm font-medium">
                                            <span onClick={() => OpenModal("Sell One From Product", "Do you sure want to sell this one package?", "sellOne", "Sure", item._id)} className="cursor-pointer text-emerald-500 hover:text-emerald-600 transition-colors duration-150">
                                                Sell one
                                            </span>
                                            <span onClick={() => openModalCount(item._id, +item.count)} className="cursor-pointer text-blue-500 hover:text-blue-600 transition-colors duration-150">
                                                Sell Count
                                            </span>
                                            <span onClick={() => OpenModal("Sell Product", "Do you sure want to sell product?", "sellAll", "sure", item._id)} className="cursor-pointer text-fuchsia-500 hover:text-fuchsia-600 transition-colors duration-150">
                                                Sell All
                                            </span>
                                            <Link href={`/dashboard_customer/product/${item._id}`} className="cursor-pointer text-amber-500 hover:text-amber-600 transition-colors duration-150">
                                                Edit
                                            </Link>
                                            <span onClick={() => OpenModal("Delete Product", "Do you sure want to delete this product?", "delete", "Delete", item._id)} className="cursor-pointer text-rose-500 hover:text-rose-600 transition-colors duration-150">
                                                Delete
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>}

                        {typeShow === "table" && <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Count</th>
                                    <th>Store Name</th>
                                    <th>Price one</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: IProduct) => (
                                    <tr key={item._id}>
                                        <td>{useSearchKey(item.nameProduct, search)}</td>
                                        <td>{item.category}</td>
                                        <td>{item.count}</td>
                                        <td>{item.Rental_Id.Room_Id.nameRoom}</td>
                                        <td>${(item.price + item.ads + item.taxes + item.gain) - item.discount}</td>
                                        <td>${((item.price + item.ads + item.taxes + item.gain) - item.discount) * item.count}</td>
                                        <td className="flex items-center justify-center gap-2">
                                            <ContextMenu>
                                                <ContextMenuTrigger className="px-2 py-1 border border-gray-400 rounded cursor-pointer text-gray-400">
                                                    Right click
                                                </ContextMenuTrigger>
                                                <ContextMenuContent>
                                                    <ContextMenuItem onClick={() => OpenModal("Sell One From Product", "Do you sure want to sell this one package?", "sellOne", "Sure", item._id)}><FaAngleDoubleUp /> Sell One</ContextMenuItem>
                                                    <ContextMenuItem onClick={() => openModalCount(item._id, +item.count)}><FaAngleDoubleUp /> Sell Count</ContextMenuItem>
                                                    <ContextMenuItem onClick={() => OpenModal("Sell Product", "Do you sure want to sell product?", "sellAll", "sure", item._id)}><FaAngleDoubleUp /> Sell All</ContextMenuItem>
                                                    <Link href={`/dashboard_customer/product/${item._id}`}>
                                                        <ContextMenuItem><FaEdit /> Edit</ContextMenuItem>
                                                    </Link>
                                                    <ContextMenuItem onClick={() => OpenModal("Delete Product", "Do you sure want to delete this product?", "delete", "Delete", item._id)} variant="destructive"><MdDelete /> Delete</ContextMenuItem>
                                                </ContextMenuContent>
                                            </ContextMenu>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>}
                    </>
                )}
            </Pagination> : <Pagination data={products} itemsPerPage={10}>
                {(items: IProduct[]) => (
                    <>
                        {typeShow === "cards" && <div className="w-full flex flex-col xl:grid xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                            {items.map((item: IProduct) => (
                                <Card key={item._id} ClassName="xl:w-[30rem]">
                                    <div className="w-full">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-2xl font-bold">{item.nameProduct}</h3>
                                            <span className="text-gray-500 text-sm">
                                                ${(item.price + item.ads + item.taxes + item.gain) - item.discount}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Category</h4>
                                                <span className="text-gray-500">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Count</h4>
                                                <span className="text-gray-500">
                                                    {item.count}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Store Name</h4>
                                                <span className="text-gray-500">
                                                    {item.Rental_Id.Room_Id.nameRoom}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold">Total</h4>
                                                <span className="text-gray-500">
                                                    ${((item.price + item.ads + item.taxes + item.gain) - item.discount) * item.count}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center gap-3 mt-2 text-sm font-medium">
                                            <span className="cursor-pointer text-emerald-500 hover:text-emerald-600 transition-colors duration-150">
                                                Sell one
                                            </span>
                                            <span className="cursor-pointer text-blue-500 hover:text-blue-600 transition-colors duration-150">
                                                Sell Count
                                            </span>
                                            <span className="cursor-pointer text-fuchsia-500 hover:text-fuchsia-600 transition-colors duration-150">
                                                Sell All
                                            </span>
                                            <Link href={`/dashboard_customer/product/${item._id}`} className="cursor-pointer text-amber-500 hover:text-amber-600 transition-colors duration-150">
                                                Edit
                                            </Link>
                                            <span className="cursor-pointer text-rose-500 hover:text-rose-600 transition-colors duration-150">
                                                Delete
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>}

                        {typeShow === "table" && <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Count</th>
                                    <th>Store Name</th>
                                    <th>Price one</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item: IProduct) => (
                                    <tr key={item._id}>
                                        <td>{item.nameProduct}</td>
                                        <td>{item.category}</td>
                                        <td>{item.count}</td>
                                        <td>{item.Rental_Id.Room_Id.nameRoom}</td>
                                        <td>${(item.price + item.ads + item.taxes + item.gain) - item.discount}</td>
                                        <td>${((item.price + item.ads + item.taxes + item.gain) - item.discount) * item.count}</td>
                                        <td className="flex items-center justify-center gap-2">
                                            <ContextMenu>
                                                <ContextMenuTrigger className="px-2 py-1 border border-gray-400 rounded cursor-pointer text-gray-400">
                                                    Right click
                                                </ContextMenuTrigger>
                                                <ContextMenuContent>
                                                    <ContextMenuItem><FaAngleDoubleUp /> Sell One</ContextMenuItem>
                                                    <ContextMenuItem><FaAngleDoubleUp /> Sell Count</ContextMenuItem>
                                                    <ContextMenuItem><FaAngleDoubleUp /> Sell All</ContextMenuItem>
                                                    <Link href={`/dashboard_customer/product/${item._id}`}>
                                                        <ContextMenuItem><FaEdit /> Edit</ContextMenuItem>
                                                    </Link>
                                                    <ContextMenuItem variant="destructive"><MdDelete /> Delete</ContextMenuItem>
                                                </ContextMenuContent>
                                            </ContextMenu>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>}
                    </>
                )}
            </Pagination>}

            <Modal
                openState={{ isOpen: showModal, setIsOpen: setShowModal }}
                header={{ title: msgModal.title, isClose: true }}
                footer={{ btn: (<Btn isLoading={loadingBtn} BtnStatus={msgModal.btn === "Delete" ? "alarm" : "usually"} onClick={() => actionsProduct(msgModal.fun)}>{msgModal.btn}</Btn>) }}
            >
                <div>{msgModal.text}</div>
            </Modal>

            <Modal
                openState={{ isOpen: showModalCount, setIsOpen: setShowModalCount }}
                header={{ title: "Sell by Count", isClose: true }}
                footer={{ btn: (<Btn isDisabled={count >= numProduct} isLoading={loadingBtn} onClick={countFun}>Save</Btn>) }}
            >
                <div>
                    <Inp
                        isLabel
                        label="Write count which want sell them:"
                        type="number"
                        onChange={(e) => setCount(+e.target.value)}
                        msg={count >= numProduct ? { case: "error", msg: "please make count less than count product" } : { case: "", msg: "" }}
                    />
                </div>
            </Modal>

        </div>
    )
}
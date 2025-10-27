"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "./pagination.module.scss";

interface PaginationProps<T> {
    data: T[];
    itemsPerPage: number;
    children: (currentItems: T[]) => React.ReactNode;
}

export default function Pagination<T>({ data, itemsPerPage, children }: PaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    return (
        <div className={classes.containerPagination}>
            <div>
                {children(currentItems)}
            </div>

            <div>
                <ReactPaginate
                    className={classes.pagination}
                    containerClassName="inline-flex items-center -space-x-px mt-6"
                    pageClassName="px-3 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                    pageLinkClassName=""
                    previousClassName="px-3 py-2 border border-gray-300 rounded-l-md bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                    previousLinkClassName=""
                    nextClassName="px-3 py-2 border border-gray-300 rounded-r-md bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
                    nextLinkClassName=""
                    breakClassName="px-3 py-2 border border-gray-300 bg-white text-gray-500"
                    breakLinkClassName=""
                    activeClassName="!bg-blue-500 !text-white !border-blue-500"
                    disabledClassName="opacity-50 cursor-not-allowed hover:bg-white"
                    breakLabel="..."
                    nextLabel="Next"
                    previousLabel="Previous"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    renderOnZeroPageCount={null}
                    forcePage={currentPage}
                />
            </div>
        </div>
    );
}


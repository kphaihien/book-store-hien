// import { CiSquarePlus } from "react-icons/ci";
// import { useFetchAllBooksQuery } from "../../../redux/features/books/bookApi";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import AddBook from "./AddBook";
// import getBaseUrl from "../../../utils/baseUrl";
// import axios from "axios";

// const BookTable = () => {
//     const [isAddBookOn,setIsAddBookOn]=useState(false)
//     const {data:books=[]}=useFetchAllBooksQuery();
//     const [category,setCategory]=useState([])
    
//     const getCategory=(cateId)=>{
//         return category?.find((cate)=>cate._id===cateId) ||null
//     }

    
//     const handleOnAddBook=()=>{
//         setIsAddBookOn(true)
//     }
//     const handleDeleteBook=()=>{
//         alert("Chức năng đang được phát triển")
//     }

//     useEffect(()=>{
//         axios.get(`${getBaseUrl()}/api/category/`).then((res)=>setCategory(res.data.data))
//     },[])
    
//     return (
//         <div className="flex flex-col gap-3">
//             <Link className="self-end" to="/dashboard/manage-book/add-book">  <button onClick={handleOnAddBook}>
//                     <CiSquarePlus className="transition transform cursor-pointer hover:scale-110" size="40"/>
//                     </button>
//             </Link>
//             {
//                 isAddBookOn&&<AddBook isOpen={isAddBookOn} onClose={()=>setIsAddBookOn(false)} categories={category}/>
//             }
//             <div className="p-6 bg-white rounded-lg shadow-md">
//                 <h2 className="mb-4 text-xl font-semibold">Danh sách sách</h2>
//                 <table className="w-full text-left">
//                     <thead>
//                         <tr className="text-center bg-gray-100">
//                             <th className="p-3">ID</th>
//                             <th className="p-3">Ảnh</th>
//                             <th className="p-3">Tên sách</th>
//                             <th className="p-3">Tác giả</th>
//                             <th className="p-3">Thể loại</th>
//                             <th className="p-3">Giá</th>
//                             <th className="p-3">Đã bán</th>
//                             <th className="p-3">Tồn kho</th>
//                             <th className="p-3">Hành động</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {books.map((book,index) => (
//                             <tr key={index} className="text-center border-b">
//                                 <td className="p-3">{index+1}</td>
//                                 <td className="p-3"><img className="object-cover w-25 h-30" src={`${getBaseUrl()}/public/${book?.book_img}`}/></td>
//                                 <td className="p-3">{book.book_name}</td>
//                                 <td className="p-3">{book.author}</td>
//                                 <td className="p-3">{getCategory(book.category_id)
//                                     ? getCategory(book.category_id).category_name
//                                     : 'Không rõ'}</td>
//                                 <td className="p-3">{book.old_price.toLocaleString("vi-VN")} VNĐ</td>
//                                 <td className="p-3">{book.stock}</td>
//                                 <td className="p-3">{book.sold_quantity?book.sold_quantity:"0"}</td>
//                                 <td className="p-3">
//                                     <button className="mr-2 text-blue-600 cursor-pointer hover:underline">
//                                         Sửa
//                                     </button>
//                                     <button onClick={handleDeleteBook} className="text-red-600 cursor-pointer hover:underline">Xóa</button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default BookTable;


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
    Table,
    Button,
    Popconfirm,
    Input,
    Tag,
    Space,
    Typography,
    Tooltip,
    message,
} from "antd";
import {
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    BookOutlined,
    SearchOutlined,
} from "@ant-design/icons";

import {
    useFetchAllBooksQuery,
    useDeleteBookMutation,
} from "../../../redux/features/books/bookApi";
import getBaseUrl from "../../../utils/baseUrl";
import EditBookModal from "../../../components/EditBookModal";
import AddBook from "./AddBook";

const { Title } = Typography;

const BookTable = () => {
    const { data: books = [], isLoading } = useFetchAllBooksQuery();
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [editingBook, setEditingBook] = useState(null); // null = modal đóng

    const [isOpenAddBookModal, setIsOpenAddBookModal] = useState(false);

    const handleOpenBookModal = () => {
        setIsOpenAddBookModal(true);
    };

    useEffect(() => {
        axios
            .get(`${getBaseUrl()}/api/category/`)
            .then((res) => setCategories(res.data.data))
            .catch(() => message.error("Không thể tải danh mục"));
    }, []);

    const getCategoryName = (cateId) =>
        categories.find((c) => c._id === cateId)?.category_name || "Không rõ";

    const normalize = (str = "") =>
        str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "d");

    const filteredBooks = books.filter((book) =>
        normalize(book.book_name).includes(normalize(searchText))
    );

    const handleDelete = async (id) => {
        try {
            await deleteBook(id).unwrap();
            message.success("Xóa sách thành công!");
        } catch (err) {
            message.error(err?.data?.message || "Xóa thất bại!");
            console.log(err);
            
        }
    };

    const columns = [
        {
            title: "#",
            key: "index",
            width: 55,
            align: "center",
            render: (_, __, index) => (
                <span className="font-mono text-xs text-gray-400">{index + 1}</span>
            ),
        },
        {
            title: "Ảnh",
            dataIndex: "book_img",
            key: "book_img",
            width: 80,
            align: "center",
            render: (img) => (
                <img
                    src={`${getBaseUrl()}/public/${img}`}
                    alt="book"
                    className="object-cover w-12 h-16 mx-auto rounded shadow-sm"
                />
            ),
        },
        {
            title: "Tên sách",
            dataIndex: "book_name",
            key: "book_name",
            render: (name) => (
                <span className="font-medium text-gray-800 line-clamp-2">{name}</span>
            ),
        },
        {
            title: "Tác giả",
            dataIndex: "author",
            key: "author",
            width: 140,
            render: (author) => <span className="text-gray-600">{author}</span>,
        },
        {
            title: "Thể loại",
            dataIndex: "category_id",
            key: "category_id",
            width: 130,
            render: (cateId) => (
                <Tag color="blue" className="text-xs rounded-full">
                    {getCategoryName(cateId)}
                </Tag>
            ),
        },
        {
            title: "Giá",
            dataIndex: "old_price",
            key: "old_price",
            width: 130,
            align: "right",
            render: (price) => (
                <span className="font-semibold text-emerald-600">
                    {price?.toLocaleString("vi-VN")}₫
                </span>
            ),
        },
        {
            title: "Tồn kho",
            dataIndex: "stock",
            key: "stock",
            width: 90,
            align: "center",
            render: (stock) => (
                <Tag color={stock > 10 ? "green" : stock > 0 ? "orange" : "red"}>
                    {stock}
                </Tag>
            ),
        },
        {
            title: "Đã bán",
            dataIndex: "sold_quantity",
            key: "sold_quantity",
            width: 80,
            align: "center",
            render: (val) => <span className="text-gray-500">{val ?? 0}</span>,
        },
        {
            title: "Hành động",
            key: "actions",
            width: 110,
            align: "center",
            render: (_, record) => (
                <Space size="small">
                    <Tooltip title="Chỉnh sửa">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => setEditingBook(record)}
                        />
                    </Tooltip>
                    <Popconfirm
                        title="Xóa sách"
                        description={`Bạn chắc chắn muốn xóa "${record.book_name}"?`}
                        onConfirm={() => handleDelete(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true, loading: isDeleting }}
                    >
                        <Tooltip title="Xóa">
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <BookOutlined className="text-xl text-blue-500" />
                    <Title level={4} className="!mb-0 !text-gray-800">
                        Quản lý sách
                    </Title>
                    <Tag color="blue" className="ml-1">
                        {filteredBooks.length} cuốn
                    </Tag>
                </div>

                <div className="flex flex-wrap items-center justify-end flex-1 gap-2">
                    <Input
                        allowClear
                        prefix={<SearchOutlined className="text-gray-400" />}
                        placeholder="Tìm theo tên sách..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="max-w-xs"
                    />
                    <Link to="/dashboard/manage-book/add-book">
                        <Button
                            type="primary"
                            onClick={handleOpenBookModal}
                            icon={<PlusCircleOutlined />}
                            className="bg-blue-500 border-none shadow-sm hover:bg-blue-600"
                        >
                            Thêm sách
                        </Button>
                    </Link>
                </div>
            </div>
            {isOpenAddBookModal && (
                <AddBook
                    isOpen={isOpenAddBookModal}
                    onClose={() => setIsOpenAddBookModal(false)}
                    categories={categories}
                />
            )}
            
            {/* Table */}
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                <Table
                    columns={columns}
                    dataSource={filteredBooks}
                    rowKey="_id"
                    loading={isLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} sách`,
                        className: "px-4 pb-2",
                    }}
                    rowClassName="hover:bg-blue-50/40 transition-colors"
                    scroll={{ x: 900 }}
                    size="middle"
                />
            </div>

            {/* Edit Modal — tách thành component riêng */}
            <EditBookModal
                book={editingBook}
                categories={categories}
                onClose={() => setEditingBook(null)}
            />
        </div>
    );
};

export default BookTable;
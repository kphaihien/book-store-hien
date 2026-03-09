import { useState, useEffect } from "react";
import { Table, Input, Tag, Button, Popconfirm, Tooltip, Typography, message } from "antd";
import {
    SearchOutlined,
    DeleteOutlined,
    TeamOutlined,
    ManOutlined,
    WomanOutlined,
    QuestionCircleOutlined,
} from "@ant-design/icons";

import {
    useDeleteUserWithIdMutation,
    useSearchUserQuery,
} from "../../../redux/features/users/usersApi";
import Loading from "../../../components/Loading";

const { Title } = Typography;

const genderMap = {
    male: { label: "Nam", color: "blue", icon: <ManOutlined /> },
    female: { label: "Nữ", color: "pink", icon: <WomanOutlined /> },
};

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const UserTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(searchQuery), 800);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const { data, isLoading } = useSearchUserQuery({ q: debouncedQuery });
    const [deleteUserWithId, { isLoading: isDeleting }] = useDeleteUserWithIdMutation();
    const users = data?.users || [];

    const handleDelete = async (userId) => {
        try {
            await deleteUserWithId(userId).unwrap();
            message.success("Đã xóa người dùng thành công!");
        } catch (err) {
            message.error(err?.data?.message || "Xóa thất bại!");
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
            title: "ID",
            dataIndex: "_id",
            key: "_id",
            width: 180,
            render: (id) => (
                <span className="font-mono text-xs text-gray-400 truncate block max-w-[160px]">
                    {id}
                </span>
            ),
        },
        {
            title: "Tên đăng nhập",
            dataIndex: "user_name",
            key: "user_name",
            render: (name) => (
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-semibold text-blue-500 bg-blue-100 rounded-full">
                        {name?.[0]?.toUpperCase() || "?"}
                    </div>
                    <span className="font-medium text-gray-800">{name || "—"}</span>
                </div>
            ),
        },
        {
            title: "Tên đầy đủ",
            dataIndex: "full_name",
            key: "full_name",
            render: (name) => (
                <span className="text-gray-600">{name || <span className="italic text-gray-300">Chưa cập nhật</span>}</span>
            ),
        },
        {
            title: "Giới tính",
            dataIndex: "user_gender",
            key: "user_gender",
            width: 100,
            align: "center",
            render: (gender) => {
                const g = genderMap[gender?.toLowerCase()];
                return g ? (
                    <Tag color={g.color} icon={g.icon}>
                        {g.label}
                    </Tag>
                ) : (
                    <Tag icon={<QuestionCircleOutlined />} color="default">
                        Chưa đặt
                    </Tag>
                );
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 145,
            render: (d) => (
                <span className="text-xs text-gray-500">{formatDate(d)}</span>
            ),
        },
        {
            title: "Cập nhật",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 145,
            render: (d) => (
                <span className="text-xs text-gray-500">{formatDate(d)}</span>
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            width: 90,
            align: "center",
            render: (_, record) => (
                <Popconfirm
                    title="Xóa người dùng"
                    description={`Bạn chắc chắn muốn xóa "${record.user_name}"?`}
                    onConfirm={() => handleDelete(record._id)}
                    okText="Xóa"
                    cancelText="Hủy"
                    okButtonProps={{ danger: true, loading: isDeleting }}
                >
                    <Tooltip title="Xóa người dùng">
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        />
                    </Tooltip>
                </Popconfirm>
            ),
        },
    ];

    if (isLoading) return <Loading />;

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <TeamOutlined className="text-xl text-blue-500" />
                    <Title level={4} className="!mb-0 !text-gray-800">
                        Quản lý người dùng
                    </Title>
                    <Tag color="blue" className="ml-1">
                        {users.length} người dùng
                    </Tag>
                </div>

                <Input
                    allowClear
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="Tên đăng nhập, email, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="_id"
                    loading={isLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} người dùng`,
                        className: "px-4 pb-2",
                    }}
                    rowClassName="hover:bg-blue-50/40 transition-colors"
                    scroll={{ x: 900 }}
                    size="middle"
                />
            </div>
        </div>
    );
};

export default UserTable;
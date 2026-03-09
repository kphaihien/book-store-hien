import { useState, useEffect } from "react";
import { Card, Select, Spin, Tag, Table, Empty } from "antd";
import {
    ShoppingCartOutlined,
    BookOutlined,
    TeamOutlined,
    DollarOutlined,
    RiseOutlined,
    FallOutlined,
    ClockCircleOutlined,
    CarOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useGetDashboardStatsQuery } from "../../../redux/features/stats/statsApi";

const { Option } = Select;


const COLORS = {
    blue: "#3b82f6",
    green: "#10b981",
    orange: "#f59e0b",
    red: "#ef4444",
    purple: "#8b5cf6",
    cyan: "#06b6d4",
    slate: "#64748b",
};

const ORDER_STATUS_CONFIG = {
    pending: { label: "Chờ xử lý", color: COLORS.orange, icon: <ClockCircleOutlined /> },
    shipping: { label: "Đang giao", color: COLORS.cyan, icon: <CarOutlined /> },
    delivered: { label: "Đã giao", color: COLORS.green, icon: <CheckCircleOutlined /> },
    cancelled: { label: "Đã hủy", color: COLORS.red, icon: <CloseCircleOutlined /> },
};

const PIE_COLORS = [COLORS.orange, COLORS.cyan, COLORS.green, COLORS.red];


const StatCard = ({ title, value, icon, color, sub, trend }) => (
    <div
        className="flex flex-col gap-3 p-5 transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
    >
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">{title}</span>
            <div
                className="flex items-center justify-center w-10 h-10 text-lg text-white rounded-xl"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>
        </div>
        <div>
            <p className="text-2xl font-bold leading-none text-gray-800">{value}</p>
            {sub && (
                <p className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    {trend === "up" && <RiseOutlined className="text-green-500" />}
                    {trend === "down" && <FallOutlined className="text-red-500" />}
                    {sub}
                </p>
            )}
        </div>
    </div>
);


const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="px-4 py-3 text-sm bg-white border border-gray-100 shadow-lg rounded-xl">
            <p className="mb-1 font-semibold text-gray-700">{label}</p>
            {payload.map((p, i) => (
                <p key={i} style={{ color: p.color }} className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: p.color }} />
                    {p.name}: <span className="ml-1 font-semibold">{p.value?.toLocaleString("vi-VN")}</span>
                    {p.name === "Doanh thu" ? "₫" : ""}
                </p>
            ))}
        </div>
    );
};

const topBooksColumns = [
    {
        title: "#",
        key: "rank",
        width: 44,
        render: (_, __, i) => (
            <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
          ${i === 0 ? "bg-yellow-400 text-white" :
                        i === 1 ? "bg-gray-300 text-gray-700" :
                            i === 2 ? "bg-orange-300 text-white" : "bg-gray-100 text-gray-500"}`}
            >
                {i + 1}
            </span>
        ),
    },
    {
        title: "Tên sách",
        dataIndex: "book_name",
        key: "book_name",
        render: (name) => <span className="text-sm font-medium text-gray-800">{name}</span>,
    },
    {
        title: "Đã bán",
        dataIndex: "sold_quantity",
        key: "sold_quantity",
        width: 90,
        align: "right",
        render: (v) => <Tag color="blue">{v?.toLocaleString("vi-VN")}</Tag>,
    },
    {
        title: "Doanh thu",
        dataIndex: "revenue",
        key: "revenue",
        width: 130,
        align: "right",
        render: (v) => (
            <span className="text-sm font-semibold text-emerald-600">
                {v?.toLocaleString("vi-VN")}₫
            </span>
        ),
    },
];

const DashboardStats = () => {
    const [period, setPeriod] = useState("month");
    const { data, isLoading } = useGetDashboardStatsQuery({ period });


    const stats = data?.stats || {};
    const revenueChart = data?.revenueChart || [];   
    const orderStatusChart = data?.orderStatusChart || []; 
    const topBooks = data?.topBooks || [];

    const fmt = (n) => (n ?? 0).toLocaleString("vi-VN");

    return (
        <div className="flex flex-col min-h-screen gap-6 p-4 bg-gray-50">


            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold leading-tight text-gray-800">Tổng quan</h1>
                    <p className="text-sm text-gray-400">Dữ liệu thống kê hệ thống</p>
                </div>
                <Select
                    value={period}
                    onChange={setPeriod}
                    className="w-36"
                    size="middle"
                >
                    <Option value="week">7 ngày qua</Option>
                    <Option value="month">30 ngày qua</Option>
                    <Option value="year">Năm nay</Option>
                </Select>
            </div>

            <Spin spinning={isLoading}>


                <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
                    <StatCard
                        title="Tổng doanh thu"
                        value={`${fmt(stats.totalRevenue)}₫`}
                        icon={<DollarOutlined />}
                        color={COLORS.blue}
                        sub={stats.revenueGrowth ? `${stats.revenueGrowth > 0 ? "+" : ""}${stats.revenueGrowth}% so với kỳ trước` : ""}
                        trend={stats.revenueGrowth > 0 ? "up" : "down"}
                    />
                    <StatCard
                        title="Đơn hàng"
                        value={fmt(stats.totalOrders)}
                        icon={<ShoppingCartOutlined />}
                        color={COLORS.orange}
                        sub={`${fmt(stats.pendingOrders)} đang chờ xử lý`}
                    />
                    <StatCard
                        title="Sách đã bán"
                        value={fmt(stats.totalBooksSold)}
                        icon={<BookOutlined />}
                        color={COLORS.green}
                        sub={`${fmt(stats.totalBooks)} đầu sách`}
                    />
                    <StatCard
                        title="Người dùng"
                        value={fmt(stats.totalUsers)}
                        icon={<TeamOutlined />}
                        color={COLORS.purple}
                        sub={`${fmt(stats.newUsers)} người dùng mới`}
                        trend="up"
                    />
                </div>

                {/* ── Charts Row ── */}
                <div className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-3">

                    {/* Revenue Area Chart — chiếm 2/3 */}
                    <div className="p-5 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <p className="font-semibold text-gray-700">Doanh thu & Đơn hàng</p>
                            <span className="px-2 py-1 text-xs text-gray-400 rounded-lg bg-gray-50">
                                {period === "week" ? "7 ngày" : period === "month" ? "30 ngày" : "12 tháng"}
                            </span>
                        </div>
                        {revenueChart.length === 0 ? (
                            <Empty description="Chưa có dữ liệu" className="py-8" />
                        ) : (
                            <ResponsiveContainer width="100%" height={240}>
                                <AreaChart data={revenueChart} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={COLORS.blue} stopOpacity={0.15} />
                                            <stop offset="95%" stopColor={COLORS.blue} stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={COLORS.orange} stopOpacity={0.15} />
                                            <stop offset="95%" stopColor={COLORS.orange} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={50}
                                        tickFormatter={(v) => v >= 1_000_000 ? `${(v / 1_000_000).toFixed(1)}M` : v.toLocaleString()} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                                    <Area type="monotone" dataKey="revenue" name="Doanh thu"
                                        stroke={COLORS.blue} strokeWidth={2} fill="url(#colorRevenue)" dot={false} />
                                    <Area type="monotone" dataKey="orders" name="Đơn hàng"
                                        stroke={COLORS.orange} strokeWidth={2} fill="url(#colorOrders)" dot={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>


                    <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <p className="mb-4 font-semibold text-gray-700">Trạng thái đơn hàng</p>
                        {orderStatusChart.length === 0 ? (
                            <Empty description="Chưa có dữ liệu" className="py-8" />
                        ) : (
                            <>
                                <ResponsiveContainer width="100%" height={180}>
                                    <PieChart>
                                        <Pie
                                            data={orderStatusChart}
                                            cx="50%" cy="50%"
                                            innerRadius={50} outerRadius={75}
                                            paddingAngle={3}
                                            dataKey="value"
                                        >
                                            {orderStatusChart.map((_, i) => (
                                                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(v) => [`${v} đơn`, ""]} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex flex-col gap-2 mt-2">
                                    {orderStatusChart.map((item, i) => {
                                        const cfg = ORDER_STATUS_CONFIG[item.name] || {};
                                        const total = orderStatusChart.reduce((s, x) => s + x.value, 0);
                                        const pct = total ? Math.round((item.value / total) * 100) : 0;
                                        return (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                                        style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                                                    <span className="text-gray-600">{cfg.label || item.name}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-gray-800">{item.value}</span>
                                                    <span className="w-8 text-xs text-right text-gray-400">{pct}%</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>


                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                    {/* Top selling books — 2/3 */}
                    <div className="p-5 bg-white border border-gray-100 shadow-sm lg:col-span-2 rounded-2xl">
                        <p className="flex items-center gap-2 mb-4 font-semibold text-gray-700">
                            <BookOutlined className="text-blue-500" />
                            Top sách bán chạy
                        </p>
                        <Table
                            columns={topBooksColumns}
                            dataSource={topBooks}
                            rowKey={(r, i) => r._id || i}
                            pagination={false}
                            size="small"
                            locale={{ emptyText: <Empty description="Chưa có dữ liệu" /> }}
                            rowClassName="hover:bg-blue-50/30 transition-colors"
                        />
                    </div>


                    <div className="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
                        <p className="flex items-center gap-2 mb-4 font-semibold text-gray-700">
                            <DollarOutlined className="text-emerald-500" />
                            Phương thức TT
                        </p>
                        {data?.paymentChart?.length === 0 ? (
                            <Empty description="Chưa có dữ liệu" className="py-8" />
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart
                                    data={data?.paymentChart || []}
                                    margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                                    barSize={32}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        formatter={(v, name) => [`${v} đơn`, name]}
                                        contentStyle={{ borderRadius: 12, border: "1px solid #f1f5f9", fontSize: 13 }}
                                    />
                                    <Bar dataKey="count" name="Số đơn" radius={[6, 6, 0, 0]}>
                                        {(data?.paymentChart || []).map((_, i) => (
                                            <Cell key={i} fill={i === 0 ? COLORS.blue : COLORS.purple} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}

                        <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-gray-100">
                            <div className="p-3 text-center bg-green-50 rounded-xl">
                                <p className="text-lg font-bold text-green-600">{fmt(stats.paidOrders)}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Đã thanh toán</p>
                            </div>
                            <div className="p-3 text-center bg-orange-50 rounded-xl">
                                <p className="text-lg font-bold text-orange-500">{fmt(stats.unpaidOrders)}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Chưa thanh toán</p>
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        </div>
    );
};

export default DashboardStats;
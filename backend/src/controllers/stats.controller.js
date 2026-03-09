const Order=require("../models/order.model")
const Book=require("../models/book.model")
const User=require("../models/user.model")

// ── Helper: tính khoảng thời gian ────────────────────────────────
const getPeriodRange = (period) => {
    const now = new Date();
    const start = new Date();

    if (period === 'week') start.setDate(now.getDate() - 7);
    if (period === 'month') start.setDate(now.getDate() - 30);
    if (period === 'year') start.setFullYear(now.getFullYear(), 0, 1); // 1/1 năm nay

    const prevEnd = new Date(start);
    const prevStart = new Date(start);
    if (period === 'week') prevStart.setDate(prevStart.getDate() - 7);
    if (period === 'month') prevStart.setDate(prevStart.getDate() - 30);
    if (period === 'year') prevStart.setFullYear(prevStart.getFullYear() - 1, 0, 1);

    return { start, end: now, prevStart, prevEnd };
};


const getGroupFormat = (period) => {
    if (period === 'year') return { $dateToString: { format: '%m/%Y', date: '$createdAt' } };
    if (period === 'month') return { $dateToString: { format: '%d/%m', date: '$createdAt' } };
    return { $dateToString: { format: '%d/%m', date: '$createdAt' } };
};

///api/dashboard/stats?period=week|month|year
const getDashboardStats = async (req, res) => {
    try {
        const period = req.query.period || 'month';
        const { start, end, prevStart, prevEnd } = getPeriodRange(period);

        // ── 1. Tổng hợp đơn hàng kỳ này ─────────────────────────
        const [orderAgg] = await Order.aggregate([
            { $match: { createdAt: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },
                    totalRevenue: { $sum: '$order_total_cost' },
                    pendingOrders: { $sum: { $cond: [{ $eq: ['$order_status', 'pending'] }, 1, 0] } },
                    paidOrders: { $sum: { $cond: [{ $eq: ['$payment_status', 'paid'] }, 1, 0] } },
                    unpaidOrders: { $sum: { $cond: [{ $eq: ['$payment_status', 'pending'] }, 1, 0] } },
                },
            },
        ]);

        const [prevOrderAgg] = await Order.aggregate([
            { $match: { createdAt: { $gte: prevStart, $lte: prevEnd } } },
            { $group: { _id: null, totalRevenue: { $sum: '$order_total_cost' } } },
        ]);

        const currRevenue = orderAgg?.totalRevenue || 0;
        const prevRevenue = prevOrderAgg?.totalRevenue || 0;
        const revenueGrowth = prevRevenue > 0
            ? Math.round(((currRevenue - prevRevenue) / prevRevenue) * 100)
            : null;

            //thong ke sach va user
        const [totalBooks, totalUsers, newUsers] = await Promise.all([
            Book.countDocuments(),
            User.countDocuments({ role: 'user' }),
            User.countDocuments({ role: 'user', createdAt: { $gte: start, $lte: end } }),
        ]);

        const [bookSoldAgg] = await Book.aggregate([
            { $group: { _id: null, totalBooksSold: { $sum: '$sold_quantity' } } },
        ]);


        //chart doanh thu theo ngay thang
        const revenueRaw = await Order.aggregate([
            { $match: { createdAt: { $gte: start, $lte: end } } },
            {
                $group: {
                    _id: getGroupFormat(period),
                    revenue: { $sum: '$order_total_cost' },
                    orders: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const revenueChart = revenueRaw.map((r) => ({
            label: r._id,
            revenue: r.revenue,
            orders: r.orders,
        }));


        //trang thai don hang
        const statusRaw = await Order.aggregate([
            { $match: { createdAt: { $gte: start, $lte: end } } },
            { $group: { _id: '$order_status', value: { $sum: 1 } } },
        ]);

        const orderStatusChart = statusRaw.map((s) => ({
            name: s._id,
            value: s.value,
        }));


        //phuong thuc thanh toan
        const paymentRaw = await Order.aggregate([
            { $match: { createdAt: { $gte: start, $lte: end } } },
            { $group: { _id: '$payment_type', count: { $sum: 1 } } },
        ]);

        const paymentLabelMap = { cash: 'COD', vnpay: 'VNPay' };
        const paymentChart = paymentRaw.map((p) => ({
            label: paymentLabelMap[p._id] || p._id,
            count: p.count,
        }));


        // ── 7. Top 5 sách bán chạy ────────────────────────────────
        // Join order_details với book để lấy tên + tính doanh thu
        const topBooks = await Order.aggregate([
            { $match: { createdAt: { $gte: start, $lte: end }, order_status: { $ne: 'cancelled' } } },
            { $unwind: '$order_details' },
            {
                $group: {
                    _id: '$order_details.book_id',
                    sold_quantity: { $sum: '$order_details.quantity' },
                    revenue: { $sum: { $multiply: ['$order_details.unit_price', '$order_details.quantity'] } },
                },
            },
            { $sort: { sold_quantity: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book',
                },
            },
            { $unwind: '$book' },
            {
                $project: {
                    _id: 1,
                    book_name: '$book.book_name',
                    sold_quantity: 1,
                    revenue: 1,
                },
            },
        ]);
        res.status(200).json({
            stats: {
                totalRevenue: currRevenue,
                revenueGrowth,
                totalOrders: orderAgg?.totalOrders || 0,
                pendingOrders: orderAgg?.pendingOrders || 0,
                paidOrders: orderAgg?.paidOrders || 0,
                unpaidOrders: orderAgg?.unpaidOrders || 0,
                totalBooks,
                totalBooksSold: bookSoldAgg?.totalBooksSold || 0,
                totalUsers,
                newUsers,
            },
            revenueChart,
            orderStatusChart,
            paymentChart,
            topBooks,
        });

    } catch (error) {
        console.error('Lỗi getDashboardStats:', error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu thống kê' });
    }
};

module.exports = { getDashboardStats };
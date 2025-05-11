const removeVietnamese=(str) =>{
    return str
        .normalize('NFD')                             // Tách các dấu ra khỏi chữ cái
        .replace(/[\u0300-\u036f]/g, '')             // Xóa các dấu
        .replace(/đ/g, 'd')                          // thay đ -> d
        .replace(/Đ/g, 'D')                          // thay Đ -> D
        .replace(/[^a-zA-Z0-9\s]/g, '')              // Xóa ký tự đặc biệt
        .replace(/\s+/g, '-')                        // Thay dấu cách bằng dấu gạch ngang
        .toLowerCase()
        .replace(/^-+|-+$/g, '');                    // Xóa gạch ngang đầu/cuối
}
module.exports=removeVietnamese
const beautyVND=(amount)=>{
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"đ";
}
export default beautyVND
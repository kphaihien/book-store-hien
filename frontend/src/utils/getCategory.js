const getCategory=async(req,res)=>{
    try {
        const response = await axios.post(`${getBaseUrl()}/api/category/`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const category = await response.data
    } catch (error) {
        console.log(error);
        
    }
}
export default {getCategory}
import ErrorMessage from "../utils/errorMessage.js"
const notFound = (req , res , next) => {
    const err = new ErrorMessage("Page Not Found", 404);
    next(err)
}
export default notFound
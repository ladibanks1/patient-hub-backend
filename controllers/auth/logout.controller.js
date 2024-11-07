import { blacklistToken } from "../../utils/blacklistToken.js";

const logout =  (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    blacklistToken(token);
    req.headers["authorization"] = " ";
    res.json({ message: "Logged Out Successfully"});
};


export const isAuth = (req, res) => {
    try {
        const isAuthenticated = req.decoded
        res.status(200).json({message : "Authentication Successful"})
    } catch (error) {
        next(error)
    }
}

export default logout
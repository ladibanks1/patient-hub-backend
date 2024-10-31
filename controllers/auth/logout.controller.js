import { blacklistToken } from "../../utils/blacklistToken.js";

const logout =  (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    blacklistToken(token);
    req.headers["authorization"] = " ";
    res.json({ message: "Logged Out Successfully"});
};


export default logout
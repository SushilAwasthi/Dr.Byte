import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id, email, role, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        res.status(401).json({ message: "Token not received" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token verification successful");
        res.locals.jwtData = decoded;
        next();
    }
    catch (err) {
        console.error("JWT error:", err.message);
        if (err.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token expired" });
        }
        else {
            res.status(403).json({ message: "Token invalid" });
        }
    }
};
//# sourceMappingURL=token-manager.js.map
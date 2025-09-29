import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password"); // attach user to request
            next();
        } catch (err) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

// Middleware to check for organizer role
export const isOrganizer = (req, res, next) => {
    if (req.user.role !== "organizer") {
        return res.status(403).json({ message: "Access denied: Organizer only" });
    }
    next();
};

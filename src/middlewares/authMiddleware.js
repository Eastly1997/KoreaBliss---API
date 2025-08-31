const protectAdmin = (req, res, next) => {
    const token = req.headers["x-admin-token"];
     if (!token || token !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Not authorized as admin" });
    }
    next();
};

module.exports = { protectAdmin };
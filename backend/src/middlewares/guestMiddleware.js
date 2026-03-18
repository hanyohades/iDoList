export const requireGuestId = (req, res, next) => {
    const guestId = req.header("x-guest-id");

    if (!guestId) {
        return res.status(400).json({message: "Guest ID is required"});
    }

    req.guestId = guestId;
    next();
};
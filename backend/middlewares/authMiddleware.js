import jwt from "jsonwebtoken"
import User from "../admin-api/models/user.model.js"

export const verifyToken = (roles) => async (req, res, next) => {  
  const token = req.cookies.access_token
  if (!token) return res.status(401).json({ message: "Token not found!" })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const user = await User.findById(decoded.id)
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "You need to be a admin to perform this action.." })
    }
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" })
  }
}
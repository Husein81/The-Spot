import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET,{
        expiresIn: '1d'
    });
    const OneDay = 24 * 60 * 60 * 1000;
    res.cookie('jwt', token, {
        httpOnly:true,
        maxAge: OneDay
    })
}

export default generateToken;
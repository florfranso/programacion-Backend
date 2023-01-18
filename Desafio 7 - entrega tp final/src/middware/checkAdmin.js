const checkAdmin = (req, res, next) => {

    const token = true
    if (!token) {
        res.status(401).json({
            message: "No estas autorizado para acceder a este recurso"
        })
    } else {
        next()
    }
}
export default checkAdmin
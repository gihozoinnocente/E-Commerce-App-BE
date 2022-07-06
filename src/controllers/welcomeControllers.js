export const welcome = (req, res, next) => {
    console.log("welcome")
    res.status(200).json({ status: 200, message: "Welcome to th e-commerce app api", data: "" })
}

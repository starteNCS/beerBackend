import Express from "express";
import { currentTimeStamp } from "./src/utils/date.util";
import bodyParser from "body-parser"
import { ConsoleColor } from "./src/utils/console-colors.enum";

const app = Express()
const port = 3000

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(`${ConsoleColor.FgGreen} ${req.method} ${ConsoleColor.Reset} => ${req.path} at ${currentTimeStamp()}`)
    next()
})

app.get("/", (req, res) => {
    res.send("hello world")
})


app.listen(port, () => console.log(`Beer Backend listening on port ${port}`))
import { ScopeHandler } from "./src/utils/scope/scope-handler.service"
import { GroupService } from "./src/services/group.service"
import { LoggerService } from "./src/utils/logger/logger.service"
import Express, { raw } from "express"
import bodyParser from "body-parser"
import { currentTimeStamp } from "./src/utils/date.util"
import { ConsoleColor } from "./src/utils/console-colors.enum"
import { initalizeFirebaseConnection } from "./src/firebase/firebase-connetion"

initalizeFirebaseConnection()

const LoggerServiceInstance = new LoggerService()
const GroupSerivceInstance = new GroupService()
const ScopeHandlerInstance = new ScopeHandler()

export {
    LoggerServiceInstance as Logger,
    GroupSerivceInstance as GroupService,
    ScopeHandlerInstance as ScopeHandler}

const app = Express()
const port = 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log(`${ConsoleColor.FgGreen} ${req.method} ${ConsoleColor.Reset} => ${req.path} at ${currentTimeStamp()}`)
    const requestScope = ScopeHandlerInstance.createScope()
    req.rawHeaders.push(requestScope)
    next()
})

app.get("/", async (req, res) => {
    var scope = findScope(req.rawHeaders)
    if(!scope[0]){res.status(500).send("Not able to locate the created scope.")}
    await GroupSerivceInstance.testDbConntection()
    respond(res, scope[1])
})

app.listen(port, () => console.log(`🚀🚀 ${ConsoleColor.FgGreen} Beer Backend listening on port ${port} 🚀🚀`))

function respond(res, scope, object?): void {
    ScopeHandlerInstance.destroyScope(scope)
    res.send(object)
}

function findScope(rawHeaders: string[]): [boolean, string] {
    const scope = rawHeaders[rawHeaders.length - 1]
    if(!scope.includes("scope")){
        return [false, ""]
    }
    return [true, scope]
}
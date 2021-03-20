import { Scope } from './src/utils/scope/scope.model';
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
const ScopeHandlerInstance = new ScopeHandler()

export {
    LoggerServiceInstance as Logger,
    ScopeHandlerInstance as ScopeHandler}

const app = Express()
const port = 3000

app.use(bodyParser.json())
app.use((req, res, next) => {
    console.log(`${ConsoleColor.FgGreen}${req.method} ${ConsoleColor.Reset} \t${req.path} at ${currentTimeStamp()}`)
    const requestScope = ScopeHandlerInstance.createScope()
    req.rawHeaders.push(requestScope)
    next()
})

app.get("/", async (req, res) => {
    const scope = findScope(req.rawHeaders)
    if(!scope[0]){return res.status(500).send("Not able to locate the created scope.")}

    scope[1].groupService.testDbConntection()

    respond(res, scope[1])
})

app.listen(port, () => console.log(`🚀🚀 ${ConsoleColor.FgGreen} Beer Backend listening on port ${port} 🚀🚀`))

function respond(res, scope: Scope, object?: any): void {
    if(scope.errors.length !== 0){
        res.status(404).send({
            success: false,
            errors: scope.errors
        })
        return
    }

    ScopeHandlerInstance.destroyScope(scope.id);
    res.send({
        success: true,
        data: object
    })
}

function findScope(rawHeaders: string[]): [boolean, Scope] {
    const scope = rawHeaders[rawHeaders.length - 1]
    if(!scope.includes("scope")){
        return [false, null]
    }
    return [true, ScopeHandlerInstance.getScope(scope)]
}
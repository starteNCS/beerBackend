import { LoggerLevel } from "./logger-level.enum"
import { ConsoleColor } from "../console-colors.enum"
import { LoggerScope } from "./logger-scope.enum"

export class LoggerService {

    public notifyError(error: Error): void {

        if(!error || !error.message || !error.name){
            return
        }

        this.notifyLevel(LoggerLevel.Error, `${error.name} ${error.message}`)

    }

    public notifyScope(scope: LoggerScope, text: string): void {

        if(text == null){
            this.notifyLevel(LoggerLevel.Error, "Tried to throw Event with empty message")
            return
        }

        let prefix: string
        switch (scope) {
            case LoggerScope.Beer:
                prefix = `${ConsoleColor.FgCyan}🍺 Beer:${ConsoleColor.Reset} \t`
                break
            case LoggerScope.Group:
                prefix = `${ConsoleColor.FgBlue}🤝 Group:${ConsoleColor.Reset} \t`
                break
            case LoggerScope.User:
                prefix = `${ConsoleColor.FgGreen}👦 User:${ConsoleColor.Reset} \t`
                break
            case LoggerScope.Statistics:
                prefix = `${ConsoleColor.FgMagenta}〽 Statistics:${ConsoleColor.Reset} \t`
                break
        }

        console.log(`${prefix} ${text}${ConsoleColor.Reset}`)
    }

    public notifyLevel(level: LoggerLevel, text: string): void {

        if(text == null){
            this.notifyLevel(LoggerLevel.Error, "Tried to throw Event with empty message")
            return
        }

        let prefix: string
        switch (level) {
            case LoggerLevel.Info:
                prefix = `💬 \t`
                break
            case LoggerLevel.Warning:
                prefix = `${ConsoleColor.FgYellow}⚠ \t`
                break
            case LoggerLevel.Error:
                prefix = `${ConsoleColor.FgRed}‼ \t`
                break
        }

        console.log(`${prefix} ${text}${ConsoleColor.Reset}`)
    }

}
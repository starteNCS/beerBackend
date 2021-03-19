import { LoggerLevel } from './logger-level.enum';
import { ConsoleColor } from '../console-colors.enum';
import { LoggerScope } from './logger-scope.enum';

export class Logger {

    public notifyScope(scope: LoggerScope, text: string): void {
        let prefix: string
        switch (scope) {
            case LoggerScope.Beer:
                prefix = `${ConsoleColor.FgCyan} Beer:${ConsoleColor.Reset}`
                break
            case LoggerScope.Group:
                prefix = `${ConsoleColor.FgBlue} Group:${ConsoleColor.Reset}`
                break
            case LoggerScope.User:
                prefix = `${ConsoleColor.FgGreen} User:${ConsoleColor.Reset}`
                break
            case LoggerScope.Statistics:
                prefix = `${ConsoleColor.FgMagenta} Statistics:${ConsoleColor.Reset}`
                break
        }

        console.log(`${prefix} ${text}`)
    }

    public notifyLevel(scope: LoggerLevel, text: string): void {
        let prefix: string
        switch (scope) {
            case LoggerLevel.Info:
                prefix = ``
                break
            case LoggerLevel.Warning:
                prefix = `${ConsoleColor.FgYellow} Warning:${ConsoleColor.Reset}`
                break
            case LoggerLevel.Warning:
                prefix = `${ConsoleColor.FgRed} Error:${ConsoleColor.Reset}`
                break
        }

        console.log(`${prefix} ${text}`)
    }

}
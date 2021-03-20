import { GroupService } from "./../../services/group.service";
import uniqid from "uniqid"
import { Logger } from "../../.."
import { LoggerLevel } from "../logger/logger-level.enum"
import { Scope } from "./scope.model"

export class ScopeHandler {

    private openScopes: Scope[] = []

    public getScope(scopeId: string): Scope {
        return this.openScopes.find(x => x.id === scopeId)
    }

    public createScope(): string {
        const scopeId = uniqid("scope-")
        const scope: Scope = {
            id: scopeId,
            groupSerivce: new GroupService()
        }
        this.openScopes.push(scope)

        Logger.notifyLevel(LoggerLevel.Info, `Created Request Scope with Id ${scopeId}, current open Scopes: ${this.openScopes.length}`)
        return scope.id
    }

    public destroyScope(scopeId: string): void {
        this.removeScopeFromArray(scopeId)
        Logger.notifyLevel(LoggerLevel.Info, `Destroyed Request Scope with Id ${scopeId}, current open Scopes: ${this.openScopes.length}`)
    }

    private removeScopeFromArray(scopeId: string): void {
        const index = this.openScopes.findIndex(x => x.id === scopeId)
        if (index > -1) {
            this.openScopes.splice(index, 1)
        }
    }

}
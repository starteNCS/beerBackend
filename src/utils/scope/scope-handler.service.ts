import { Repository } from './../repository/repository.service';
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

    public publishErrorOnScope(errorCode: string, scopeId: string): void {
        const scopeIndex = this.openScopes.findIndex(x => x.id === scopeId)
        Logger.notifyLevel(LoggerLevel.Error, `Raising Error with Errorcode ${errorCode}`)
        this.openScopes[scopeIndex].errors = ["hallo"]
    }

    public createScope(): string {
        const scopeId = uniqid("scope-")
        const scope: Scope = {
            id: scopeId,
            groupService: new GroupService(scopeId),
            repository: new Repository(scopeId),
            errors: []
        }
        this.openScopes.push(scope)

        Logger.notifyLevel(LoggerLevel.Info, `Created Request Scope with Id ${scopeId}, current open Scopes: ${this.openScopes.length}`)
        return scope.id
    }

    public destroyScope(scopeId: string): void {
        const scope = this.getScope(scopeId)
        Logger.notifyLevel(LoggerLevel.Warning, JSON.stringify(scope))

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
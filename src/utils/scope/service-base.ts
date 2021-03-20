import { ScopeHandler } from "../../.."
import { Scope } from "./scope.model"

export class ServiceBase {
    constructor(protected scopeId: string) { }

    protected getScope(): Scope {
        return ScopeHandler.getScope(this.scopeId)
    }

    protected publishError(errorCode: string): void {
        ScopeHandler.publishErrorOnScope(errorCode, this.scopeId)
    }
}
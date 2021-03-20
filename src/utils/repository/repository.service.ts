import firebase from "firebase";
import { ServiceBase } from './../scope/service-base';

export class Repository extends ServiceBase {

    protected dbSet: firebase.database.Database;

    constructor(scopeId: string) {
        super(scopeId)
        this.dbSet = firebase.database();
    }

    public get(path: string): Promise<firebase.database.DataSnapshot> {
        return this.dbSet.ref(path).get();
    }

    public async set<T>(path: string, data: T): Promise<void> {
        await this.dbSet.ref(path).set(data, (error) => this.publishEntityError("SET"))
    }

    public async patch<T>(path: string, data: T): Promise<void> {
        await this.dbSet.ref(path).update(data, (error) => this.publishEntityError("PATCH"))
    }

    public async delete(path: string): Promise<void> {
        this.dbSet.ref(path).remove((error) => this.publishEntityError("DELETE"))
    }

    private publishEntityError(method: string): void {
        (error) => {
            if (error) {
                this.publishEntityError(`${method}_ENTITY_ERROR`)
            }
        }
    }

}
import firebase from "firebase"
import { ServiceBase } from "./../utils/scope/service-base"
import { Logger } from "../.."

export class GroupService extends ServiceBase {

    constructor(scopeId: string) {
        super(scopeId)
    }

    public async testDbConntection(): Promise<void> {

        this.publishError("errorcode")

        await firebase.database().ref("test/asdf").set({
            username: "lala",
            email: "trulla",
            age: 5,
            isMale: true
        }, (error) => Logger.notifyError(error))
    }

}
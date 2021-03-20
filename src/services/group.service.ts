import { LoggerLevel } from './../utils/logger/logger-level.enum'
import firebase from "firebase"
import { Logger } from '../..'

export class GroupService {

    public async testDbConntection(): Promise<void> {
        await firebase.database().ref('test/asdf').set({
            username: 'lala',
            email: 'trulla',
            age: 5,
            isMale: true
        }, (error) => Logger.notifyError(error))
    }

}
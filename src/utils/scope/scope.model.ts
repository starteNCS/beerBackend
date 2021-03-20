import { GroupService } from "./../../services/group.service"

export class Scope {
    
    constructor(
        public id: string,
        public groupService: GroupService,
        public errors: string[]) {
    }
}
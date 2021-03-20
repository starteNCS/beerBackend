import { Repository } from "./../repository/repository.service"
import { GroupService } from "./../../services/group.service"

export class Scope {
    public id: string
    public groupService: GroupService
    public repository: Repository
    public errors: string[]
}
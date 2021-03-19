export function currentTimeStamp(){
    let date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} (Unix: ${date.getTime()})`
}
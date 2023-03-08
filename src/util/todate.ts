const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export default function toDate(ms: number): string {
    const date = new Date(ms)
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getHours().toString().length == 2 ? date.getHours() : `0${date.getHours()}`}:${date.getMinutes().toString().length == 2 ? date.getMinutes() : `0${date.getMinutes()}`}`
}
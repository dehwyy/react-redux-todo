export interface basePost {
    title: string
    body: string
}
export interface post extends basePost{
    userId: number
    id: number

    likes?: number
    dislikes?: number
}
export interface Istyle {
    type: string
    payload: "modal1" | "modal2" | "background"
}
export interface Isort {
    keyword: string
    text: string
    value: string
}
export interface IsidebarData {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}
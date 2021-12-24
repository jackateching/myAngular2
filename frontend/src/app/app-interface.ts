export interface createRoomInterface{
    name: string,
    floor: number,
    bathTub:boolean,
    balcony:boolean,
    price:number
}
export interface editRoomInterface{
    id:string,
    name: string,
    floor: number,
    bathTub:boolean,
    balcony:boolean,
    price:number
}
export interface editedRoomInterface{
    name: string,
    floor: number,
    bathTub:boolean,
    balcony:boolean,
    price:number
}

export interface allRoomInterface{
    _id:string,
    name: string,
    floor: number,
    bathTub:string,
    balcony:string,
    roomState: string,
    price:number
}
export interface authRespondData{
    _id: string,
    username: string,
    password: string,
    status: string,
    level: string,
    token:string
}

export interface logRespondData{
    logs:[
        datetime: Date,
        username: string,
        level: string,
        action: string,
        roomName: string,
        token:string,
    ],
    page: number,
    totalItems: number,
    pageSize: number
}

export interface usersRespondData{
    _id: string,
    password:string,
    username: string,
    status: string,
    level: string
}

export interface editedUser{
    status: string,
    level: string
}
export interface itemDbPrice {
    price: number
}

export interface itemBuy {
    topBidder: string
    active: boolean
}

export interface bidPlace {
    bidAmount: number
    bidder: String
    item: number
}

export interface buyItem {
    bidder: String
    item: number
}
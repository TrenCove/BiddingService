export interface itemDbRow {
    item_id: number,
    item_name: string,
    description: string,
    top_bidder: string,
    price: number,
    shipping_cost: number,
    active: boolean,
    auction_type: 'D' | 'F',
    end_time: Date
}
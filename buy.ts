import sqlite3 from "sqlite3";
import { itemBuy } from "./interfaces";

const db = new sqlite3.Database("./db/items.db", error => {
    if (error){
        console.error(error.message);
    }
    console.log("Connected to items database");
});

export async function BuyItem(
    bidder: String,
    item: number,
): Promise<number> {

    return new Promise((resolve,reject) => {
        var stmt = "SELECT top_bidder, active FROM items WHERE item-id=" + item
        db.get(stmt, function (err, res: itemBuy) {
            if(err){
                console.log("error")
                reject(400)
            }else if(res.active == true && res.topBidder == bidder) {
                resolve(200)
            }else{
                console.log("error")
                reject(400)
            }
        })
    });
}
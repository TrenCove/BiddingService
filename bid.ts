import sqlite3 from "sqlite3";
import { itemDbPrice } from "./interfaces";

const db = new sqlite3.Database("./db/items.db", error => {
    if (error){
        console.error(error.message);
    }
    console.log("Connected to items database");
});

export async function PlaceBid(
    bidAmount: number,
    bidder: String,
    item: number,
): Promise<number> {

    return new Promise((resolve,reject) => {
        var bidHigh = 0
        var ok = false;
        var stmt = "SELECT itemPrice FROM items WHERE item-id=" + item
        db.get(stmt, function (err, res: itemDbPrice) {
            if(err){
                console.log("error");
                reject(400);
            }else if(bidAmount <= res.price) {
                console.log("error");
                reject(400);
            }else{
                ok = true;
            }
        })

        if (ok) {
            stmt = "UPDATE items SET itemPrice=" + bidAmount + ", top_bidder='" + bidder + "' WHERE item-id=" + item
            db.run(stmt, (error) => {return reject(400)})
        } else {
            reject(400)
        }
        
        return resolve(200);
    });
}
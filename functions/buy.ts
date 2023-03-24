import sqlite3 from "sqlite3";
import { itemDbRow } from "../interfaces/interfaces";

const db = new sqlite3.Database("../db/items.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected to items database");
});
/**
 * This function allows the user to buy an item (Dutch auction)
 * @param bidder - the user
 * @param id - item id of the item that is being auctioned
 * @returns updated item
 */
export async function BuyNow(bidder: string, id: number): Promise<itemDbRow | undefined> {
  return new Promise((resolve, reject) => {
    const stmt = "UPDATE items SET top_bidder=?, active=? WHERE item_id=? RETURNING *";
    db.get(stmt, [`${bidder}`, 'false', `${id}`], (err, row: itemDbRow) => {
      if (err) {
        console.log("Error updating DB");
        console.log(err);
        reject(undefined);
      } else {
        resolve(row);
      }
    });
  });
}

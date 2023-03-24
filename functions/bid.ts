import sqlite3 from "sqlite3";
import { itemDbRow } from "../interfaces/interfaces";

const db = new sqlite3.Database("../db/items.db", (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log("Connected to items database");
});

export async function PlaceBid(bidAmount: number, bidder: string, id: number): Promise<itemDbRow | undefined> {
  return new Promise((resolve, reject) => {
    const stmt = "UPDATE items SET price=?, top_bidder=? WHERE item_id=? RETURNING *";
    db.get(stmt, [`${bidAmount}`, `${bidder}`, `${id}`], (err, row: itemDbRow) => {
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

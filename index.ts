import express, { Express, Request, Response } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { PlaceBid } from "./functions/bid";
import { BuyNow } from "./functions/buy";
import cors from "cors";
import { authenticateToken } from "./middleware/authenticateToken";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = 3005;

app.post(
  "/placeBid",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const newItem = await PlaceBid(
        req.body.bidAmount,
        req.body.username,
        req.body.id
      );

      const token = req.headers["authorization"];

      if (newItem != undefined) {
        console.log(newItem);
        const response = await axios.post(
          "http://localhost:3003/publish",
          {data: {item:newItem} },
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        res.sendStatus(response.status);
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      res.sendStatus(400);
    }
  }
);

app.post("/buyItem", authenticateToken, async (req: Request, res: Response) => {
  try {
    const newItem = await BuyNow(req.body.bidder, req.body.id);

    const token = req.headers["authorization"];

    if (newItem != undefined) {
      console.log(newItem);
      console.log("publishing item");
      console.log(newItem);
      const response = await axios.post(
        "http://localhost:3003/publish",
        {data: {item:newItem}},
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      res.sendStatus(response.status);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`App listening on PORT ${port}`);
});

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import { PlaceBid } from "./bid";
import { BuyItem } from "./buy";
import { bidPlace, itemBuy } from "./interfaces";
import { buyItem } from "./interfaces";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/authenticationToken";


const app: Express = express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const port = 3000;

app.get('/', (req: Request, res: Response) => {

});

app.get("/testAuth", authenticateToken, (req: Request, res: Response) => {
    res.send("Authenticated as " + req.user);
  });


app.post(
    "/placeBid",
    async (
        req: Request<bidPlace>,
        res: Response
    ) => {
        try{
            const response = await PlaceBid(
                req.body.bidAmount,
                req.body.bidder,
                req.body.item
            );

            if(response == 200) {
                const token = jwt.sign(req.body.item, "memes");
                res.json(token);
            } else{
                res.sendStatus(400);
            }
        } catch (error){
            res.sendStatus(400);
        }
    }
)

app.post(
    "/buyItem",
    async (
        req: Request<itemBuy>,
        res: Response
    ) => {
        try{
            const response = await BuyItem(
                req.body.bidder,
                req.body.item
            );

            if(response == 200) {
                //call payment service?
                const token = jwt.sign(req.body.item, "memes");
                res.json(token);
            } else{
                res.sendStatus(400);
            }
        } catch (error){
            res.sendStatus(400);
        }
    }
)

app.listen(port, () => {
 console.log(`App listening on PORT ${port}`);
});
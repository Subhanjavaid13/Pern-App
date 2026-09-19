import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import "dotenv/config"

// In development we still evaluate the bot rule, but in DRY_RUN so local
// clients (curl, Postman, Thunder Client) aren't blocked with a 403.
const isDev = (process.env.ARCJET_ENV || process.env.NODE_ENV) !== "production";

export const aj = arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // Shield protects your app from common attacks such as SQL injection
        shield({ mode: "LIVE" }),
        detectBot({
            mode: isDev ? "DRY_RUN" : "LIVE",
            allow:[
                "CATEGORY:SEARCH_ENGINE",
                "CATEGORY:MONITOR",
                "CATEGORY:PREVIEW"
            ]
        }),
        tokenBucket({
            mode:"LIVE",
            refillRate:5,
            interval:10,
            capacity:10,
        })
    ]
})

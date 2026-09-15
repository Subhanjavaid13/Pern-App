import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import "dotenv/config"

export const aj = arcjet({
    key:process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules:[
        // Shield protects your app from common attacks such as SQL injection
        shield({ mode: "LIVE" }),
        detectBot({
            mode:"LIVE",
            allow:[
                "CATEGORY:SEARCH_ENGINE"
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
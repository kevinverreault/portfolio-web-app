"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const sesClient = new client_ses_1.SESClient({ region: process.env.REGION });
const verifiedEmail = process.env.VERIFIED_EMAIL;
const destinationEmail = process.env.DESTINATION_EMAIL;
const handler = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (event = {}) {
    try {
        const body = JSON.parse(event.body);
        const emailParams = {
            Source: verifiedEmail,
            Destination: {
                ToAddresses: [destinationEmail],
            },
            ReplyToAddresses: [body.replyTo],
            Message: {
                Subject: {
                    Data: `Email from ${body.from}`,
                },
                Body: {
                    Text: {
                        Data: body.message,
                    },
                },
            },
        };
        const command = new client_ses_1.SendEmailCommand(emailParams);
        const result = yield sesClient.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Email sent successfully",
                result: result,
            }),
        };
    }
    catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Failed to send email.`,
                error: e.message
            }),
        };
    }
});
exports.handler = handler;

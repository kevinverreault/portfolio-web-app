import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";


const sesClient = new SESClient({ region: process.env.REGION });
const verifiedEmail = process.env.VERIFIED_EMAIL;
const destinationEmail = process.env.DESTINATION_EMAIL;

export const handler = async (event: any = {}): Promise<any> => {
  try {
    const body = JSON.parse(event.body);

    const emailParams = {
      Source: verifiedEmail!,
      Destination: {
        ToAddresses: [destinationEmail!],
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

    const command = new SendEmailCommand(emailParams);
    const result = await sesClient.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully",
        result: result,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to send email.`,
        error: (<Error>e).message
      }),
    };
  }
};

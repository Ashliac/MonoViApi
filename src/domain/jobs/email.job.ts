
import { EmailService } from "../services/email.services"
import cron from 'node-cron'
import { generateCaseEmailTemplate } from "../templates/email.templates";
import { MonoViModel } from "../../data/models/monoVi.model";

export const emailJob = () => {
    const emailService = new EmailService();
    cron.schedule("*/10 * * * * *", async () => {
        try {
            const cases = await MonoViModel.find({ isEmailSent: false });

            if (cases.length === 0) {
                console.log("No new cases available to send emails at this moment.");
                return;
            }

            console.log(`Processing ${cases.length} new case(s) for email notification.`);

            await Promise.all(
                cases.map(async (caseV) => {
                    try {
                        const htmlBody = generateCaseEmailTemplate(
                            caseV.name,
                            caseV.genre,
                            caseV.age,
                            caseV.lat,
                            caseV.lng,
                            caseV.country,
                            caseV.city
                        );

                        await emailService.sendEmail({
                            to: "ashliac.aam@gmail.com",
                            subject: `New Case Alert: ${caseV.name} from ${caseV.city}, ${caseV.country}`,
                            htmlBody: htmlBody
                        });

                        console.log(`Email sent successfully for case ID: ${caseV._id}`);

                        const updatedCase = {
                            ...caseV.toObject(),
                            isEmailSent: true
                        };

                        await MonoViModel.findByIdAndUpdate(caseV._id, updatedCase);
                        console.log(`Case with ID ${caseV._id} marked as email sent.`);

                    } catch (error) {
                        console.error(`Error while processing case ID: ${caseV._id}. Email not sent.`, error);
                    }
                })
            );

        } catch (error) {
            console.error("An error occurred while processing the email job.", error);
        }
    });
};

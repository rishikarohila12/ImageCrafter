import userModel from "../models/userModel.js";
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: 'Missing Details' });
        }

        // Use user instance for balance checks
        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: 'No credit Balance',
                creditBalance: user.creditBalance
            });
        }

        // build form-data instance
        const formData = new FormData();
        formData.append('prompt', prompt);

        // Make the API call to Clipdrop
        // The response from axios.post is destructured directly as { data: apiResponseData }
        // The 'data' from the axios response is the arraybuffer image data.
        const { data: apiResponseData } = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders() // Important for FormData to set correct Content-Type with boundary
                },
                responseType: 'arraybuffer' // Ensure the response is treated as a binary buffer
            }
        );

        // Convert the binary image data (apiResponseData) to base64
        const base64Image = Buffer.from(apiResponseData, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

        // decrement credit and persist
        await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

        return res.json({
            success: true,
            message: 'Image Generated',
            creditBalance: user.creditBalance - 1, // Reflect the decremented balance
            resultImage
        });
    } catch (err) {
        console.error('generateImage error:', err.response ? err.response.data.toString() : err.message); // Log more detailed error from axios
        return res.json({
            success: false,
            message: err.response ? err.response.data.toString() : String(err)
        });
    }
};
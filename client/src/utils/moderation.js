import axios from "axios";

const MODERATION_API =
	"https://sentinelai-api-yc5z.onrender.com/predict";

export async function validateContentSafety(text) {
	try {

		const res = await axios.post(
			MODERATION_API,
			{
				text
			},
			{
				timeout: 5000,
			}

		);

		return res.data;

	} catch (error) {

		console.log(
			"Moderation API Error:",
			error.response?.data || error.message
		);

		/*
		  FAIL-SAFE APPROACH
	
		  If moderation service is temporarily unavailable,
		  we allow the content instead of blocking all users.
	
		  Better production UX.
		*/

		return {
			prediction: 1,
			label: "SAFE",
			fallback: true,
		};
	}
}
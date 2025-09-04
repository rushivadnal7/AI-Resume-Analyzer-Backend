import { analyzeResume } from "../services/resumeService.js";
import { extractTextFromPDF } from "../utils/fileUtils.js";


export const analyzeResumeController = async (req , res) => {
    try {
        const file = req.file;
        const {role} = req.body;

        if(!file) return res.status(400).json({error:"No File Uploaded"});

        const text = await extractTextFromPDF(file.path);

        const analysis = await analyzeResume(text,role || 'General');

        res.json(analysis)

    } catch (error) {
        console.error("Error analyzing resume : " , error);
        res.status(500).json({error: 'Internal server error'});
    }
}
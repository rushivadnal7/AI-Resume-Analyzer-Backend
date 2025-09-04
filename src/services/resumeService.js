import openai from "../config/openai.js";

export const analyzeResume = async (resumeText, targetRole = "General") => {
  const prompt = `
    You are an ATS (Applicant Tracking System) + Career Coach.
    Analyze the following resume for a role: ${targetRole}.

    Resume:
    """
    ${resumeText}
    """

    ⚠️ Important: Only return valid JSON. 
    Do NOT add explanations, introductions, or text outside the JSON.
    Keys required:
    - ats_score (0-100)
    - grammar_feedback
    - layout_feedback
    - role_fit_feedback
    - key_improvements
  `;

  const response = await openai.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  let content = response.choices[0].message.content;

  // ✅ Extract only the JSON portion (between first { and last })
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) {
    return { error: "No JSON found in AI response", raw: content };
  }

  try {
    return JSON.parse(match[0]); // parse only the JSON part
  } catch {
    return { error: "Failed to parse AI response", raw: match[0] };
  }
};

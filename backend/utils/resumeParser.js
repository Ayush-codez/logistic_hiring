// import fs from "fs";
// import pdfParse from "pdf-parse";
// import textract from "textract";

// /**
//  * Parse resume file (PDF, DOC, DOCX).
//  * @param {string} filePath - Full path to the uploaded file
//  * @param {string} mimetype - File mimetype
//  * @returns {object} Parsed fields (name, email, phone, skills)
//  */
// export async function parseResume(filePath, mimetype) {
//   try {
//     if (!fs.existsSync(filePath)) {
//       throw new Error(`File not found at path: ${filePath}`);
//     }

//     if (mimetype === "application/pdf") {
//       const dataBuffer = fs.readFileSync(filePath);
//       const data = await pdfParse(dataBuffer);
//       return extractInfo(data.text);
//     } else {
//       return new Promise((resolve, reject) => {
//         textract.fromFileWithPath(filePath, (error, text) => {
//           if (error) return reject(error);
//           resolve(extractInfo(text));
//         });
//       });
//     }
//   } catch (err) {
//     console.error("Error parsing resume:", err);
//     return {};
//   }
// }

// /**
//  * Extract fields from plain text using regex.
//  * @param {string} text - Resume text
//  * @returns {object} Parsed fields
//  */
// function extractInfo(text) {
//   const result = {};

//   const nameMatch = text.match(/Name[:\-]?\s*([^\n]+)/i);
//   const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
//   const phoneMatch = text.match(/(\+91[\-\s]?)?[0]?[6789]\d{9}/);
//   const skillsMatch = text.match(/Skills[:\-]?\s*([^\n]+)/i);

//   if (nameMatch) result.name = nameMatch[1].trim();
//   if (emailMatch) result.email = emailMatch[0].trim();
//   if (phoneMatch) result.phone = phoneMatch[0].trim();
//   if (skillsMatch) {
//     result.description = skillsMatch[1]
//       .split(/,|·|•|\n/)
//       .map((s) => s.trim())
//       .filter(Boolean);
//   }

//   return result;
// }

import fs from "fs";
import pdfParse from "pdf-parse";
import textract from "textract";

/**
 * Parse resume file (PDF, DOC, DOCX).
 * @param {string} filePath - Full path to the uploaded file
 * @param {string} mimetype - File mimetype
 * @returns {object} Parsed fields (name, email, phone, skills)
 */
export async function parseResume(filePath, mimetype) {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    if (mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return extractInfo(data.text);
    } else {
      return new Promise((resolve, reject) => {
        textract.fromFileWithPath(filePath, (error, text) => {
          if (error) return reject(error);
          resolve(extractInfo(text));
        });
      });
    }
  } catch (err) {
    console.error("Error parsing resume:", err);
    return {};
  }
}

/**
 * Extract fields from plain text using regex.
 * @param {string} text - Resume text
 * @returns {object} Parsed fields
 */
function extractInfo(text) {
  const result = {};

  // Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  if (emailMatch) result.email = emailMatch[0].trim();

  // Phone
  const phoneMatch = text.match(/(\+91[\-\s]?)?[0]?[6789]\d{9}/);
  if (phoneMatch) result.phone = phoneMatch[0].trim();

  // Description or Summary
  const descriptionMatch = text.match(/(Objective|Summary|Profile)[:\-]?\s*([\s\S]{0,300})/i);
  if (descriptionMatch) {
    result.description = [descriptionMatch[2].split("\n")[0].trim()];
  }

  // Skills (optional if found as section)
  const skillsMatch = text.match(/Skills[:\-]?\s*([^\n]+)/i);
  if (skillsMatch) {
    result.skills = skillsMatch[1]
      .split(/,|·|•|\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  // Name (smart fallback detection)
  const lines = text.split("\n").map(line => line.trim()).filter(Boolean);
  for (const line of lines) {
    if (
      line.length > 3 &&
      !line.toLowerCase().includes("resume") &&
      !line.toLowerCase().includes("curriculum") &&
      !line.match(/[@0-9]/) // skip emails, numbers
    ) {
      result.name = line;
      break;
    }
  }

  return result;
}


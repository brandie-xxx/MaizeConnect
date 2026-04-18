/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const GeminiService = {
  async generateBlueprint(type: string, goal: string, constraints: string): Promise<string> {
    if (!process.env.GEMINI_API_KEY) {
      return "AI Service Unavailable: API Key not configured. Please check your vault settings.";
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an elite Agricultural Strategic Advisor for MaizeConnect Zimbabwe. 
        Generate a detailed ${type} strategy for a Zimbabwean farmer or trader.
        Context/Goal: ${goal}
        Constraints/Factors: ${constraints}
        
        Format the response in professional Markdown with an agricultural focus. Include:
        1. Harvest Objective Overview
        2. Field/Market Strategy
        3. Logistics & Storage Planning
        4. Weather & Economic Risk Assessment
        5. MaizeConnect Protocol Integration (USSD & Web)`,
      });

      return response.text || "Failed to generate blueprint. Please try again.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Strategic analysis failed. The AI core is currently under maintenance.";
    }
  }
};

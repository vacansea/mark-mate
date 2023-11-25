import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";

const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const input = `As a content writer, you've been approached by a client seeking your expertise in crafting a compelling 145 words email for their marketing campaign. The client is interested in an engaging and concise email that is within 145 words and related to ${prompt}. Your task is to generate a short and interesting email in the proper format in 145 words. The email should capture attention, convey the message effectively, and encourage recipient engagement. Provide a draft of the email based on the given topic, ensuring it aligns with the client's goals for the marketing campaign.`;

  const response = await Hf.textGenerationStream({
    model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    inputs: `<|prompter|>${input}<|endoftext|><|assistant|>`,
    parameters: {
      max_new_tokens: 250,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1.5,
      truncate: 1000,
      return_full_text: false,
    },
  });

  console.log(response);

  if (!response) {
    return new Response("No response", { status: 500 });
  }

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

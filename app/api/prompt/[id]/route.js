import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params?.id).populate('creator');
    if (!prompt) return new Response('Prompt not found', { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response(err, { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  console.log('prompt', prompt, tag);
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params?.id);
    if (!existingPrompt)
      return new Response('Prompt not found', { status: 404 });
    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response('Successfully updated the Prompts', { status: 200 });
  } catch (err) {
    return new Response('Failed to update  prompts', { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params?.id);
    return new Response('Prompt deleted', { status: 200 });
  } catch (err) {
    return new Response('Failed to delete  prompts', { status: 500 });
  }
};

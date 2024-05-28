import { app, HttpRequest, HttpResponseInit, input, InvocationContext } from "@azure/functions";
import { setTimeout } from "timers/promises";


const openAICompletionInput = input.generic({
  prompt: '{message}',
  maxTokens: '100',
  type: 'textCompletion',
  model: '{Query.deployment}'
})

async function chat(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const chatState: any = context.extraInputs.get(openAICompletionInput)
  const content = chatState.content
  return {
    status: 200,
    body: content,
    headers: {
      'Content-Type': 'text/plain'
    }
  };
};

app.http('chat', {
  methods: ['GET'],
  route: 'chat/{message}',
  extraInputs: [openAICompletionInput],
  authLevel: 'anonymous',
  handler: chat
});

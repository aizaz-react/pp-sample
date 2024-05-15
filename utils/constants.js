export const COMPANY_TYPE = {
  1: 'PERSONAL',
  2: 'CORPORATE'
};

export const ROLE_TYPE = {
  1: 'Manager',
  2: 'Developer',
  3: 'User'
};

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
};

export const LOGS_LEVEL = {
  1: 'Info',
  2: 'Warn',
  3: 'Error',
  4: 'Fatal'
};

export const LOGS_ACTION_TYPE = {
  1: 'Allow',
  2: 'Deny',
  3: 'Failed',
  4: 'Successful'
};

export const LOG_TYPE_CHOICES = {
  1: 'Prompt',
  2: 'Iam',
  3: 'Admin',
  4: 'Policy',
  5: 'Vector Vault'
};

export const LOG_DURATION_CHOICES = {
  1: '2 Hours',
  2: '3 Hours',
  3: '6 Hours',
  4: '12 Hours'
};

export const LOGS_LEVEL_COLOR = {
  1: 'info',
  2: 'warn',
  3: 'error',
  4: 'fatal'
};
export const ACTION_LEVEL_COLOR = {
  1: 'info',
  2: 'deny',
  3: 'fatal',
  4: 'success'
};

export const ACTION_TYPE_CHOICES = {
  1: 'Allow',
  2: 'Deny',
  3: 'Failed',
  4: 'Successful'
};

export const headers = [
  'Log ID',
  'Level',
  'Timestamp',
  'Type',
  'Model ID',
  'Model Name',
  'Action'
];

export const colors = ['#275D71', '#429CBD', '#D85118', '#FABD2F', '#E39E36'];

export const generateColor = () => {
  let randomColorString = '#';
  const arrayOfColorFunctions = '0123456789abcdef';
  for (let x = 0; x < 6; x++) {
    let index = Math.floor(Math.random() * 16);
    let value = arrayOfColorFunctions[index];

    randomColorString += value;
  }
  return randomColorString;
};

export const ErrorCodes = [
  {
    Title: 'In case of Error 400 (Bad Request)',
    subpoints: [
      { description: 'API Key is required' },
      { description: 'Tenant ID is required' },
      { description: 'Invalid API Key' },
      { description: 'Invalid Tenant' }
    ]
  },
  {
    Title: 'In case of Error on 200 (Special Case)',
    subpoints: [
      {
        description:
          'Your prompt contains sensitive data and is not permitted by your organizations data privacy policy.  Please modify your prompt to remove all sensitive elements.'
      }
    ]
  }
];

export const ParameterList = [
  {
    primary: 'Tenant ID (String)',
    secondary:
      ' - The Tenant ID is provided upon successful API key generation.'
  },
  {
    primary: 'Api key (String)',
    secondary: ' - The API key is provided upon successful generation.'
  },
  {
    primary: 'Model (String)',
    secondary: ' - Enter the desired model name for the chat interaction',
    subpoints: [
      {
        primary: 'sdxl',
        secondary: ` - Stable Diffusion XL or SDXL is the latest image generation model that is tailored towards more photorealistic outputs with more detailed imagery and composition compared to previous SD models, including SD 2.1.`
      },
      {
        primary: 'code_bison',
        secondary: ` - A model fine-tuned to generate code based on a natural language description of the desired code. For example, it can generate a unit test for a function.`
      },
      {
        primary: 'azure_3_5',
        secondary: ` - Azure ChatGPT 3.5 is a Private instance of the conversational AI model developed by OpenAI that uses natural language processing to generate human-like responses to text-based conversations.`
      },
      {
        primary: 'chatgpt_4',
        secondary: ` - Chat GTP 4 is a conversational AI model developed by OpenAI that uses natural language processing to generate human-like responses to text-based conversations. It is capable of understanding context and generating coherent and relevant responses, making it a powerful tool for chatbots and virtual assistants.`
      },
      {
        primary: 'chatgpt_3_5',
        secondary: ` - Chat GTP 3.5 is a conversational AI model developed by OpenAI that uses natural language processing to generate human-like responses to text-based conversations. It is capable of understanding context and generating coherent and relevant responses, making it a powerful tool for chatbots and virtual assistants.`
      },
      {
        primary: 'dalle',
        secondary: ` - Dall-E is a neural network and is able to generate entirely new images in any number of different styles as specified by the user's prompts. The name Dall-E is an homage to the two different core themes of the technology.`
      },
      {
        primary: 'llama_2_7b',
        secondary: ` - Meta developed and publicly released the Llama 2 family of large language models (LLMs), a collection of pretrained and fine-tuned generative text models ranging in scale from 7 billion to 70 billion parameters. Chat fine-tuned LLMs, called Llama-2-Chat, are optimized for dialogue use cases. Llama-2-Chat models outperform open-source chat models on most benchmarks , and in our human evaluations for helpfulness and safety, are on par with some popular closed-source models like ChatGPT and PaLM.`
      },
      {
        primary: 'deepl',
        secondary: ` - DeepL Translator is a neural machine translation service that was launched in August 2017 and is owned by Cologne-based DeepL SE. The translating system was first developed within Linguee and launched as entity DeepL.`
      },
      {
        primary: 'palm_2',
        secondary: ` - PALM 2 (Pre-training with Auxiliary Loss Methods) is a large-scale transformer-based model developed by Google. It is designed to improve natural language processing (NLP) tasks such as text classification, question answering, and language generation. PALM 2 is trained on a massive amount of text data and uses advanced techniques such as masked language modeling and next sentence prediction to learn the underlying patterns and relationships in language. It is considered one of the most powerful AI models for NLP tasks and has achieved state-of-the-art results on several benchmark datasets.`
      },
      {
        primary: 'msft_server_admin',
        secondary: ` - A transformer-based foundational model fine-tuned on a public data set of Microsoft support tickets paired with a custom curated retrieval augmentation database of Microsoft product and support documentation. `
      },
      {
        primary: 'sec-ops',
        secondary: ` - SecOps is a Private, BERT model trained on 1.7T multi-source Windows, Linux, and Firewall event logs combined with customer Retrieval Augmented Generation from a curated library of Cybersecurity Policies, standards, and best-practices.`
      },
      {
        primary: 'healthonomy',
        secondary: ` - Healthonomy is a specialty Large Language Model fine-tuned for use in Post-Acute Care Medical Billing`
      }
    ]
  },
  {
    primary: 'Prompts (Array)',
    secondary:
      ' - An array containing conversation objects with roles and content.',
    subpoints: [
      {
        primary: 'Role (String)',
        secondary: ` - Defines the speaker's role, either "system" or "user".`
      },
      {
        primary: 'Content (String)',
        secondary: ` - Represents the speaker's message or instruction.`
      }
    ]
  },

  {
    primary: 'Hyperparameters (Object)',
    secondary:
      ' - These hyperparameters allow you to fine-tune the behavior of the model according to your specific requirements and preferences during the chat.',
    subpoints: [
      {
        primary: 'Temperature (Number - Default: 0.8)',
        secondary: ` - Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that expect a true or correct response, while higher temperatures can lead to more diverse or unexpected results. A temperature of 0 is deterministic: the highest probability token is always selected. For most use cases, try starting with a temperature of 2.`
      },
      {
        primary: 'Token Limit (Number - Default: 256)',
        secondary: ` - Token limit determines the maximum amount of text output from one prompt. A token is approximately four characters.`
      },
      {
        primary: 'Top-K (Number - Default: 40)',
        secondary: ` - Top-k changes how the model selects tokens for output. A top-k of 1 means the selected token is the most probable among all tokens in the model’s vocabulary (also called greedy decoding), while a top-k of 3 means that the next token is selected from among the 3 most probable tokens (using temperature).`
      },
      {
        primary: 'Top-P (Number - Default: 0.8)',
        secondary: ` - Top-p changes how the model selects tokens for output. Tokens are selected from most probable to least until the sum of their probabilities equals the top-p value. For example, if tokens A, B, and C have a probability of .3, .2, and .1 and the top-p value is .5, then the model will select either A or B as the next token (using temperature).`
      }
    ]
  }
];

export const OutcomeValue = `\n{
  "post_challange": {
      "hyperparameters": {
          "temperature": 0.8,
          "token_limit": 256,
          "top_k": 40,
          "top_p": 0.8
      },
      "model": "chatgpt_3_5",
      "prompts": [
          {
              "content": "You are a helpful assistant.",
              "role": "system"
          },
          {
              "content": "what is 2 + 2 = ?",
              "role": "user"
          }
      ],
      "tenant_id": "a8830b1a-83fa-4157-a727-b1689df977ba"
  },
  "response": {
      "choices": [
          {
              "finish_reason": "stop",
              "index": 0,
              "message": {
                  "content": "2 + 2 equals 4.",
                  "role": "assistant"
              }
          }
      ],
      "created": 1695810855,
      "id": "chatcmpl-83M9vZft04FNHpbUrLymmmogyKVVW",
      "model": "gpt-3.5-turbo-16k-0613",
      "object": "chat.completion",
      "usage": {
          "completion_tokens": 285,
          "prompt_tokens": 22,
          "total_tokens": 307
      }
  }
}
`;

export const curls = {
  curl: `
curl --location 'https://apigateway.promptprivacy.com/' \n
--header 'accept: application/json, text/plain, */*' \n
--header 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \n
--header 'content-type: application/json' \n
--header 'api-key: <API-KEY>' \n
data '{
    "tenant_id": "<TENANT-ID>",
    "model": "<MODEL-SLUG>",
    "prompts": [
        {
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "<INPUT-PROMPT>"
        }
    ],
    "hyperparameters": {
        "temperature": 0.8,
        "token_limit": 256,
        "top_k": 40,
        "top_p": 0.8
    }
}'`,

  javascript: `
myHeaders.append("content-type", "application/json");
myHeaders.append("api-key", "<api-key>");

var raw = JSON.stringify({
    "tenant_id": "<TENANT-ID>",
    "model": "<MODEL-SLUG>",
    "prompts": [{
            "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "<INPUT-PROMPT>"
        }
    ],
    "hyperparameters": {
        "temperature": 0.8,
        "token_limit": 256,
        "top_k": 40,
        "top_p": 0.8
    }
});

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://apigateway.promptprivacy.com/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));\n`,

  python: `
import requests
import json

url = "https://apigateway.promptprivacy.com/"

payload = json.dumps({
    "tenant_id": "<TENANT-ID>",
    "model": "<MODEL-SLUG>",
    "prompts":
        [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": "<INPUT-PROMPT>"
            }
        ],
    "hyperparameters":
        {
            "temperature": 0.8,
            "token_limit": 256,
            "top_k": 40,
            "top_p": 0.8
        }
})

headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'content-type': 'application/json',
    'api-key': '<api-key>'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)\n`
};



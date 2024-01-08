"use client";

import { MouseEvent, useState } from "react";
import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function Component() {
  const [apiKey, setApiKey] = useState("");
  const [url, setUrl] = useState("");
  const [depthLimit, setDepthLimit] = useState(1000);
  const [model, setModel] = useState("gpt-3.5-turbo-1106");
  const [buttonText, setButtonText] = useState("Generate Link");

  const handleClick = async (event: MouseEvent) => {
    event.preventDefault();
    const body = {
      url: url,
      depth_limit: depthLimit,
      model: model,
    };

    if (apiKey === "") {
      alert("Please enter an API key");
      return;
    }

    console.log(`Sending request to ${url} with body ${JSON.stringify(body)}`);

    const response = await fetch(
      "https://gpt-crawler-backend-fd10e21d6ade.herokuapp.com/api/assistant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log(data);

    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    await sleep(5000);

    if (data.object === "assistant") {
      setButtonText("Generated Assistant");
      window.open(
        "https://platform.openai.com/assistants",
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div
      key="1"
      className="dark flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 via-blue-800 to-purple-900 p-4"
    >
      <h1 className="text-3xl font-bold text-white mb-8">GPT Generator</h1>
      <Card className="w-full max-w-4xl bg-gradient-to-r from-purple-700 via-blue-600 to-purple-700 p-8 rounded-lg shadow-lg">
        <CardContent>
          <form className="space-y-6">
            <div className="flex flex-col space-y-1">
              <Label className="text-gray-300" htmlFor="api_key">
                OpenAI API Key
              </Label>
              <Input
                className="bg-gray-800 text-white rounded-md"
                id="api_key"
                placeholder="sk-"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="text-gray-300" htmlFor="url">
                URL to crawl
              </Label>
              <Input
                className="bg-gray-800 text-white rounded-md"
                id="url"
                placeholder="https://www.cnn.com/"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="text-gray-300" htmlFor="depth_limit">
                Depth Limit
              </Label>
              <Input
                className="bg-gray-800 text-white rounded-md"
                id="depth_limit"
                placeholder="1000"
                value={depthLimit}
                onChange={(e) => {
                  const value = e.target.value;
                  setDepthLimit(
                    value === "" ? 0 : !isNaN(Number(value)) ? Number(value) : 0
                  );
                }}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label className="text-gray-300" htmlFor="model">
                Model
              </Label>
              <Input
                className="bg-gray-800 text-white rounded-md"
                id="model"
                placeholder="gpt-3.5-turbo-1106"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>

            <Button
              className="mt-4 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 text-white rounded-md"
              onClick={(e) => handleClick(e)}
            >
              {buttonText}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import InputContainer from "./InputContainer";
import { useCallback, useState } from "react";
import useContentGenerator from "@/hooks/useContentGenerator";
import LoadingRings from "@/components/atoms/LoadingRings";
import AssetGenerateForm from "@/components/forms/AssetGenerateForm";
import useArticles from "@/hooks/useArticles";
import Trends from "./Trends";

const Assets = () => {
  const { articles, loading } = useArticles();
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="m-4 space-y-4">
      <h2 className="text-2xl">Marketing Content Generator</h2>
      <div className="grid grid-cols-8  space-x-12">
        <div className="col-span-3">
          {/* <InputContainer handleSubmit={handleSubmit} /> */}
          <AssetGenerateForm handleSubmit={() => setIsGenerating(true)} />
        </div>
        {/* <div className="col-span-5 px-4">
          {posts && (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="border border-gray-400 p-4">
                  <p>{post.output}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <p>{post.language}</p>
                      <p>{post.platform}</p>
                    </div>
                    <div className="space-x-2">
                      <button className="btn btn-sm">Ask Native Review</button>
                      <button className="btn btn-sm btn-primary">Post</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {loading && <LoadingRings />}
        </div> */}
        {isGenerating && (
          <div className="col-span-5">
            <LoadingRings />
          </div>
        )}
        {!isGenerating && (
          <div className="col-span-5">
            <h3 className="text-xl">Trends</h3>
            <div className="overflow-auto">
              <Trends />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assets;

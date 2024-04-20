"use client";

import InputContainer from "./InputContainer";
import { useCallback } from "react";
import useContentGenerator from "@/hooks/useContentGenerator";
import LoadingRings from "@/components/atoms/LoadingRings";
import AssetGenerateForm from "@/components/forms/AssetGenerateForm";
import useArticles from "@/hooks/useArticles";
import formatDate from "@/utilities/formatDate";
import Flag from "@/components/molecules/Flag";
import useTranslation from "@/hooks/useTranslation";
import Image from "next/image";

const Trends = () => {
  const { articles, loading } = useArticles();
  const { t } = useTranslation();

  return (
    <div>
      {articles ? (
        <div className="">
          {articles.map(article => {
            return (
              <div className="card bg-base-100 shadow-xl" key={article.id}>
                <figure className="relative w-full h-0 pb-[40.625%] overflow-hidden">
                  <Image
                    src={article.coverImage || "/avatar.png"}
                    alt="article cover"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="absolute w-full h-full"
                  />
                </figure>
                <div className="card-body p-4 space-y-2">
                  <h2 className="card-title text-md grow items-baseline line-clamp-2">
                    {article.title}
                  </h2>
                  <div className="grid grid-cols-2 items-center">
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {article.countries?.map(country => {
                          return (
                            <Flag key={country} code={country} size="sm" />
                          );
                        })}
                      </div>
                      <p className="text-sm font-bold">
                        {t(`languages.${article.language.toLowerCase()}`)}
                      </p>
                    </div>
                    <p className="text-sm">
                      {formatDate(article.publishedDate || article.createdAt, {
                        withTime: false,
                      })}
                    </p>
                  </div>
                  <p className="text-sm grow-0 line-clamp-2">
                    {article.snippet || article.summary}
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">Detail</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>No articles found</p>
        </div>
      )}
    </div>
  );
};

export default Trends;

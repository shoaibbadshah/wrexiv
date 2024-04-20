"use client";

import LoadingRings from "@/components/atoms/LoadingRings";
import ArticlesGenerateFormDialog from "@/components/forms/ArticlesGenerateFormDialog";
import ClipboardCopyButton from "@/components/molecules/ClipboardCopyButton";
import Flag from "@/components/molecules/Flag";
import ArticlesNavigation from "@/components/organisms/ArticlesNavigation";
import { ListArticlesQuery, useListArticlesQuery } from "@/graphql/generated";
import useTranslation from "@/hooks/useTranslation";
import formatDate from "@/utilities/formatDate";
import { Drawer } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import LinkIcon from "@mui/icons-material/Link";
import ArticleDetail from "./ArticleDetail";

const Articles = () => {
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<
    string | undefined
  >(undefined);

  const { t } = useTranslation();
  const { data, loading, refetch } = useListArticlesQuery();
  const articles = data?.articles;

  if (loading) return <LoadingRings />;

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between">
        <ArticlesNavigation />
        <button className="btn" onClick={() => setIsGenerateDialogOpen(true)}>
          Generate
        </button>
      </div>
      <div className="my-8 pb-36 h-full w-full grow overflow-y-auto">
        {articles ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                        {formatDate(
                          article.publishedDate || article.createdAt,
                          {
                            withTime: false,
                          }
                        )}
                      </p>
                    </div>
                    <p className="text-sm grow-0 line-clamp-2">
                      {article.snippet || article.summary}
                    </p>
                    <div className="card-actions justify-end">
                      {article.sourceUrl && (
                        <ClipboardCopyButton target={article.sourceUrl}>
                          <button className="btn btn-primary btn-sm">
                            <LinkIcon />
                          </button>
                        </ClipboardCopyButton>
                      )}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedArticleId(article.id)}
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No articles found</div>
        )}
      </div>
      <ArticlesGenerateFormDialog
        open={isGenerateDialogOpen}
        handleClose={() => setIsGenerateDialogOpen(false)}
        handleAfterSave={() => {
          setIsGenerateDialogOpen(false);
          refetch();
        }}
      />
      <Drawer
        anchor="right"
        open={!!selectedArticleId}
        onClose={() => setSelectedArticleId(undefined)}
        sx={{
          width: 800,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 800,
            boxSizing: "border-box",
          },
        }}
      >
        {selectedArticleId && (
          <ArticleDetail
            articleId={selectedArticleId}
            handleClose={() => setSelectedArticleId(undefined)}
            handleAfterDelete={() => refetch()}
          />
        )}
      </Drawer>
    </div>
  );
};

export default Articles;

"use client";

import {
  ListArticlesQuery,
  useAddSummaryToArticleMutation,
  useAddTranslationToArticleMutation,
  useDeleteArticleMutation,
} from "@/graphql/generated";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useCallback, useState } from "react";
import useArticle from "@/hooks/useArticle";
import LoadingRings from "@/components/atoms/LoadingRings";

type PropsType = {
  articleId: string;
  handleClose: () => void;
  handleAfterDelete?: () => void;
};

enum TabType {
  Summary = "summary",
  Translated = "translated",
  Original = "original",
}

const ArticleDetail = ({
  articleId,
  handleClose,
  handleAfterDelete,
}: PropsType) => {
  const [tab, setTab] = useState<TabType>(TabType.Summary);

  const [deleteArticle] = useDeleteArticleMutation();
  const [addSummary, { loading: summarizing }] =
    useAddSummaryToArticleMutation();
  const [addTranslation, { loading: translating }] =
    useAddTranslationToArticleMutation();

  const { article, loading, refetch } = useArticle({
    id: articleId,
    onComplated: article => {
      if (tab == TabType.Summary && article && !article.summary) {
        addSummary({
          variables: {
            input: {
              articleId: article?.id || "",
            },
          },
          onCompleted: () => refetch(),
        });
      }
    },
  });

  const handleDelete = useCallback(async () => {
    if (!article) return;
    await deleteArticle({
      variables: {
        id: article.id,
      },
      onCompleted: () => {
        handleClose();
        handleAfterDelete && handleAfterDelete();
      },
    });
  }, [article, deleteArticle, handleClose, handleAfterDelete]);

  const handleChange = (_event: React.SyntheticEvent, newTab: TabType) => {
    setTab(newTab);

    if (!article) return;

    if (newTab == TabType.Summary && !article.summary) {
      addSummary({
        variables: {
          input: {
            articleId: article.id,
          },
        },
        onCompleted: () => refetch(),
      });
    }

    if (newTab == TabType.Translated && !article.bodyTranslated) {
      addTranslation({
        variables: {
          input: {
            articleId: article.id,
          },
        },
        onCompleted: () => refetch(),
      });
    }
  };

  if (loading) return <LoadingRings />;
  if (!article) return <div>Article not found</div>;

  return (
    <div className="h-full flex flex-col p-4">
      <div className="grow overflow-hidden">
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Summary" value={TabType.Summary} />
              <Tab label="Translated" value={TabType.Translated} />
              <Tab label="Original" value={TabType.Original} />
            </TabList>
          </Box>
          <TabPanel
            value={TabType.Summary}
            sx={{ height: "100%", overflow: "auto" }}
          >
            {summarizing && (
              <div className="my-auto h-full">
                <LoadingRings />
              </div>
            )}
            {article.summary}
          </TabPanel>
          <TabPanel
            value={TabType.Translated}
            sx={{ height: "100%", overflow: "auto" }}
          >
            {translating && (
              <div className="my-auto h-full">
                <LoadingRings />
              </div>
            )}
            {article.bodyTranslated}
          </TabPanel>
          <TabPanel
            value={TabType.Original}
            sx={{ height: "100%", overflow: "auto" }}
          >
            {article.bodyOriginal}
          </TabPanel>
        </TabContext>
      </div>
      <div className="divider"></div>
      <div className="flex justify-end space-x-2">
        <button className="btn btn-error" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail;

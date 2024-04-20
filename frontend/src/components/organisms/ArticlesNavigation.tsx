"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CalculationRuleGroupsTabs = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{ borderBottom: 1, borderColor: "divider", textTransform: "none" }}
    >
      <Tabs value={pathname}>
        <Tab
          label="Articles"
          value="/app/articles"
          href="/app/articles"
          component={Link}
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Sources"
          value="/app/sources"
          href="/app/sources"
          component={Link}
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Keywords"
          value="/app/article_search_keywords"
          href="/app/article_search_keywords"
          component={Link}
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Reports"
          value="/app/article_reports"
          href="/app/article_reports"
          component={Link}
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Organizations"
          value="/app/article_organizations"
          href="/app/article_organizations"
          component={Link}
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Individuals"
          value="/app/article_individuals"
          href="/app/article_individuals"
          component={Link}
          sx={{ textTransform: "none" }}
        />
      </Tabs>
    </Box>
  );
};

export default CalculationRuleGroupsTabs;

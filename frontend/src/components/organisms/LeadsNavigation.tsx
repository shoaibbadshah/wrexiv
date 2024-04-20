"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navigations = [
  {
    label: "Leads",
    value: "/app/leads",
    href: "/app/leads",
  },
  {
    label: "DM Sender",
    value: "/app/dmsender",
    href: "/app/dmsender",
  },
  {
    label: "Channels",
    value: "/app/channels",
    href: "/app/channels",
  },
];

const CalculationRuleGroupsTabs = () => {
  const pathname = usePathname();

  return (
    <Box
      sx={{ borderBottom: 1, borderColor: "divider", textTransform: "none" }}
    >
      <Tabs value={pathname}>
        {navigations.map(navigation => (
          <Tab
            key={navigation.value}
            label={navigation.label}
            value={navigation.value}
            href={navigation.href}
            component={Link}
            sx={{ textTransform: "none" }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default CalculationRuleGroupsTabs;

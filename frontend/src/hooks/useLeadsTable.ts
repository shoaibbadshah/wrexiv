import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridColDef,
} from "@mui/x-data-grid-pro";
import useLeads from "./useLeads";
import formatDate from "@/utilities/formatDate";
import { ListLeadsQuery } from "@/graphql/generated";

const columns: GridColDef[] = [
  {
    ...GRID_CHECKBOX_SELECTION_COL_DEF,
    width: 60,
    renderCell: params => params.row.checkbox,
  },
  {
    field: "avatar",
    headerName: "",
    width: 70,
    renderCell: params => {
      return params.row.avatar;
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "channel",
    headerName: "Channel",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "linkedinUrl",
    headerName: "Linkedin",
    width: 200,
  },
  {
    field: "organizationName",
    headerName: "Organization",
    width: 200,
  },
  {
    field: "organizationLogo",
    headerName: "Logo",
    width: 200,
  },
  {
    field: "organizationIndustry",
    headerName: "Industry",
    width: 200,
  },
  {
    field: "organizationDescription",
    headerName: "Description",
    width: 200,
  },
  {
    field: "organizationCountry",
    headerName: "Country",
    width: 80,
  },
  {
    field: "organizationRegion",
    headerName: "Region",
    width: 200,
  },
  {
    field: "organizationLinkedinUrl",
    headerName: "Linkedin",
    width: 200,
  },
  {
    field: "organizationUrl",
    headerName: "Url",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 220,
    renderCell: params => {
      return params.row.actions;
    },
  },
];

type PropsType = {
  renderAvatar: (avatar: string) => JSX.Element;
  renderCheckbox: (id: string) => JSX.Element;
  renderActions: (lead: NonNullable<ListLeadsQuery["leads"]>[0]) => JSX.Element;
};

const useLeadsTable = ({
  renderAvatar,
  renderCheckbox,
  renderActions,
}: PropsType) => {
  const { leads, refetch, loading } = useLeads();

  // const validLeads = leads?.filter((lead) => lead.avatar) || [];
  const validLeads = leads || [];

  const rows =
    validLeads.map(lead => {
      const organization = lead.organization;
      return {
        id: lead.id,
        name: lead.name,
        channel: lead.channel,
        avatar: renderAvatar(lead.avatar || ""),
        title: lead.title,
        description: lead.description,
        linkedinUrl: lead.linkedinUrl,
        organizationName: organization?.name,
        organizationLogo: organization?.logo,
        organizationIndustry: organization?.industry,
        organizationDescription: organization?.description,
        organizationCountry: organization?.country,
        organizationRegion: organization?.region,
        organizationLinkedinUrl: organization?.linkedinUrl,
        organizationUrl: organization?.website,
        actions: renderActions(lead),
        checkbox: renderCheckbox(lead.id),
        createdAt: formatDate(lead.createdAt),
        updatedAt: formatDate(lead.updatedAt),
      };
    }) || [];

  return {
    rows,
    columns,
    refetch,
    loading,
  };
};

export default useLeadsTable;

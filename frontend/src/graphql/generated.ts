import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  UUID: any;
};

export type AddSummaryToArticle = {
  __typename?: "AddSummaryToArticle";
  article?: Maybe<ArticleType>;
};

export type AddSummaryToArticleInput = {
  articleId: Scalars["ID"];
};

export type AddTranslationToArticle = {
  __typename?: "AddTranslationToArticle";
  article?: Maybe<ArticleType>;
};

export type AddTranslationToArticleInput = {
  articleId: Scalars["ID"];
};

export type AdminUserType = {
  __typename?: "AdminUserType";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type ArticleSearchConditionType = {
  __typename?: "ArticleSearchConditionType";
  countries: Array<CountryEnum>;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  id: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export type ArticleSearchKeywordType = {
  __typename?: "ArticleSearchKeywordType";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  keyword: Scalars["String"];
  language: Scalars["String"];
  searchCondition: ArticleSearchConditionType;
  updatedAt: Scalars["DateTime"];
};

export type ArticleType = {
  __typename?: "ArticleType";
  bodyOriginal?: Maybe<Scalars["String"]>;
  bodyTranslated?: Maybe<Scalars["String"]>;
  countries: Array<CountryEnum>;
  coverImage?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  language: LanguageEnum;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  snippet: Scalars["String"];
  sourceUrl?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export enum AssistantChatMessageRole {
  Assistant = "assistant",
  System = "system",
  User = "user",
}

export type AssistantChatMessageType = {
  __typename?: "AssistantChatMessageType";
  content: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  role: AssistantChatMessageRole;
  threadId: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export enum AssistantChatScenario {
  ContentGeneration = "CONTENT_GENERATION",
  Onboarding = "ONBOARDING",
}

export type AssistantChatThreadType = {
  __typename?: "AssistantChatThreadType";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  scenario: AssistantChatScenario;
  updatedAt: Scalars["DateTime"];
};

export type CompanyContactType = {
  __typename?: "CompanyContactType";
  accuracy: Scalars["Int"];
  email: Scalars["String"];
  name: Scalars["String"];
  sources: Array<Scalars["String"]>;
};

export type ContentResponse = {
  __typename?: "ContentResponse";
  language?: Maybe<LanguageEnum>;
  output?: Maybe<Scalars["String"]>;
  platform?: Maybe<PlatformEnum>;
};

export enum CountryEnum {
  Ad = "AD",
  Ae = "AE",
  Af = "AF",
  Ag = "AG",
  Ai = "AI",
  Al = "AL",
  Am = "AM",
  An = "AN",
  Ao = "AO",
  Aq = "AQ",
  Ar = "AR",
  As = "AS",
  At = "AT",
  Au = "AU",
  Aw = "AW",
  Az = "AZ",
  Ba = "BA",
  Bb = "BB",
  Bd = "BD",
  Be = "BE",
  Bf = "BF",
  Bg = "BG",
  Bh = "BH",
  Bi = "BI",
  Bj = "BJ",
  Bm = "BM",
  Bn = "BN",
  Bo = "BO",
  Br = "BR",
  Bs = "BS",
  Bt = "BT",
  Bv = "BV",
  Bw = "BW",
  By = "BY",
  Bz = "BZ",
  Ca = "CA",
  Cc = "CC",
  Cd = "CD",
  Cf = "CF",
  Cg = "CG",
  Ch = "CH",
  Ci = "CI",
  Ck = "CK",
  Cl = "CL",
  Cm = "CM",
  Cn = "CN",
  Co = "CO",
  Cr = "CR",
  Cs = "CS",
  Cu = "CU",
  Cv = "CV",
  Cx = "CX",
  Cy = "CY",
  Cz = "CZ",
  De = "DE",
  Dj = "DJ",
  Dk = "DK",
  Dm = "DM",
  Do = "DO",
  Dz = "DZ",
  Ec = "EC",
  Ee = "EE",
  Eg = "EG",
  Eh = "EH",
  Er = "ER",
  Es = "ES",
  Et = "ET",
  Fi = "FI",
  Fj = "FJ",
  Fk = "FK",
  Fm = "FM",
  Fo = "FO",
  Fr = "FR",
  Ga = "GA",
  Gd = "GD",
  Ge = "GE",
  Gf = "GF",
  Gh = "GH",
  Gi = "GI",
  Gl = "GL",
  Gm = "GM",
  Gn = "GN",
  Gp = "GP",
  Gq = "GQ",
  Gr = "GR",
  Gs = "GS",
  Gt = "GT",
  Gu = "GU",
  Gw = "GW",
  Gy = "GY",
  Hk = "HK",
  Hm = "HM",
  Hn = "HN",
  Hr = "HR",
  Ht = "HT",
  Hu = "HU",
  Id = "ID",
  Ie = "IE",
  Il = "IL",
  In = "IN",
  Io = "IO",
  Iq = "IQ",
  Ir = "IR",
  Is = "IS",
  It = "IT",
  Jm = "JM",
  Jo = "JO",
  Jp = "JP",
  Ke = "KE",
  Kg = "KG",
  Kh = "KH",
  Ki = "KI",
  Km = "KM",
  Kn = "KN",
  Kp = "KP",
  Kr = "KR",
  Kw = "KW",
  Ky = "KY",
  Kz = "KZ",
  La = "LA",
  Lb = "LB",
  Lc = "LC",
  Li = "LI",
  Lk = "LK",
  Lr = "LR",
  Ls = "LS",
  Lt = "LT",
  Lu = "LU",
  Lv = "LV",
  Ly = "LY",
  Ma = "MA",
  Mc = "MC",
  Md = "MD",
  Mg = "MG",
  Mh = "MH",
  Mk = "MK",
  Ml = "ML",
  Mm = "MM",
  Mn = "MN",
  Mo = "MO",
  Mp = "MP",
  Mq = "MQ",
  Mr = "MR",
  Ms = "MS",
  Mt = "MT",
  Mu = "MU",
  Mv = "MV",
  Mw = "MW",
  Mx = "MX",
  My = "MY",
  Mz = "MZ",
  Na = "NA",
  Nc = "NC",
  Ne = "NE",
  Nf = "NF",
  Ng = "NG",
  Ni = "NI",
  Nl = "NL",
  No = "NO",
  Np = "NP",
  Nr = "NR",
  Nu = "NU",
  Nz = "NZ",
  Om = "OM",
  Pa = "PA",
  Pe = "PE",
  Pf = "PF",
  Pg = "PG",
  Ph = "PH",
  Pk = "PK",
  Pl = "PL",
  Pm = "PM",
  Pn = "PN",
  Pr = "PR",
  Ps = "PS",
  Pt = "PT",
  Pw = "PW",
  Py = "PY",
  Qa = "QA",
  Re = "RE",
  Ro = "RO",
  Ru = "RU",
  Rw = "RW",
  Sa = "SA",
  Sb = "SB",
  Sc = "SC",
  Sd = "SD",
  Se = "SE",
  Sg = "SG",
  Sh = "SH",
  Si = "SI",
  Sj = "SJ",
  Sk = "SK",
  Sl = "SL",
  Sm = "SM",
  Sn = "SN",
  So = "SO",
  Sr = "SR",
  St = "ST",
  Sv = "SV",
  Sy = "SY",
  Sz = "SZ",
  Tc = "TC",
  Td = "TD",
  Tf = "TF",
  Tg = "TG",
  Th = "TH",
  Tj = "TJ",
  Tk = "TK",
  Tl = "TL",
  Tm = "TM",
  Tn = "TN",
  To = "TO",
  Tr = "TR",
  Tt = "TT",
  Tv = "TV",
  Tw = "TW",
  Tz = "TZ",
  Ua = "UA",
  Ug = "UG",
  Uk = "UK",
  Um = "UM",
  Us = "US",
  Uy = "UY",
  Uz = "UZ",
  Va = "VA",
  Vc = "VC",
  Ve = "VE",
  Vg = "VG",
  Vi = "VI",
  Vn = "VN",
  Vu = "VU",
  Wf = "WF",
  Ws = "WS",
  Ye = "YE",
  Yt = "YT",
  Za = "ZA",
  Zm = "ZM",
  Zw = "ZW",
}

export type CreateAssistantChatMessage = {
  __typename?: "CreateAssistantChatMessage";
  assistantChatThread?: Maybe<AssistantChatThreadType>;
};

export type CreateAssistantChatMessageInput = {
  message: Scalars["String"];
  role: AssistantChatMessageRole;
  threadId: Scalars["UUID"];
};

export type CreateAssistantChatThread = {
  __typename?: "CreateAssistantChatThread";
  assistantChatThread?: Maybe<AssistantChatThreadType>;
};

export type CreateAssistantChatThreadInput = {
  scenario: AssistantChatScenario;
};

export type CreateTenant = {
  __typename?: "CreateTenant";
  tenant?: Maybe<TenantType>;
};

export type CreateTenantInput = {
  name: Scalars["String"];
  tenantUser: CreateTenantUserInput;
  website?: InputMaybe<Scalars["String"]>;
};

export type CreateTenantUserInput = {
  name: Scalars["String"];
};

export type DeleteArticle = {
  __typename?: "DeleteArticle";
  success?: Maybe<Scalars["Boolean"]>;
};

export type DirectMessageType = {
  __typename?: "DirectMessageType";
  body: Scalars["String"];
  language: LanguageEnum;
  subject: Scalars["String"];
};

export type GenerateArticles = {
  __typename?: "GenerateArticles";
  articles?: Maybe<Array<ArticleType>>;
};

export type GenerateArticlesInput = {
  countries: Array<CountryEnum>;
  description: Scalars["String"];
};

export type GenerateContent = {
  __typename?: "GenerateContent";
  posts?: Maybe<Array<ContentResponse>>;
};

export type GenerateContentInput = {
  inputText: Scalars["String"];
  threadId: Scalars["UUID"];
};

export type GenerateDirectMessage = {
  __typename?: "GenerateDirectMessage";
  directMessages?: Maybe<Array<DirectMessageType>>;
};

export type GenerateDirectMessageInput = {
  leadId: Scalars["UUID"];
};

export type GenerateLeads = {
  __typename?: "GenerateLeads";
  leads?: Maybe<LeadType>;
};

export type GenerateLeadsInput = {
  description: Scalars["String"];
};

export enum LanguageEnum {
  Af = "AF",
  Ak = "AK",
  Am = "AM",
  Ar = "AR",
  As = "AS",
  Ay = "AY",
  Az = "AZ",
  Be = "BE",
  Bg = "BG",
  Bho = "BHO",
  Bm = "BM",
  Bn = "BN",
  Bs = "BS",
  Ca = "CA",
  Ceb = "CEB",
  Ckb = "CKB",
  Co = "CO",
  Cs = "CS",
  Cy = "CY",
  Da = "DA",
  De = "DE",
  Doi = "DOI",
  Dv = "DV",
  Ee = "EE",
  El = "EL",
  En = "EN",
  Eo = "EO",
  Es = "ES",
  Et = "ET",
  Eu = "EU",
  Fa = "FA",
  Fi = "FI",
  Fil = "FIL",
  Fr = "FR",
  Fy = "FY",
  Ga = "GA",
  Gd = "GD",
  Gl = "GL",
  Gn = "GN",
  Gom = "GOM",
  Gu = "GU",
  Ha = "HA",
  Haw = "HAW",
  He = "HE",
  Hi = "HI",
  Hmn = "HMN",
  Hr = "HR",
  Ht = "HT",
  Hu = "HU",
  Hy = "HY",
  Id = "ID",
  Ig = "IG",
  Ilo = "ILO",
  Is = "IS",
  It = "IT",
  Ja = "JA",
  Jv = "JV",
  Ka = "KA",
  Kk = "KK",
  Km = "KM",
  Kn = "KN",
  Ko = "KO",
  Kri = "KRI",
  Ku = "KU",
  Ky = "KY",
  La = "LA",
  Lb = "LB",
  Lg = "LG",
  Ln = "LN",
  Lo = "LO",
  Lt = "LT",
  Lus = "LUS",
  Lv = "LV",
  Mai = "MAI",
  Mg = "MG",
  Mi = "MI",
  Mk = "MK",
  Ml = "ML",
  Mn = "MN",
  MniMtei = "MNI_MTEI",
  Mr = "MR",
  Ms = "MS",
  Mt = "MT",
  My = "MY",
  Ne = "NE",
  Nl = "NL",
  No = "NO",
  Nso = "NSO",
  Ny = "NY",
  Om = "OM",
  Or = "OR",
  Pa = "PA",
  Pl = "PL",
  Ps = "PS",
  Pt = "PT",
  Qu = "QU",
  Ro = "RO",
  Ru = "RU",
  Rw = "RW",
  Sa = "SA",
  Sd = "SD",
  Si = "SI",
  Sk = "SK",
  Sl = "SL",
  Sm = "SM",
  Sn = "SN",
  So = "SO",
  Sq = "SQ",
  Sr = "SR",
  St = "ST",
  Su = "SU",
  Sv = "SV",
  Sw = "SW",
  Ta = "TA",
  Te = "TE",
  Tg = "TG",
  Th = "TH",
  Ti = "TI",
  Tk = "TK",
  Tl = "TL",
  Tr = "TR",
  Ts = "TS",
  Tt = "TT",
  Ug = "UG",
  Uk = "UK",
  Ur = "UR",
  Uz = "UZ",
  Vi = "VI",
  Xh = "XH",
  Yi = "YI",
  Yo = "YO",
  ZhCn = "ZH_CN",
  ZhTw = "ZH_TW",
  Zu = "ZU",
}

export type LeadContactType = {
  __typename?: "LeadContactType";
  email: Scalars["String"];
  name: Scalars["String"];
};

export type LeadType = {
  __typename?: "LeadType";
  avatar?: Maybe<Scalars["String"]>;
  channel?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  linkedinUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  organization?: Maybe<OrganizationType>;
  region?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  addSummaryToArticle?: Maybe<AddSummaryToArticle>;
  addTranslationToArticle?: Maybe<AddTranslationToArticle>;
  createAssistantChatMessage?: Maybe<CreateAssistantChatMessage>;
  createAssistantChatThread?: Maybe<CreateAssistantChatThread>;
  createTenant?: Maybe<CreateTenant>;
  deleteArticle?: Maybe<DeleteArticle>;
  generateArticles?: Maybe<GenerateArticles>;
  generateContent?: Maybe<GenerateContent>;
  generateDirectMessage?: Maybe<GenerateDirectMessage>;
  generateLeads?: Maybe<GenerateLeads>;
  sendDirectMessage?: Maybe<SendDirectMessage>;
  sendEmails?: Maybe<SendEmails>;
};

export type MutationAddSummaryToArticleArgs = {
  input: AddSummaryToArticleInput;
};

export type MutationAddTranslationToArticleArgs = {
  input: AddTranslationToArticleInput;
};

export type MutationCreateAssistantChatMessageArgs = {
  input: CreateAssistantChatMessageInput;
};

export type MutationCreateAssistantChatThreadArgs = {
  input: CreateAssistantChatThreadInput;
};

export type MutationCreateTenantArgs = {
  input: CreateTenantInput;
};

export type MutationDeleteArticleArgs = {
  id: Scalars["ID"];
};

export type MutationGenerateArticlesArgs = {
  input: GenerateArticlesInput;
};

export type MutationGenerateContentArgs = {
  input: GenerateContentInput;
};

export type MutationGenerateDirectMessageArgs = {
  input: GenerateDirectMessageInput;
};

export type MutationGenerateLeadsArgs = {
  input: GenerateLeadsInput;
};

export type MutationSendDirectMessageArgs = {
  input: SendDirectMessageInput;
};

export type MutationSendEmailsArgs = {
  input: SendEmailsInputType;
};

export type OrganizationType = {
  __typename?: "OrganizationType";
  country?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["UUID"];
  industry?: Maybe<Scalars["String"]>;
  linkedinUrl?: Maybe<Scalars["String"]>;
  logo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  website?: Maybe<Scalars["String"]>;
};

export enum PlatformEnum {
  Facebook = "FACEBOOK",
  Instagram = "INSTAGRAM",
  Linkedin = "LINKEDIN",
  Twitter = "TWITTER",
}

export type Query = {
  __typename?: "Query";
  /** Fetch the current user's admin information */
  adminUser?: Maybe<AdminUserType>;
  /** Fetch a single article by its ID */
  article?: Maybe<ArticleType>;
  articleSearchConditions?: Maybe<Array<ArticleSearchConditionType>>;
  articleSearchKeywords?: Maybe<Array<ArticleSearchKeywordType>>;
  articles?: Maybe<Array<ArticleType>>;
  assistantChatMessages?: Maybe<Array<AssistantChatMessageType>>;
  assistantChatThreads?: Maybe<Array<Maybe<AssistantChatThreadType>>>;
  /** Fetch contact details for a company */
  companyContacts?: Maybe<Array<CompanyContactType>>;
  hello?: Maybe<Scalars["String"]>;
  lead: LeadType;
  /** Fetch contact details for leads */
  leadContacts?: Maybe<Array<LeadContactType>>;
  leads?: Maybe<Array<LeadType>>;
  tenant?: Maybe<TenantType>;
  tenantUser?: Maybe<TenantUserType>;
  user?: Maybe<UserType>;
};

export type QueryArticleArgs = {
  id: Scalars["ID"];
};

export type QueryAssistantChatMessagesArgs = {
  threadId: Scalars["UUID"];
};

export type QueryCompanyContactsArgs = {
  companyUrl: Scalars["String"];
};

export type QueryHelloArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryLeadArgs = {
  id: Scalars["UUID"];
};

export type QueryLeadContactsArgs = {
  leadIds: Array<Scalars["UUID"]>;
};

export type SendDirectMessage = {
  __typename?: "SendDirectMessage";
  success: Scalars["Boolean"];
};

export type SendDirectMessageInput = {
  body: Scalars["String"];
  leadId: Scalars["UUID"];
  subject: Scalars["String"];
};

export type SendEmails = {
  __typename?: "SendEmails";
  success?: Maybe<Scalars["Boolean"]>;
};

export type SendEmailsInputType = {
  body: Scalars["String"];
  emails: Array<Scalars["String"]>;
  subject: Scalars["String"];
};

export type TenantType = {
  __typename?: "TenantType";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  website?: Maybe<Scalars["String"]>;
};

export type TenantUserType = {
  __typename?: "TenantUserType";
  createdAt: Scalars["DateTime"];
  id: Scalars["UUID"];
  name: Scalars["String"];
  updatedAt: Scalars["DateTime"];
};

export type UserType = {
  __typename?: "UserType";
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  id: Scalars["UUID"];
  updatedAt: Scalars["DateTime"];
};

export type GetAdminUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetAdminUserQuery = {
  __typename?: "Query";
  adminUser?: { __typename?: "AdminUserType"; id: any; name: string } | null;
};

export type GenerateArticlesMutationVariables = Exact<{
  input: GenerateArticlesInput;
}>;

export type GenerateArticlesMutation = {
  __typename?: "Mutation";
  generateArticles?: {
    __typename?: "GenerateArticles";
    articles?: Array<{ __typename?: "ArticleType"; id: any }> | null;
  } | null;
};

export type GetArticleQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetArticleQuery = {
  __typename?: "Query";
  article?: {
    __typename?: "ArticleType";
    id: any;
    title: string;
    snippet: string;
    summary?: string | null;
    bodyOriginal?: string | null;
    bodyTranslated?: string | null;
    sourceUrl?: string | null;
    publishedDate?: any | null;
    coverImage?: string | null;
    countries: Array<CountryEnum>;
    language: LanguageEnum;
    createdAt: any;
  } | null;
};

export type ListArticlesQueryVariables = Exact<{ [key: string]: never }>;

export type ListArticlesQuery = {
  __typename?: "Query";
  articles?: Array<{
    __typename?: "ArticleType";
    id: any;
    title: string;
    snippet: string;
    summary?: string | null;
    bodyOriginal?: string | null;
    bodyTranslated?: string | null;
    sourceUrl?: string | null;
    publishedDate?: any | null;
    coverImage?: string | null;
    countries: Array<CountryEnum>;
    language: LanguageEnum;
    createdAt: any;
  }> | null;
};

export type AddSummaryToArticleMutationVariables = Exact<{
  input: AddSummaryToArticleInput;
}>;

export type AddSummaryToArticleMutation = {
  __typename?: "Mutation";
  addSummaryToArticle?: {
    __typename?: "AddSummaryToArticle";
    article?: {
      __typename?: "ArticleType";
      id: any;
      summary?: string | null;
    } | null;
  } | null;
};

export type AddTranslationToArticleMutationVariables = Exact<{
  input: AddTranslationToArticleInput;
}>;

export type AddTranslationToArticleMutation = {
  __typename?: "Mutation";
  addTranslationToArticle?: {
    __typename?: "AddTranslationToArticle";
    article?: {
      __typename?: "ArticleType";
      id: any;
      bodyTranslated?: string | null;
    } | null;
  } | null;
};

export type DeleteArticleMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteArticleMutation = {
  __typename?: "Mutation";
  deleteArticle?: {
    __typename?: "DeleteArticle";
    success?: boolean | null;
  } | null;
};

export type ListArticleSearchConditionsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ListArticleSearchConditionsQuery = {
  __typename?: "Query";
  articleSearchConditions?: Array<{
    __typename?: "ArticleSearchConditionType";
    id: any;
    description: string;
    countries: Array<CountryEnum>;
    createdAt: any;
  }> | null;
};

export type ListArticleSearchKeywordsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ListArticleSearchKeywordsQuery = {
  __typename?: "Query";
  articleSearchKeywords?: Array<{
    __typename?: "ArticleSearchKeywordType";
    id: any;
    keyword: string;
    language: string;
    createdAt: any;
    searchCondition: {
      __typename?: "ArticleSearchConditionType";
      description: string;
      countries: Array<CountryEnum>;
    };
  }> | null;
};

export type CreateAssistantChatMessageMutationVariables = Exact<{
  input: CreateAssistantChatMessageInput;
}>;

export type CreateAssistantChatMessageMutation = {
  __typename?: "Mutation";
  createAssistantChatMessage?: {
    __typename?: "CreateAssistantChatMessage";
    assistantChatThread?: {
      __typename?: "AssistantChatThreadType";
      id: any;
      createdAt: any;
      updatedAt: any;
    } | null;
  } | null;
};

export type ListAssistantChatMessagesQueryVariables = Exact<{
  threadId: Scalars["UUID"];
}>;

export type ListAssistantChatMessagesQuery = {
  __typename?: "Query";
  assistantChatMessages?: Array<{
    __typename?: "AssistantChatMessageType";
    id: any;
    role: AssistantChatMessageRole;
    content: string;
    createdAt: any;
    updatedAt: any;
  }> | null;
};

export type CreateAssistantChatThreadMutationVariables = Exact<{
  input: CreateAssistantChatThreadInput;
}>;

export type CreateAssistantChatThreadMutation = {
  __typename?: "Mutation";
  createAssistantChatThread?: {
    __typename?: "CreateAssistantChatThread";
    assistantChatThread?: {
      __typename?: "AssistantChatThreadType";
      id: any;
      scenario: AssistantChatScenario;
      createdAt: any;
      updatedAt: any;
    } | null;
  } | null;
};

export type ListAssistantChatThreadsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ListAssistantChatThreadsQuery = {
  __typename?: "Query";
  assistantChatThreads?: Array<{
    __typename?: "AssistantChatThreadType";
    id: any;
    scenario: AssistantChatScenario;
    createdAt: any;
    updatedAt: any;
  } | null> | null;
};

export type ListCompanyContactsQueryVariables = Exact<{
  companyUrl: Scalars["String"];
}>;

export type ListCompanyContactsQuery = {
  __typename?: "Query";
  companyContacts?: Array<{
    __typename?: "CompanyContactType";
    email: string;
    name: string;
    accuracy: number;
    sources: Array<string>;
  }> | null;
};

export type ListLeadContactsQueryVariables = Exact<{
  leadIds: Array<Scalars["UUID"]> | Scalars["UUID"];
}>;

export type ListLeadContactsQuery = {
  __typename?: "Query";
  leadContacts?: Array<{
    __typename?: "LeadContactType";
    email: string;
    name: string;
  }> | null;
};

export type GenerateContentMutationVariables = Exact<{
  input: GenerateContentInput;
}>;

export type GenerateContentMutation = {
  __typename?: "Mutation";
  generateContent?: {
    __typename?: "GenerateContent";
    posts?: Array<{
      __typename?: "ContentResponse";
      output?: string | null;
      platform?: PlatformEnum | null;
      language?: LanguageEnum | null;
    }> | null;
  } | null;
};

export type GenerateLeadsMutationVariables = Exact<{
  input: GenerateLeadsInput;
}>;

export type GenerateLeadsMutation = {
  __typename?: "Mutation";
  generateLeads?: {
    __typename?: "GenerateLeads";
    leads?: {
      __typename?: "LeadType";
      id: any;
      email?: string | null;
      name: string;
      channel?: string | null;
      avatar?: string | null;
      country?: string | null;
      region?: string | null;
      title?: string | null;
      description?: string | null;
      linkedinUrl?: string | null;
      createdAt: any;
      updatedAt: any;
      organization?: {
        __typename?: "OrganizationType";
        name?: string | null;
        phone?: string | null;
        logo?: string | null;
        industry?: string | null;
        description?: string | null;
        country?: string | null;
        region?: string | null;
        linkedinUrl?: string | null;
        website?: string | null;
      } | null;
    } | null;
  } | null;
};

export type ListLeadsQueryVariables = Exact<{ [key: string]: never }>;

export type ListLeadsQuery = {
  __typename?: "Query";
  leads?: Array<{
    __typename?: "LeadType";
    id: any;
    email?: string | null;
    name: string;
    channel?: string | null;
    avatar?: string | null;
    country?: string | null;
    region?: string | null;
    title?: string | null;
    description?: string | null;
    linkedinUrl?: string | null;
    createdAt: any;
    updatedAt: any;
    organization?: {
      __typename?: "OrganizationType";
      name?: string | null;
      phone?: string | null;
      logo?: string | null;
      industry?: string | null;
      description?: string | null;
      country?: string | null;
      region?: string | null;
      linkedinUrl?: string | null;
      website?: string | null;
    } | null;
  }> | null;
};

export type GetLeadQueryVariables = Exact<{
  id: Scalars["UUID"];
}>;

export type GetLeadQuery = {
  __typename?: "Query";
  lead: {
    __typename?: "LeadType";
    id: any;
    email?: string | null;
    name: string;
    channel?: string | null;
    avatar?: string | null;
    country?: string | null;
    region?: string | null;
    title?: string | null;
    description?: string | null;
    linkedinUrl?: string | null;
    createdAt: any;
    updatedAt: any;
    organization?: {
      __typename?: "OrganizationType";
      name?: string | null;
      phone?: string | null;
      logo?: string | null;
      industry?: string | null;
      description?: string | null;
      country?: string | null;
      region?: string | null;
      linkedinUrl?: string | null;
      website?: string | null;
    } | null;
  };
};

export type SendEmailsMutationVariables = Exact<{
  input: SendEmailsInputType;
}>;

export type SendEmailsMutation = {
  __typename?: "Mutation";
  sendEmails?: { __typename?: "SendEmails"; success?: boolean | null } | null;
};

export type MyTenantUserQueryVariables = Exact<{ [key: string]: never }>;

export type MyTenantUserQuery = {
  __typename?: "Query";
  tenantUser?: {
    __typename?: "TenantUserType";
    id: any;
    name: string;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type CreateTenantMutationVariables = Exact<{
  input: CreateTenantInput;
}>;

export type CreateTenantMutation = {
  __typename?: "Mutation";
  createTenant?: {
    __typename?: "CreateTenant";
    tenant?: {
      __typename?: "TenantType";
      id: any;
      name: string;
      website?: string | null;
      createdAt: any;
      updatedAt: any;
    } | null;
  } | null;
};

export type MyTenantQueryVariables = Exact<{ [key: string]: never }>;

export type MyTenantQuery = {
  __typename?: "Query";
  tenant?: {
    __typename?: "TenantType";
    id: any;
    name: string;
    website?: string | null;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  user?: {
    __typename?: "UserType";
    id: any;
    email: string;
    createdAt: any;
    updatedAt: any;
  } | null;
};

export const GetAdminUserDocument = gql`
  query GetAdminUser {
    adminUser {
      id
      name
    }
  }
`;

/**
 * __useGetAdminUserQuery__
 *
 * To run a query within a React component, call `useGetAdminUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAdminUserQuery,
    GetAdminUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAdminUserQuery, GetAdminUserQueryVariables>(
    GetAdminUserDocument,
    options
  );
}
export function useGetAdminUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAdminUserQuery,
    GetAdminUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAdminUserQuery, GetAdminUserQueryVariables>(
    GetAdminUserDocument,
    options
  );
}
export type GetAdminUserQueryHookResult = ReturnType<
  typeof useGetAdminUserQuery
>;
export type GetAdminUserLazyQueryHookResult = ReturnType<
  typeof useGetAdminUserLazyQuery
>;
export type GetAdminUserQueryResult = Apollo.QueryResult<
  GetAdminUserQuery,
  GetAdminUserQueryVariables
>;
export const GenerateArticlesDocument = gql`
  mutation GenerateArticles($input: GenerateArticlesInput!) {
    generateArticles(input: $input) {
      articles {
        id
      }
    }
  }
`;
export type GenerateArticlesMutationFn = Apollo.MutationFunction<
  GenerateArticlesMutation,
  GenerateArticlesMutationVariables
>;

/**
 * __useGenerateArticlesMutation__
 *
 * To run a mutation, you first call `useGenerateArticlesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateArticlesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateArticlesMutation, { data, loading, error }] = useGenerateArticlesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateArticlesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateArticlesMutation,
    GenerateArticlesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateArticlesMutation,
    GenerateArticlesMutationVariables
  >(GenerateArticlesDocument, options);
}
export type GenerateArticlesMutationHookResult = ReturnType<
  typeof useGenerateArticlesMutation
>;
export type GenerateArticlesMutationResult =
  Apollo.MutationResult<GenerateArticlesMutation>;
export type GenerateArticlesMutationOptions = Apollo.BaseMutationOptions<
  GenerateArticlesMutation,
  GenerateArticlesMutationVariables
>;
export const GetArticleDocument = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      snippet
      summary
      bodyOriginal
      bodyTranslated
      sourceUrl
      publishedDate
      coverImage
      countries
      language
      createdAt
    }
  }
`;

/**
 * __useGetArticleQuery__
 *
 * To run a query within a React component, call `useGetArticleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArticleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArticleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetArticleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetArticleQuery,
    GetArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetArticleQuery, GetArticleQueryVariables>(
    GetArticleDocument,
    options
  );
}
export function useGetArticleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetArticleQuery,
    GetArticleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetArticleQuery, GetArticleQueryVariables>(
    GetArticleDocument,
    options
  );
}
export type GetArticleQueryHookResult = ReturnType<typeof useGetArticleQuery>;
export type GetArticleLazyQueryHookResult = ReturnType<
  typeof useGetArticleLazyQuery
>;
export type GetArticleQueryResult = Apollo.QueryResult<
  GetArticleQuery,
  GetArticleQueryVariables
>;
export const ListArticlesDocument = gql`
  query ListArticles {
    articles {
      id
      title
      snippet
      summary
      bodyOriginal
      bodyTranslated
      sourceUrl
      publishedDate
      coverImage
      countries
      language
      createdAt
    }
  }
`;

/**
 * __useListArticlesQuery__
 *
 * To run a query within a React component, call `useListArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useListArticlesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListArticlesQuery,
    ListArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListArticlesQuery, ListArticlesQueryVariables>(
    ListArticlesDocument,
    options
  );
}
export function useListArticlesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListArticlesQuery,
    ListArticlesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListArticlesQuery, ListArticlesQueryVariables>(
    ListArticlesDocument,
    options
  );
}
export type ListArticlesQueryHookResult = ReturnType<
  typeof useListArticlesQuery
>;
export type ListArticlesLazyQueryHookResult = ReturnType<
  typeof useListArticlesLazyQuery
>;
export type ListArticlesQueryResult = Apollo.QueryResult<
  ListArticlesQuery,
  ListArticlesQueryVariables
>;
export const AddSummaryToArticleDocument = gql`
  mutation AddSummaryToArticle($input: AddSummaryToArticleInput!) {
    addSummaryToArticle(input: $input) {
      article {
        id
        summary
      }
    }
  }
`;
export type AddSummaryToArticleMutationFn = Apollo.MutationFunction<
  AddSummaryToArticleMutation,
  AddSummaryToArticleMutationVariables
>;

/**
 * __useAddSummaryToArticleMutation__
 *
 * To run a mutation, you first call `useAddSummaryToArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSummaryToArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSummaryToArticleMutation, { data, loading, error }] = useAddSummaryToArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSummaryToArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSummaryToArticleMutation,
    AddSummaryToArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddSummaryToArticleMutation,
    AddSummaryToArticleMutationVariables
  >(AddSummaryToArticleDocument, options);
}
export type AddSummaryToArticleMutationHookResult = ReturnType<
  typeof useAddSummaryToArticleMutation
>;
export type AddSummaryToArticleMutationResult =
  Apollo.MutationResult<AddSummaryToArticleMutation>;
export type AddSummaryToArticleMutationOptions = Apollo.BaseMutationOptions<
  AddSummaryToArticleMutation,
  AddSummaryToArticleMutationVariables
>;
export const AddTranslationToArticleDocument = gql`
  mutation AddTranslationToArticle($input: AddTranslationToArticleInput!) {
    addTranslationToArticle(input: $input) {
      article {
        id
        bodyTranslated
      }
    }
  }
`;
export type AddTranslationToArticleMutationFn = Apollo.MutationFunction<
  AddTranslationToArticleMutation,
  AddTranslationToArticleMutationVariables
>;

/**
 * __useAddTranslationToArticleMutation__
 *
 * To run a mutation, you first call `useAddTranslationToArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTranslationToArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTranslationToArticleMutation, { data, loading, error }] = useAddTranslationToArticleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTranslationToArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddTranslationToArticleMutation,
    AddTranslationToArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddTranslationToArticleMutation,
    AddTranslationToArticleMutationVariables
  >(AddTranslationToArticleDocument, options);
}
export type AddTranslationToArticleMutationHookResult = ReturnType<
  typeof useAddTranslationToArticleMutation
>;
export type AddTranslationToArticleMutationResult =
  Apollo.MutationResult<AddTranslationToArticleMutation>;
export type AddTranslationToArticleMutationOptions = Apollo.BaseMutationOptions<
  AddTranslationToArticleMutation,
  AddTranslationToArticleMutationVariables
>;
export const DeleteArticleDocument = gql`
  mutation DeleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      success
    }
  }
`;
export type DeleteArticleMutationFn = Apollo.MutationFunction<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteArticleMutation,
    DeleteArticleMutationVariables
  >(DeleteArticleDocument, options);
}
export type DeleteArticleMutationHookResult = ReturnType<
  typeof useDeleteArticleMutation
>;
export type DeleteArticleMutationResult =
  Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<
  DeleteArticleMutation,
  DeleteArticleMutationVariables
>;
export const ListArticleSearchConditionsDocument = gql`
  query ListArticleSearchConditions {
    articleSearchConditions {
      id
      description
      countries
      createdAt
    }
  }
`;

/**
 * __useListArticleSearchConditionsQuery__
 *
 * To run a query within a React component, call `useListArticleSearchConditionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListArticleSearchConditionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListArticleSearchConditionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListArticleSearchConditionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListArticleSearchConditionsQuery,
    ListArticleSearchConditionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListArticleSearchConditionsQuery,
    ListArticleSearchConditionsQueryVariables
  >(ListArticleSearchConditionsDocument, options);
}
export function useListArticleSearchConditionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListArticleSearchConditionsQuery,
    ListArticleSearchConditionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListArticleSearchConditionsQuery,
    ListArticleSearchConditionsQueryVariables
  >(ListArticleSearchConditionsDocument, options);
}
export type ListArticleSearchConditionsQueryHookResult = ReturnType<
  typeof useListArticleSearchConditionsQuery
>;
export type ListArticleSearchConditionsLazyQueryHookResult = ReturnType<
  typeof useListArticleSearchConditionsLazyQuery
>;
export type ListArticleSearchConditionsQueryResult = Apollo.QueryResult<
  ListArticleSearchConditionsQuery,
  ListArticleSearchConditionsQueryVariables
>;
export const ListArticleSearchKeywordsDocument = gql`
  query ListArticleSearchKeywords {
    articleSearchKeywords {
      id
      keyword
      language
      createdAt
      searchCondition {
        description
        countries
      }
    }
  }
`;

/**
 * __useListArticleSearchKeywordsQuery__
 *
 * To run a query within a React component, call `useListArticleSearchKeywordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListArticleSearchKeywordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListArticleSearchKeywordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListArticleSearchKeywordsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListArticleSearchKeywordsQuery,
    ListArticleSearchKeywordsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListArticleSearchKeywordsQuery,
    ListArticleSearchKeywordsQueryVariables
  >(ListArticleSearchKeywordsDocument, options);
}
export function useListArticleSearchKeywordsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListArticleSearchKeywordsQuery,
    ListArticleSearchKeywordsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListArticleSearchKeywordsQuery,
    ListArticleSearchKeywordsQueryVariables
  >(ListArticleSearchKeywordsDocument, options);
}
export type ListArticleSearchKeywordsQueryHookResult = ReturnType<
  typeof useListArticleSearchKeywordsQuery
>;
export type ListArticleSearchKeywordsLazyQueryHookResult = ReturnType<
  typeof useListArticleSearchKeywordsLazyQuery
>;
export type ListArticleSearchKeywordsQueryResult = Apollo.QueryResult<
  ListArticleSearchKeywordsQuery,
  ListArticleSearchKeywordsQueryVariables
>;
export const CreateAssistantChatMessageDocument = gql`
  mutation CreateAssistantChatMessage(
    $input: CreateAssistantChatMessageInput!
  ) {
    createAssistantChatMessage(input: $input) {
      assistantChatThread {
        id
        createdAt
        updatedAt
      }
    }
  }
`;
export type CreateAssistantChatMessageMutationFn = Apollo.MutationFunction<
  CreateAssistantChatMessageMutation,
  CreateAssistantChatMessageMutationVariables
>;

/**
 * __useCreateAssistantChatMessageMutation__
 *
 * To run a mutation, you first call `useCreateAssistantChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssistantChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssistantChatMessageMutation, { data, loading, error }] = useCreateAssistantChatMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssistantChatMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssistantChatMessageMutation,
    CreateAssistantChatMessageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAssistantChatMessageMutation,
    CreateAssistantChatMessageMutationVariables
  >(CreateAssistantChatMessageDocument, options);
}
export type CreateAssistantChatMessageMutationHookResult = ReturnType<
  typeof useCreateAssistantChatMessageMutation
>;
export type CreateAssistantChatMessageMutationResult =
  Apollo.MutationResult<CreateAssistantChatMessageMutation>;
export type CreateAssistantChatMessageMutationOptions =
  Apollo.BaseMutationOptions<
    CreateAssistantChatMessageMutation,
    CreateAssistantChatMessageMutationVariables
  >;
export const ListAssistantChatMessagesDocument = gql`
  query ListAssistantChatMessages($threadId: UUID!) {
    assistantChatMessages(threadId: $threadId) {
      id
      role
      content
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useListAssistantChatMessagesQuery__
 *
 * To run a query within a React component, call `useListAssistantChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAssistantChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAssistantChatMessagesQuery({
 *   variables: {
 *      threadId: // value for 'threadId'
 *   },
 * });
 */
export function useListAssistantChatMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListAssistantChatMessagesQuery,
    ListAssistantChatMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListAssistantChatMessagesQuery,
    ListAssistantChatMessagesQueryVariables
  >(ListAssistantChatMessagesDocument, options);
}
export function useListAssistantChatMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListAssistantChatMessagesQuery,
    ListAssistantChatMessagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListAssistantChatMessagesQuery,
    ListAssistantChatMessagesQueryVariables
  >(ListAssistantChatMessagesDocument, options);
}
export type ListAssistantChatMessagesQueryHookResult = ReturnType<
  typeof useListAssistantChatMessagesQuery
>;
export type ListAssistantChatMessagesLazyQueryHookResult = ReturnType<
  typeof useListAssistantChatMessagesLazyQuery
>;
export type ListAssistantChatMessagesQueryResult = Apollo.QueryResult<
  ListAssistantChatMessagesQuery,
  ListAssistantChatMessagesQueryVariables
>;
export const CreateAssistantChatThreadDocument = gql`
  mutation CreateAssistantChatThread($input: CreateAssistantChatThreadInput!) {
    createAssistantChatThread(input: $input) {
      assistantChatThread {
        id
        scenario
        createdAt
        updatedAt
      }
    }
  }
`;
export type CreateAssistantChatThreadMutationFn = Apollo.MutationFunction<
  CreateAssistantChatThreadMutation,
  CreateAssistantChatThreadMutationVariables
>;

/**
 * __useCreateAssistantChatThreadMutation__
 *
 * To run a mutation, you first call `useCreateAssistantChatThreadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssistantChatThreadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssistantChatThreadMutation, { data, loading, error }] = useCreateAssistantChatThreadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAssistantChatThreadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAssistantChatThreadMutation,
    CreateAssistantChatThreadMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAssistantChatThreadMutation,
    CreateAssistantChatThreadMutationVariables
  >(CreateAssistantChatThreadDocument, options);
}
export type CreateAssistantChatThreadMutationHookResult = ReturnType<
  typeof useCreateAssistantChatThreadMutation
>;
export type CreateAssistantChatThreadMutationResult =
  Apollo.MutationResult<CreateAssistantChatThreadMutation>;
export type CreateAssistantChatThreadMutationOptions =
  Apollo.BaseMutationOptions<
    CreateAssistantChatThreadMutation,
    CreateAssistantChatThreadMutationVariables
  >;
export const ListAssistantChatThreadsDocument = gql`
  query ListAssistantChatThreads {
    assistantChatThreads {
      id
      scenario
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useListAssistantChatThreadsQuery__
 *
 * To run a query within a React component, call `useListAssistantChatThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAssistantChatThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAssistantChatThreadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListAssistantChatThreadsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListAssistantChatThreadsQuery,
    ListAssistantChatThreadsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListAssistantChatThreadsQuery,
    ListAssistantChatThreadsQueryVariables
  >(ListAssistantChatThreadsDocument, options);
}
export function useListAssistantChatThreadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListAssistantChatThreadsQuery,
    ListAssistantChatThreadsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListAssistantChatThreadsQuery,
    ListAssistantChatThreadsQueryVariables
  >(ListAssistantChatThreadsDocument, options);
}
export type ListAssistantChatThreadsQueryHookResult = ReturnType<
  typeof useListAssistantChatThreadsQuery
>;
export type ListAssistantChatThreadsLazyQueryHookResult = ReturnType<
  typeof useListAssistantChatThreadsLazyQuery
>;
export type ListAssistantChatThreadsQueryResult = Apollo.QueryResult<
  ListAssistantChatThreadsQuery,
  ListAssistantChatThreadsQueryVariables
>;
export const ListCompanyContactsDocument = gql`
  query ListCompanyContacts($companyUrl: String!) {
    companyContacts(companyUrl: $companyUrl) {
      email
      name
      accuracy
      sources
    }
  }
`;

/**
 * __useListCompanyContactsQuery__
 *
 * To run a query within a React component, call `useListCompanyContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCompanyContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCompanyContactsQuery({
 *   variables: {
 *      companyUrl: // value for 'companyUrl'
 *   },
 * });
 */
export function useListCompanyContactsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListCompanyContactsQuery,
    ListCompanyContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListCompanyContactsQuery,
    ListCompanyContactsQueryVariables
  >(ListCompanyContactsDocument, options);
}
export function useListCompanyContactsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListCompanyContactsQuery,
    ListCompanyContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListCompanyContactsQuery,
    ListCompanyContactsQueryVariables
  >(ListCompanyContactsDocument, options);
}
export type ListCompanyContactsQueryHookResult = ReturnType<
  typeof useListCompanyContactsQuery
>;
export type ListCompanyContactsLazyQueryHookResult = ReturnType<
  typeof useListCompanyContactsLazyQuery
>;
export type ListCompanyContactsQueryResult = Apollo.QueryResult<
  ListCompanyContactsQuery,
  ListCompanyContactsQueryVariables
>;
export const ListLeadContactsDocument = gql`
  query ListLeadContacts($leadIds: [UUID!]!) {
    leadContacts(leadIds: $leadIds) {
      email
      name
    }
  }
`;

/**
 * __useListLeadContactsQuery__
 *
 * To run a query within a React component, call `useListLeadContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListLeadContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListLeadContactsQuery({
 *   variables: {
 *      leadIds: // value for 'leadIds'
 *   },
 * });
 */
export function useListLeadContactsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListLeadContactsQuery,
    ListLeadContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListLeadContactsQuery, ListLeadContactsQueryVariables>(
    ListLeadContactsDocument,
    options
  );
}
export function useListLeadContactsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListLeadContactsQuery,
    ListLeadContactsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListLeadContactsQuery,
    ListLeadContactsQueryVariables
  >(ListLeadContactsDocument, options);
}
export type ListLeadContactsQueryHookResult = ReturnType<
  typeof useListLeadContactsQuery
>;
export type ListLeadContactsLazyQueryHookResult = ReturnType<
  typeof useListLeadContactsLazyQuery
>;
export type ListLeadContactsQueryResult = Apollo.QueryResult<
  ListLeadContactsQuery,
  ListLeadContactsQueryVariables
>;
export const GenerateContentDocument = gql`
  mutation GenerateContent($input: GenerateContentInput!) {
    generateContent(input: $input) {
      posts {
        output
        platform
        language
      }
    }
  }
`;
export type GenerateContentMutationFn = Apollo.MutationFunction<
  GenerateContentMutation,
  GenerateContentMutationVariables
>;

/**
 * __useGenerateContentMutation__
 *
 * To run a mutation, you first call `useGenerateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateContentMutation, { data, loading, error }] = useGenerateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateContentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateContentMutation,
    GenerateContentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateContentMutation,
    GenerateContentMutationVariables
  >(GenerateContentDocument, options);
}
export type GenerateContentMutationHookResult = ReturnType<
  typeof useGenerateContentMutation
>;
export type GenerateContentMutationResult =
  Apollo.MutationResult<GenerateContentMutation>;
export type GenerateContentMutationOptions = Apollo.BaseMutationOptions<
  GenerateContentMutation,
  GenerateContentMutationVariables
>;
export const GenerateLeadsDocument = gql`
  mutation GenerateLeads($input: GenerateLeadsInput!) {
    generateLeads(input: $input) {
      leads {
        id
        email
        name
        channel
        avatar
        country
        region
        title
        description
        linkedinUrl
        createdAt
        updatedAt
        organization {
          name
          phone
          logo
          industry
          description
          country
          region
          linkedinUrl
          website
        }
      }
    }
  }
`;
export type GenerateLeadsMutationFn = Apollo.MutationFunction<
  GenerateLeadsMutation,
  GenerateLeadsMutationVariables
>;

/**
 * __useGenerateLeadsMutation__
 *
 * To run a mutation, you first call `useGenerateLeadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateLeadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateLeadsMutation, { data, loading, error }] = useGenerateLeadsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGenerateLeadsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateLeadsMutation,
    GenerateLeadsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateLeadsMutation,
    GenerateLeadsMutationVariables
  >(GenerateLeadsDocument, options);
}
export type GenerateLeadsMutationHookResult = ReturnType<
  typeof useGenerateLeadsMutation
>;
export type GenerateLeadsMutationResult =
  Apollo.MutationResult<GenerateLeadsMutation>;
export type GenerateLeadsMutationOptions = Apollo.BaseMutationOptions<
  GenerateLeadsMutation,
  GenerateLeadsMutationVariables
>;
export const ListLeadsDocument = gql`
  query ListLeads {
    leads {
      id
      email
      name
      channel
      avatar
      country
      region
      title
      description
      linkedinUrl
      organization {
        name
        phone
        logo
        industry
        description
        country
        region
        linkedinUrl
        website
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useListLeadsQuery__
 *
 * To run a query within a React component, call `useListLeadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListLeadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListLeadsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListLeadsQuery(
  baseOptions?: Apollo.QueryHookOptions<ListLeadsQuery, ListLeadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListLeadsQuery, ListLeadsQueryVariables>(
    ListLeadsDocument,
    options
  );
}
export function useListLeadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListLeadsQuery,
    ListLeadsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListLeadsQuery, ListLeadsQueryVariables>(
    ListLeadsDocument,
    options
  );
}
export type ListLeadsQueryHookResult = ReturnType<typeof useListLeadsQuery>;
export type ListLeadsLazyQueryHookResult = ReturnType<
  typeof useListLeadsLazyQuery
>;
export type ListLeadsQueryResult = Apollo.QueryResult<
  ListLeadsQuery,
  ListLeadsQueryVariables
>;
export const GetLeadDocument = gql`
  query GetLead($id: UUID!) {
    lead(id: $id) {
      id
      email
      name
      channel
      avatar
      country
      region
      title
      description
      linkedinUrl
      organization {
        name
        phone
        logo
        industry
        description
        country
        region
        linkedinUrl
        website
      }
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetLeadQuery__
 *
 * To run a query within a React component, call `useGetLeadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLeadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLeadQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLeadQuery(
  baseOptions: Apollo.QueryHookOptions<GetLeadQuery, GetLeadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLeadQuery, GetLeadQueryVariables>(
    GetLeadDocument,
    options
  );
}
export function useGetLeadLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetLeadQuery, GetLeadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLeadQuery, GetLeadQueryVariables>(
    GetLeadDocument,
    options
  );
}
export type GetLeadQueryHookResult = ReturnType<typeof useGetLeadQuery>;
export type GetLeadLazyQueryHookResult = ReturnType<typeof useGetLeadLazyQuery>;
export type GetLeadQueryResult = Apollo.QueryResult<
  GetLeadQuery,
  GetLeadQueryVariables
>;
export const SendEmailsDocument = gql`
  mutation SendEmails($input: SendEmailsInputType!) {
    sendEmails(input: $input) {
      success
    }
  }
`;
export type SendEmailsMutationFn = Apollo.MutationFunction<
  SendEmailsMutation,
  SendEmailsMutationVariables
>;

/**
 * __useSendEmailsMutation__
 *
 * To run a mutation, you first call `useSendEmailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailsMutation, { data, loading, error }] = useSendEmailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendEmailsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendEmailsMutation,
    SendEmailsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SendEmailsMutation, SendEmailsMutationVariables>(
    SendEmailsDocument,
    options
  );
}
export type SendEmailsMutationHookResult = ReturnType<
  typeof useSendEmailsMutation
>;
export type SendEmailsMutationResult =
  Apollo.MutationResult<SendEmailsMutation>;
export type SendEmailsMutationOptions = Apollo.BaseMutationOptions<
  SendEmailsMutation,
  SendEmailsMutationVariables
>;
export const MyTenantUserDocument = gql`
  query MyTenantUser {
    tenantUser {
      id
      name
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMyTenantUserQuery__
 *
 * To run a query within a React component, call `useMyTenantUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTenantUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTenantUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTenantUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyTenantUserQuery,
    MyTenantUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyTenantUserQuery, MyTenantUserQueryVariables>(
    MyTenantUserDocument,
    options
  );
}
export function useMyTenantUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyTenantUserQuery,
    MyTenantUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyTenantUserQuery, MyTenantUserQueryVariables>(
    MyTenantUserDocument,
    options
  );
}
export type MyTenantUserQueryHookResult = ReturnType<
  typeof useMyTenantUserQuery
>;
export type MyTenantUserLazyQueryHookResult = ReturnType<
  typeof useMyTenantUserLazyQuery
>;
export type MyTenantUserQueryResult = Apollo.QueryResult<
  MyTenantUserQuery,
  MyTenantUserQueryVariables
>;
export const CreateTenantDocument = gql`
  mutation CreateTenant($input: CreateTenantInput!) {
    createTenant(input: $input) {
      tenant {
        id
        name
        website
        createdAt
        updatedAt
      }
    }
  }
`;
export type CreateTenantMutationFn = Apollo.MutationFunction<
  CreateTenantMutation,
  CreateTenantMutationVariables
>;

/**
 * __useCreateTenantMutation__
 *
 * To run a mutation, you first call `useCreateTenantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTenantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTenantMutation, { data, loading, error }] = useCreateTenantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTenantMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTenantMutation,
    CreateTenantMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateTenantMutation,
    CreateTenantMutationVariables
  >(CreateTenantDocument, options);
}
export type CreateTenantMutationHookResult = ReturnType<
  typeof useCreateTenantMutation
>;
export type CreateTenantMutationResult =
  Apollo.MutationResult<CreateTenantMutation>;
export type CreateTenantMutationOptions = Apollo.BaseMutationOptions<
  CreateTenantMutation,
  CreateTenantMutationVariables
>;
export const MyTenantDocument = gql`
  query MyTenant {
    tenant {
      id
      name
      website
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMyTenantQuery__
 *
 * To run a query within a React component, call `useMyTenantQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTenantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTenantQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTenantQuery(
  baseOptions?: Apollo.QueryHookOptions<MyTenantQuery, MyTenantQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyTenantQuery, MyTenantQueryVariables>(
    MyTenantDocument,
    options
  );
}
export function useMyTenantLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyTenantQuery,
    MyTenantQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyTenantQuery, MyTenantQueryVariables>(
    MyTenantDocument,
    options
  );
}
export type MyTenantQueryHookResult = ReturnType<typeof useMyTenantQuery>;
export type MyTenantLazyQueryHookResult = ReturnType<
  typeof useMyTenantLazyQuery
>;
export type MyTenantQueryResult = Apollo.QueryResult<
  MyTenantQuery,
  MyTenantQueryVariables
>;
export const MeDocument = gql`
  query Me {
    user {
      id
      email
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;

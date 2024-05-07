import AgencyUser from "@/components/pages/app/agencyUser/AgencyUser";
import initTranslations from "@/lib/i18n";
import TranslationsProvider from "@/providers/TranslationProvider";

type AgencyPageProps = {
  params: {
    lang: string;
  };
};

const AgencyPage = async ({ params }: AgencyPageProps) => {
  const { lang } = params;
  return (
    <TranslationsProvider locale={lang} namespaces={["agency", "common"]}>
      <AgencyUser />
    </TranslationsProvider>
  );
};

export default AgencyPage;

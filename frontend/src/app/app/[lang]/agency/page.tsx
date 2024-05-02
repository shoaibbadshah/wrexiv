import Agency from "@/components/pages/app/agency/Agency";
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
      <Agency />;
    </TranslationsProvider>
  );
};

export default AgencyPage;

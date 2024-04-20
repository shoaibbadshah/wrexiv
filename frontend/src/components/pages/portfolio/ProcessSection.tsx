import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const pages = [
  {
    page: "AI Product",
    image: "/portfolio/sample2.jpg",
    desc: "Innovative ways to connect with key overseas contacts.",
  },
  {
    page: "Global Expansion Support",
    image: "/portfolio/sample2.jpg",
    desc: "Supporting market entry from scratch.",
  },
  {
    page: "Development",
    image: "/portfolio/sample2.jpg",
    desc: "Covering all for development with innovative tech.",
  },
];

const process = [
  {
    keyword: "Discovery",
    title: "01 Book your discovery session",
    desc: `If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly. If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly. If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly.`,
  },
  {
    keyword: "Scope & Estimate",
    title: "02 Scope & Estimate",
    desc: `If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly. If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly. If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly.`,
  },
  {
    keyword: "Solution",
    title: "03 Solution",
    desc: `If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly. If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly. If you're having trouble imagining what your product should be like, we will help you define your MVP scope and features. Our UX Designers will start by transferring your idea into user stories. Afterward, we will determine which of these stories generates the most value for the users and prioritize them accordingly.`,
  },
];

export default function Example() {
  return (
    <div id="processSection" className="bg-black py-16 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div>
            <h2 className="text-xl tracking-tight text-white sm:text-2xl">
              Process
            </h2>
            <h2 className="mt-6 sm:text-4xl">
              Accelerate your global expansion
            </h2>
            <h2 className="mt-1 sm:text-4xl">
              with our one-stop team at GlobalDeel
            </h2>
          </div>
          <Box
            justifyContent="space-between"
            alignItems="stretch"
            display="flex"
            position="relative"
            mt={5}
          >
            <Box height="100vw">
              <Box
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                width="100%"
                display="flex"
                pt={5}
                position="sticky"
                top="10rem"
                zIndex="5"
              >
                {process.map((step, index) => (
                  <Typography key={index} variant="h6" sx={{ mb: 2 }}>
                    <a href={`#${step.keyword}`}>{step.keyword}</a>
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box width="60%">
              {process.map((step, index) => (
                <Box key={index} id={step.keyword} py={5}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ mb: 5, fontSize: 18 }}>
                    {step.desc}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <div className="mx-auto mt-6 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-10 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {pages.map(pages => (
                <div key={pages.page} className="flex flex-col">
                  <dt className="text-base text-xl leading-7 mb-2">
                    <Image
                      className="aspect-[3/2] w-full rounded-2xl object-cover mb-4"
                      src={pages.image}
                      alt={pages.page}
                      width={300}
                      height={80}
                    />
                    {pages.page}
                  </dt>
                  <dd>
                    <a className="text-gray-400">{pages.desc}</a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

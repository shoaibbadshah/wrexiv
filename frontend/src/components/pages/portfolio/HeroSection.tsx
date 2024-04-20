export default function HeroSection() {
  const css = `
    .moving-text-hero-section {
      list-style: none;
      margin-top: 2rem;
      position: relative;
      height: 8rem;
      overflow: hidden;
    }

    .moving-text-hero-section li {
      height: 8rem;
      animation: slide-up 12s infinite;
    }

    @keyframes slide-up {
      0%, 15% {
        transform: translateY(0rem);
      }
      25%, 40% {
        transform: translateY(-8rem);
      }
      50%, 65% {
        transform: translateY(-16rem);
      }
      75%, 90% {
        transform: translateY(-24rem);
      }
      100% {
        transform: translateY(-32rem);
      }
    }
  `;

  return (
    <div className="bg-black min-h-screen">
      <style>{css}</style>
      <div className="relative isolate pt-24">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mt-10 mx-auto max-w-2xl text-left text-white">
              <p className="mt-8 text-lg leading-8 text-600">
                Global IT Company
              </p>
              <ol className="moving-text-hero-section">
                <li>
                  <div className="mb-3 text-4xl tracking-tight text-900 sm:text-5xl">
                    Do you want to expand?
                  </div>
                  <div className="text-4xl tracking-tight text-900 sm:text-5xl">
                    But don&apos;t know where to start?
                  </div>
                </li>
                <li>
                  <div className="mb-3 text-4xl tracking-tight text-900 sm:text-5xl">
                    Supercharge your expansion
                  </div>
                  <div className="text-4xl tracking-tight text-900 sm:text-5xl">
                    with GlobalDeel.
                  </div>
                </li>
                <li>
                  <div className="mb-3 text-4xl tracking-tight text-900 sm:text-5xl">
                    Use AI to accelerate
                  </div>
                  <div className="text-4xl tracking-tight text-900 sm:text-5xl">
                    your global market entry.
                  </div>
                </li>
                <li>
                  <div className="mb-3 text-4xl tracking-tight text-900 sm:text-5xl">
                    We plan, design and develop
                  </div>
                  <div className="text-4xl tracking-tight text-900 sm:text-5xl">
                    your expansion.
                  </div>
                </li>
                <li>
                  <div className="mb-3 text-4xl tracking-tight text-900 sm:text-5xl">
                    Do you want to expand?
                  </div>
                  <div className="text-4xl tracking-tight text-900 sm:text-5xl">
                    But don&apos;t know where to start?
                  </div>
                </li>
              </ol>
              <div className="mt-12 flex items-center gap-x-6">
                <a
                  href="https://www.globaldeel.com/sign_in"
                  className="bg-gray-300 px-3.5 py-2.5 text-sm text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go to Page
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}

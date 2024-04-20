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
      {/* <style>
        {css}
      </style> */}
      <div className="relative isolate pt-24">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="py-24 sm:py-32 lg:pb-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mt-10 mx-auto max-w-2xl text-left text-white">
              <p className="mt-8 text-lg leading-8 text-600">Case Study</p>
              <ol className="moving-text-hero-section">
                <li>
                  <h1 className="mb-3 text-4xl tracking-tight text-900 sm:text-5xl">
                    Creating digital products
                  </h1>
                  <h1 className="text-4xl tracking-tight text-900 sm:text-5xl">
                    your clients will fall in love with
                  </h1>
                </li>
              </ol>
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

export default function Example() {
  return (
    <div id="contactSection" className="bg-black">
      <div className="px-6 py-8 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-7xl px-6 text-left my-10">
          <p className="text-lg leading-8 text-gray-200">Contact Section</p>
          <h2 className="mt-8 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            We are always here for you
            <br />
            {`Let's talk.`}
          </h2>

          <div className="mt-10 flex items-center justify-left gap-x-6">
            <a
              href="#"
              className="bg-white px-3.5 py-2.5 text-sm text-black shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book your 30min call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

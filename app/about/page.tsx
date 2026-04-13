export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-8 py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-green-700">
          About Renova
        </p>

        <h1 className="mt-4 text-5xl font-bold text-green-700">
          A collaborative platform for affordable and sustainable renovation.
        </h1>

        <p className="mt-6 text-lg leading-8 text-stone-600">
          Renova is a digital platform dedicated to the exchange of tools,
          materials and renovation-related services. Its goal is to reduce costs
          for individuals while promoting a more sustainable and circular way to renovate.
        </p>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <div className="rounded-[24px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-bold text-green-700">The project</h2>

          <p className="mt-4 leading-7 text-stone-600">
            Many people own tools they rarely use, have leftover construction
            materials after renovation work, or have useful practical skills they
            could share. Renova centralizes these exchanges in one simple platform.
          </p>

          <p className="mt-4 leading-7 text-stone-600">
            Users can lend or borrow DIY tools, exchange leftover materials,
            offer or request services, and contribute to a local sharing community.
          </p>
        </div>

        <div className="rounded-[24px] bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-bold text-green-700">The points system</h2>

          <p className="mt-4 leading-7 text-stone-600">
            The platform works with a contribution-based points system. Users
            earn points by lending tools, giving away materials or offering help.
          </p>

          <p className="mt-4 leading-7 text-stone-600">
            These points can then be used to access other tools, materials or
            services offered by the community, encouraging exchange rather than
            pure financial transactions.
          </p>
        </div>
      </section>

      <section className="mt-14 rounded-[28px] bg-green-700 p-8 text-white">
  <h2 className="text-3xl font-bold">The creators</h2>

  <p className="mt-4 max-w-3xl text-green-50">
    Renova was created as a student project to imagine a practical,
    collaborative and sustainable solution for renovation challenges.
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    {/* Lucien */}
    <div className="rounded-[20px] bg-white/10 p-5 text-center">
      <img
        src="/lucienphoto.jpg"
        alt="Lucien"
        className="mx-auto h-24 w-24 rounded-full object-cover"
      />
      <h3 className="mt-4 text-xl font-semibold">Lucien</h3>
      <p className="mt-2 text-sm text-green-50">
        Add role or short description here.
      </p>

      <a
        href="https://www.linkedin.com/in/lucien-raskin-87a762339/"
        target="_blank"
        className="mt-4 inline-block rounded-full border border-white px-3 py-1 text-sm transition hover:bg-white hover:text-green-700"
      >
        LinkedIn
      </a>
    </div>

    {/* Hugo */}
    <div className="rounded-[20px] bg-white/10 p-5 text-center">
      <img
        src="/hugophoto.jpg"
        alt="Hugo"
        className="mx-auto h-24 w-24 rounded-full object-cover"
      />
      <h3 className="mt-4 text-xl font-semibold">Hugo</h3>
      <p className="mt-2 text-sm text-green-50">
        Add role or short description here.
      </p>

      <a
        href="https://www.linkedin.com/in/hugo-foury-8b68373b8/"
        target="_blank"
        className="mt-4 inline-block rounded-full border border-white px-3 py-1 text-sm transition hover:bg-white hover:text-green-700"
      >
        LinkedIn
      </a>
    </div>

    {/* Tom */}
    <div className="rounded-[20px] bg-white/10 p-5 text-center">
      <img
        src="/tomphoto.jpg"
        alt="Tom"
        className="mx-auto h-24 w-24 rounded-full object-cover"
      />
      <h3 className="mt-4 text-xl font-semibold">Tom</h3>
      <p className="mt-2 text-sm text-green-50">
        Add role or short description here.
      </p>

      <a
        href="https://www.linkedin.com/in/tom-verstraelen-b11154339/"
        target="_blank"
        className="mt-4 inline-block rounded-full border border-white px-3 py-1 text-sm transition hover:bg-white hover:text-green-700"
      >
        LinkedIn
      </a>
    </div>

  </div>
</section>
    </main>
  );
}
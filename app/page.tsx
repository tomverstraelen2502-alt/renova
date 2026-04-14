import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-scree px-6 py-12">
      <section className="mx-auto flex max-w-4xl flex-col items-center text-center pt-12">
        
        <div className="rounded-full bg-white p-5 shadow-sm">
          <img
            src="/renova-icon.png"
            alt="Renova logo"
            className="h-28 w-28 object-contain"
          />
        </div>

        <h1 className="mt-10 text-5xl font-bold text-green-700">
          Bienvenue sur Renova
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Merci d’être sur notre plateforme. Nous sommes ravis de vous accueillir
          dans une communauté qui partage outils, matériaux et services pour rénover autrement.
        </p>

        <div className="mt-10 max-w-2xl rounded-3xl bg-white px-8 py-8 shadow-sm ring-1 ring-green-100">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
            Offre de bienvenue
          </p>

          <p className="mt-4 text-3xl font-bold text-green-800">
            10 points gratuits
          </p>

          <p className="mt-3 text-base text-slate-600">
            Connectez-vous maintenant pour recevoir vos 10 points de bienvenue
            et commencer à explorer la plateforme.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/login"
              className="rounded-full bg-green-700 px-8 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Se connecter
            </Link>

            <Link
              href="/signup"
              className="rounded-full border border-green-700 px-8 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
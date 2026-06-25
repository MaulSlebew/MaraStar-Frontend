import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="border-b border-zinc-200">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          WHO WE ARE
        </p>

        <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-zinc-900 md:text-6xl">
          BUILT TO BE WORN.
          <br />
          NOT ADMIRED.
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
          <span className="font-semibold text-zinc-900">BLABLABLA</span> started
          with one problem — most "heavyweight" tees out here are heavy in name
          only. We don't do that. One product done right beats ten products done
          lazy.
        </p>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
          That's why we focus on{" "}
          <span className="font-semibold text-zinc-900">one silhouette</span> —
          So we locked in on one silhouette. Boxy fit, 20s Heavyweight 240 GSM
          cotton, refined every single batch. Not about variety. About
          consistency every time you put it on.
        </p>

        {/* NILAI / PRINSIP BRAND */}
        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-zinc-200 pt-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-black text-zinc-900">01</p>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
              NO CAP MATERIAL
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              20s combed cotton, 240 GSM. Not just a spec on the tag.
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-black text-zinc-900">02</p>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
              CONSISTENT CUT
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Same boxy fit, locked in every production run. No surprises.
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-black text-zinc-900">03</p>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
              LIMITED ON PURPOSE
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Every drop is capped. Not mass produced. Never will be.
            </p>
          </div>
        </div>

        {/* CTA - UPGRADED TO MODERN LINK ROUTER */}
        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-zinc-200 pt-10">
          <Link
            to="/shop"
            className="bg-zinc-950 px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-50 transition-colors hover:bg-zinc-800 text-center"
          >
            SHOP THE DROP
          </Link>
          <Link
            to="/"
            className="border border-zinc-900 px-8 py-4 text-sm font-bold uppercase tracking-widest text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-zinc-50 text-center"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    </section>
  );
}
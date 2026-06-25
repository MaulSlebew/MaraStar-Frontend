import React, { useState } from "react";
import { Link } from "react-router-dom";

const SIZE_CHARTS = [
  {
    id: "boxy",
    label: "Boxy Fit 20s",
    desc: "Wide shoulders, straight drop. Measure up if you want that extra boxy look.",
    sizes: [
      { size: "M", chest: 108, length: 72, shoulder: 52 },
      { size: "L", chest: 114, length: 75, shoulder: 55 },
      { size: "XL", chest: 120, length: 78, shoulder: 58 },
    ],
  },
  {
    id: "oversize",
    label: "Oversize Boxy 20s",
    desc: "Already cut big. Runs larger than Boxy Fit — size down if unsure.",
    sizes: [
      { size: "M", chest: 114, length: 75, shoulder: 55 },
      { size: "L", chest: 120, length: 78, shoulder: 58 },
      { size: "XL", chest: 126, length: 81, shoulder: 61 },
    ],
  },
  {
    id: "fitted",
    label: "Fitted Tee",
    desc: "Slim through the body. True to size — no need to size down.",
    sizes: [
      { size: "M", chest: 98, length: 70, shoulder: 46 },
      { size: "L", chest: 104, length: 73, shoulder: 49 },
      { size: "XL", chest: 110, length: 76, shoulder: 52 },
    ],
  },
  {
    id: "hoodie-boxy",
    label: "Hoodie Boxy",
    desc: "Loose fit with a relaxed silhouette. Runs true to size.",
    sizes: [
      { size: "M", chest: 108, length: 72, shoulder: 52 },
      { size: "L", chest: 114, length: 75, shoulder: 55 },
      { size: "XL", chest: 120, length: 78, shoulder: 58 },
    ],
  },
];

export default function SizeChartPage() {
  const [active, setActive] = useState("boxy");
  const current = SIZE_CHARTS.find((c) => c.id === active);

  return (
    <section className="border-b border-zinc-200">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-10 md:py-28">
        {/* HEADER */}
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-zinc-400">
          Size Guide
        </p>
        <h1 className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tighter text-zinc-900 md:text-6xl">
          KNOW YOUR FIT.
          <br />
          NO GUESSING.
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-zinc-500 md:text-lg">
          All measurements in{" "}
          <span className="font-semibold text-zinc-900">centimeters</span>,
          taken flat. Each cut has its own sizing — pick your style below.
        </p>

        {/* TAB SWITCHER */}
        <div className="mt-14 flex gap-0 border border-zinc-200">
          {SIZE_CHARTS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`flex-1 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${
                active === cat.id
                  ? "bg-zinc-950 text-zinc-50"
                  : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* DESC */}
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          {current.desc}
        </p>

        {/* TABEL */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200">
                {["SIZE", "CHEST", "LENGTH", "SHOULDER"].map((col) => (
                  <th
                    key={col}
                    className="pb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-400 pr-8"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {current.sizes.map((row) => (
                <tr
                  key={row.size}
                  className="border-b border-zinc-100 transition-colors hover:bg-zinc-50"
                >
                  <td className="py-4 pr-8 font-display text-xl font-black text-zinc-900">
                    {row.size}
                  </td>
                  <td className="py-4 pr-8 text-sm text-zinc-500">
                    {row.chest} <span className="text-zinc-300">cm</span>
                  </td>
                  <td className="py-4 pr-8 text-sm text-zinc-500">
                    {row.length} <span className="text-zinc-300">cm</span>
                  </td>
                  <td className="py-4 pr-8 text-sm text-zinc-500">
                    {row.shoulder} <span className="text-zinc-300">cm</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* HOW TO MEASURE */}
        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-zinc-200 pt-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-black text-zinc-900">01</p>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
              CHEST
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Measure flat across the widest point of the chest, armpit to
              armpit.
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-black text-zinc-900">02</p>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
              LENGTH
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              From the highest point of the shoulder down to the bottom hem.
            </p>
          </div>
          <div>
            <p className="font-display text-2xl font-black text-zinc-900">03</p>
            <h3 className="mt-2 text-sm font-bold uppercase tracking-widest text-zinc-900">
              SHOULDER
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Seam to seam across the back, shoulder point to shoulder point.
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
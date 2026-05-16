"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Send } from "lucide-react";

export default function BookingForm() {
  const { isNight } = useTheme();
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", guests: "2", zone: "VIP Deck" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const WHATSAPP_NUMBER = "523300000000"; // RPs/Concierge Real Number
    const message = `Hola Concierge DMT, me gustaría solicitar una reserva VIP:\n\n` +
                    `• Nombre: ${formData.name}\n` +
                    `• Teléfono: ${formData.phone}\n` +
                    `• Fecha/Evento: ${formData.date}\n` +
                    `• Invitados: ${formData.guests}\n` +
                    `• Zona de preferencia: ${formData.zone}\n\n` +
                    `Quedo atento a la confirmación de disponibilidad.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="booking" className="w-full max-w-3xl mx-auto py-32 px-6">
      <div className="text-center mb-16">
        <span className="font-inter text-xs tracking-[0.4em] uppercase opacity-60">Acceso Exclusivo</span>
        <h2 className="font-syne text-4xl md:text-5xl font-bold uppercase mt-2">Reservaciones VIP</h2>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-6 font-inter p-8 md:p-12 rounded-3xl border backdrop-blur-md transition-all duration-[1500ms] ${
        isNight ? "bg-black/30 border-[#1a1a1a]" : "bg-white/40 border-[#e0e0e0] shadow-xl"
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest mb-2 opacity-70 font-syne">Nombre Completo</label>
            <input
              type="text" required name="name" value={formData.name} onChange={handleChange}
              className={`p-4 rounded-xl border bg-transparent outline-none transition-all ${
                isNight ? "border-[#222] focus:border-[#00F2FE] focus:shadow-[0_0_15px_rgba(0,242,254,0.2)]" : "border-[#ccc] focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest mb-2 opacity-70 font-syne">Teléfono</label>
            <input
              type="tel" required name="phone" value={formData.phone} onChange={handleChange}
              className={`p-4 rounded-xl border bg-transparent outline-none transition-all ${
                isNight ? "border-[#222] focus:border-[#00F2FE] focus:shadow-[0_0_15px_rgba(0,242,254,0.2)]" : "border-[#ccc] focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest mb-2 opacity-70 font-syne">Fecha del Ritual</label>
            <input
              type="text" placeholder="Ej. 23 Mayo" required name="date" value={formData.date} onChange={handleChange}
              className={`p-4 rounded-xl border bg-transparent outline-none transition-all ${
                isNight ? "border-[#222] focus:border-[#00F2FE] focus:shadow-[0_0_15px_rgba(0,242,254,0.2)]" : "border-[#ccc] focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest mb-2 opacity-70 font-syne">No. de Invitados</label>
            <select
              name="guests" value={formData.guests} onChange={handleChange}
              className={`p-4 rounded-xl border bg-transparent outline-none transition-all ${
                isNight ? "border-[#222] focus:border-[#00F2FE]" : "border-[#ccc] focus:border-[#D4AF37]"
              }`}
            >
              <option value="2" className={isNight ? "bg-[#111]" : "bg-white"}>2 Personas</option>
              <option value="4" className={isNight ? "bg-[#111]" : "bg-white"}>4 Personas</option>
              <option value="6" className={isNight ? "bg-[#111]" : "bg-white"}>6 Personas</option>
              <option value="10+" className={isNight ? "bg-[#111]" : "bg-white"}>Más de 10</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-widest mb-2 opacity-70 font-syne">Zona Preferente</label>
            <select
              name="zone" value={formData.zone} onChange={handleChange}
              className={`p-4 rounded-xl border bg-transparent outline-none transition-all ${
                isNight ? "border-[#222] focus:border-[#00F2FE]" : "border-[#ccc] focus:border-[#D4AF37]"
              }`}
            >
              <option value="General Deck" className={isNight ? "bg-[#111]" : "bg-white"}>General Deck</option>
              <option value="VIP Lounge" className={isNight ? "bg-[#111]" : "bg-white"}>VIP Lounge</option>
              <option value="DJ Booth Backstage" className={isNight ? "bg-[#111]" : "bg-white"}>DJ Booth Backstage</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-5 rounded-xl font-syne font-bold tracking-widest uppercase flex items-center justify-center gap-3 transition-all duration-500 shadow-lg ${
            isNight 
              ? "bg-[#00F2FE] text-black hover:bg-[#00d2dc] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)]" 
              : "bg-[#111] text-white hover:bg-black"
          }`}
        >
          <Send size={16} /> Solicitar Mesa Concierge
        </button>
      </form>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import { User, Phone, CalendarDays, Users, MapPin, Send, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  phone: string;
  eventDate: string;
  guests: string;
  zone: string;
}

type FormField = keyof FormData;

const zones = [
  { value: "general", label: "General Admission", price: "Desde $800 MXN" },
  { value: "vip", label: "VIP Deck", price: "Desde $2,500 MXN" },
  { value: "booth", label: "DJ Booth Experience", price: "Desde $8,000 MXN" },
];

export default function BookingForm() {
  const { isNight } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    eventDate: "",
    guests: "",
    zone: "general",
  });
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;

    if (!section || !form) return;

    const ctx = gsap.context(() => {
      gsap.from(form, {
        scrollTrigger: {
          trigger: form,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power4.out",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as FormField]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<FormField, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Por favor ingresa tu teléfono";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Ingresa un número válido de 10 dígitos";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Por favor selecciona una fecha";
    }

    if (!formData.guests || parseInt(formData.guests) < 1) {
      newErrors.guests = "Por favor indica el número de invitados";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const selectedZone = zones.find((z) => z.value === formData.zone);
    const formattedDate = new Date(formData.eventDate).toLocaleDateString(
      "es-MX",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    const message = `
*🌟 RESERVACIÓN DMT CLUB 🌟*

Estimado equipo DMT,

Solicito una reservación con los siguientes detalles:

👤 *Nombre:* ${formData.name}
📱 *Teléfono:* ${formData.phone}
📅 *Fecha del Evento:* ${formattedDate}
👥 *Número de Invitados:* ${formData.guests}
🎫 *Zona:* ${selectedZone?.label}

Quedo atento a su confirmación.

_Mensaje enviado desde dmtclub.mx_
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "5213312345678";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
    }, 800);
  };

  const inputClasses = `w-full px-5 py-4 rounded-xl text-base transition-all duration-300 outline-none ${
    isNight
      ? "bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:bg-white/[0.05]"
      : "bg-black/[0.03] border border-black/10 text-dmt-black placeholder:text-dmt-black/30 focus:border-dmt-gold/50 focus:bg-black/[0.05]"
  }`;

  const labelClasses = `flex items-center gap-2 text-sm font-medium mb-2 transition-colors duration-700 ${
    isNight ? "text-white/70" : "text-dmt-black/70"
  }`;

  return (
    <section
      ref={sectionRef}
      className={`relative py-24 md:py-32 lg:py-40 overflow-hidden transition-colors duration-700 ${
        isNight ? "bg-dmt-black" : "bg-dmt-light"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] transition-all duration-700 ${
            isNight ? "bg-fuchsia-600/5" : "bg-amber-400/5"
          }`}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span
            className={`text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-6 block transition-colors duration-700 ${
              isNight ? "text-cyan-400" : "text-dmt-gold"
            }`}
          >
            Reservaciones VIP
          </span>

          <h2
            className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-700 ${
              isNight ? "text-white" : "text-dmt-black"
            }`}
          >
            Asegura Tu{" "}
            <span
              className={`transition-colors duration-700 ${
                isNight
                  ? "bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent"
                  : "text-dmt-gold"
              }`}
            >
              Experiencia
            </span>
          </h2>

          <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-700 ${
              isNight ? "text-white/60" : "text-dmt-black/60"
            }`}
          >
            Completa el formulario y nuestro equipo de concierge te contactará
            para confirmar los detalles de tu reservación exclusiva.
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`p-8 md:p-12 rounded-3xl border backdrop-blur-xl transition-all duration-700 ${
            isNight
              ? "bg-white/[0.02] border-white/10"
              : "bg-white/80 border-black/5 shadow-xl"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className={labelClasses}>
                <User className="w-4 h-4" />
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className={inputClasses}
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-2">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className={labelClasses}>
                <Phone className="w-4 h-4" />
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 dígitos"
                className={inputClasses}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="eventDate" className={labelClasses}>
                <CalendarDays className="w-4 h-4" />
                Fecha del Evento
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={inputClasses}
              />
              {errors.eventDate && (
                <p className="text-red-400 text-sm mt-2">{errors.eventDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="guests" className={labelClasses}>
                <Users className="w-4 h-4" />
                Número de Invitados
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="¿Cuántos asistirán?"
                min="1"
                max="50"
                className={inputClasses}
              />
              {errors.guests && (
                <p className="text-red-400 text-sm mt-2">{errors.guests}</p>
              )}
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="zone" className={labelClasses}>
              <MapPin className="w-4 h-4" />
              Selección de Zona
            </label>
            <div className="grid sm:grid-cols-3 gap-4">
              {zones.map((zone) => (
                <label
                  key={zone.value}
                  className={`relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                    formData.zone === zone.value
                      ? isNight
                        ? "border-cyan-500 bg-cyan-500/10"
                        : "border-dmt-gold bg-dmt-gold/10"
                      : isNight
                      ? "border-white/10 bg-white/[0.02] hover:border-white/20"
                      : "border-black/10 bg-black/[0.02] hover:border-black/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="zone"
                    value={zone.value}
                    checked={formData.zone === zone.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span
                    className={`font-medium mb-1 transition-colors duration-700 ${
                      isNight ? "text-white" : "text-dmt-black"
                    }`}
                  >
                    {zone.label}
                  </span>
                  <span
                    className={`text-sm transition-colors duration-700 ${
                      isNight ? "text-white/50" : "text-dmt-black/50"
                    }`}
                  >
                    {zone.price}
                  </span>
                  {formData.zone === zone.value && (
                    <CheckCircle2
                      className={`absolute top-3 right-3 w-5 h-5 transition-colors duration-700 ${
                        isNight ? "text-cyan-400" : "text-dmt-gold"
                      }`}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-3 py-5 rounded-xl font-semibold text-base tracking-wide uppercase transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed ${
              isNight
                ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:from-cyan-400 hover:to-fuchsia-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                : "bg-dmt-gold text-dmt-black hover:bg-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Enviar Solicitud vía WhatsApp
              </>
            )}
          </button>

          <p
            className={`text-center text-sm mt-6 transition-colors duration-700 ${
              isNight ? "text-white/40" : "text-dmt-black/40"
            }`}
          >
            Al enviar, serás redirigido a WhatsApp con tu solicitud
            pre-completada
          </p>
        </form>
      </div>
    </section>
  );
}

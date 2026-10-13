"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Send } from "lucide-react";

type FormData = {
  name: string;
  email: string;
  whatsapp: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Formulario enviado:", data);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 4000);
  };

  return (
    <section id="contacto" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="glass p-8 md:p-12 rounded-3xl border border-brand-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden">
          {/* Brillo de fondo sutil */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="font-heading text-3xl font-bold text-brand-gold mb-3">Solicitar Asesoría</h2>
            <p className="text-brand-light/70 text-sm">Déjanos tus datos y nuestro equipo experto te contactará a la brevedad para ayudarte a elegir tu fragancia.</p>
          </div>
          
          {isSuccess ? (
            <div className="bg-green-900/40 border border-green-500/50 text-green-400 p-6 rounded-xl text-center relative z-10 animate-fade-in-up">
              <p className="font-bold mb-1">¡Solicitud recibida con éxito!</p>
              <p className="text-sm">Te contactaremos por WhatsApp muy pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div>
                <input 
                  {...register("name", { required: "El nombre es obligatorio" })}
                  placeholder="Nombre completo"
                  className="w-full bg-brand-surface/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-light/30 focus:outline-none focus:border-brand-gold transition-colors focus:bg-brand-surface"
                />
                {errors.name && <span className="text-red-400 text-xs mt-1 ml-1 block">{errors.name.message}</span>}
              </div>
              
              <div>
                <input 
                  {...register("email", { 
                    required: "El correo es obligatorio",
                    pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" }
                  })}
                  placeholder="Correo electrónico"
                  className="w-full bg-brand-surface/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-light/30 focus:outline-none focus:border-brand-gold transition-colors focus:bg-brand-surface"
                />
                {errors.email && <span className="text-red-400 text-xs mt-1 ml-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <input 
                  {...register("whatsapp", { required: "El WhatsApp es obligatorio" })}
                  placeholder="Número de WhatsApp"
                  className="w-full bg-brand-surface/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-light/30 focus:outline-none focus:border-brand-gold transition-colors focus:bg-brand-surface"
                />
                {errors.whatsapp && <span className="text-red-400 text-xs mt-1 ml-1 block">{errors.whatsapp.message}</span>}
              </div>

              <div>
                <textarea 
                  {...register("message")}
                  placeholder="¿Qué tipo de fragancia buscas? (Opcional)"
                  rows={4}
                  className="w-full bg-brand-surface/50 border border-brand-gold/20 rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-light/30 focus:outline-none focus:border-brand-gold transition-colors resize-none focus:bg-brand-surface"
                ></textarea>
              </div>

              <button type="submit" className="btn-gold w-full flex items-center justify-center gap-2 group mt-4">
                <span>Enviar Solicitud</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

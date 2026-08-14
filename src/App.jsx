import { useState, useEffect } from "react";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId
} from "./api.js";

export default function App() {

  const [contactos, setContactos] = useState([]);

  // GET - cargar contactos al iniciar
  useEffect(() => {
    listarContactos()
      .then(data => setContactos(data))
      .catch(error => console.error(error));
  }, []);

  // POST - agregar contacto
  const agregarContacto = async (form) => {
    try {
      const nuevo = await crearContacto(form);

      setContactos(prev => [...prev, nuevo]);
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE - eliminar contacto
  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);

      setContactos(prev =>
        prev.filter(contacto => contacto.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen py-10 px-4">

      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
        Agenda ADSO v3
      </h1>

      <div className="max-w-4xl mx-auto">

        <section className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
          <FormularioContacto onAgregar={agregarContacto} />
        </section>

        <section className="space-y-4">

          {contactos.map((contacto) => (
            <ContactoCard
              key={contacto.id}
              {...contacto}
              onEliminar={() => eliminarContacto(contacto.id)}
            />
          ))}

        </section>

      </div>
    </main>
  );
}
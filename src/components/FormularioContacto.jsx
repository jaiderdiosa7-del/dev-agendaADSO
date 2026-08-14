import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    empresa: "",
    etiqueta: ""
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.telefono || !form.correo) {
      alert("Nombre, teléfono y correo son obligatorios");
      return;
    }

    onAgregar(form);

    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      empresa: "",
      etiqueta: ""
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre *
          </label>

          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            placeholder="Ej: Ana Pérez"
            className="mt-1 w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono *
          </label>

          <input
            name="telefono"
            value={form.telefono}
            onChange={onChange}
            placeholder="Ej: 3001234567"
            className="mt-1 w-full rounded-lg border border-gray-300 p-3"
          />
        </div>

      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Correo *
        </label>

        <input
          name="correo"
          value={form.correo}
          onChange={onChange}
          placeholder="Ej: ana@sena.edu.co"
          className="mt-1 w-full rounded-lg border border-gray-300 p-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Empresa
        </label>

        <input
          name="empresa"
          value={form.empresa}
          onChange={onChange}
          placeholder="Ej: Comfamiliar"
          className="mt-1 w-full rounded-lg border border-gray-300 p-3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Etiqueta
        </label>

        <input
          name="etiqueta"
          value={form.etiqueta}
          onChange={onChange}
          placeholder="Ej: Trabajo"
          className="mt-1 w-full rounded-lg border border-gray-300 p-3"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg"
      >
        Agregar contacto
      </button>

    </form>
  );
}
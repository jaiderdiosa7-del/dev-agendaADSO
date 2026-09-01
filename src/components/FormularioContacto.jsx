import { useEffect, useState } from "react";

function FormularioContacto({
  onAgregar,
  contactoEnEdicion,
  onActualizar,
  onCancelarEdicion,
}) {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const [errores, setErrores] = useState({
    nombre: "",
    telefono: "",
    correo: "",
  });

  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre: contactoEnEdicion.nombre || "",
        telefono: contactoEnEdicion.telefono || "",
        correo: contactoEnEdicion.correo || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } else {
      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    }
  }, [contactoEnEdicion]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  function validarFormulario() {
    const nuevosErrores = {
      nombre: "",
      telefono: "",
      correo: "",
    };

    if (!form.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!form.telefono.trim()) {
      nuevosErrores.telefono = "El teléfono es obligatorio.";
    }

    if (!form.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!form.correo.includes("@")) {
      nuevosErrores.correo = "El correo debe contener @.";
    }

    setErrores(nuevosErrores);

    return (
      nuevosErrores.nombre === "" &&
      nuevosErrores.telefono === "" &&
      nuevosErrores.correo === ""
    );
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const esValido = validarFormulario();

    if (!esValido) {
      return;
    }

    try {
      setEnviando(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (contactoEnEdicion) {
        await onActualizar({
          ...form,
          id: contactoEnEdicion.id,
        });
      } else {
        await onAgregar(form);
      }

      setForm({
        nombre: "",
        telefono: "",
        correo: "",
        etiqueta: "",
      });

      setErrores({
        nombre: "",
        telefono: "",
        correo: "",
      });
    } catch (error) {
      console.error("Error en el envío del formulario:", error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form
      className="bg-gradient-to-br from-black via-blue-950 to-slate-950 border border-e-white  shadow-sm rounded-2xl p-6 space-y-4 mb-8"
      onSubmit={onSubmit}
    >
      <h2 className="text-lg font-semibold text-white mb-2">
        {contactoEnEdicion ? "Editar contacto" : "Nuevo contacto"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Nombre *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />

        {errores.nombre && (
          <p className="mt-1 text-xs text-red-600">
            {errores.nombre}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Teléfono *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />

        {errores.telefono && (
          <p className="mt-1 text-xs text-red-600">
            {errores.telefono}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Correo *
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />

        {errores.correo && (
          <p className="mt-1 text-xs text-red-600">
            {errores.correo}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Etiqueta (opcional)
        </label>

        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo"
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>

      <div className="pt-2 flex flex-col md:flex-row gap-3">
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-puwhite disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando
            ? "Guardando..."
            : contactoEnEdicion
            ? "Guardar cambios"
            : "Agregar contacto"}
        </button>

        {contactoEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            disabled={enviando}
            className="w-full md:w-auto bg-red-500 hover:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioContacto;
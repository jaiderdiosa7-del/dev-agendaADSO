
import { useEffect, useState } from "react";

// Funciones para comunicarse con la API
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto,
} from "./api";

// Configuración general de la aplicación
import { APP_INFO } from "./config";

// Componentes principales
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

function App() {
  // Estados principales de la aplicación
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  // GET: carga los contactos cuando inicia la aplicación
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");

        const data = await listarContactos();
        setContactos(data);
      } catch (error) {
        console.error("Error al cargar contactos:", error);

        setError(
          "No se pudieron cargar los contactos. Verifica que el servidor esté encendido e intenta de nuevo."
        );
      } finally {
        setCargando(false);
      }
    };

    cargarContactos();
  }, []);

  // POST: crea un nuevo contacto y lo agrega a la lista
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");

      const creado = await crearContacto(nuevoContacto);

      setContactos((prev) => [...prev, creado]);
    } catch (error) {
      console.error("Error al crear contacto:", error);

      setError(
        "No se pudo guardar el contacto. Verifica tu conexión o el estado del servidor e intenta nuevamente."
      );

      throw error;
    }
  };

  // Activa el modo edición con el contacto seleccionado
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  // Cancela la edición y vuelve al modo creación
  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
    setError("");
  };

  // PUT: actualiza los datos del contacto seleccionado
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");

      const { id, ...datos } = contactoActualizado;

      const actualizado = await actualizarContacto(id, datos);

      setContactos((prev) =>
        prev.map((contacto) =>
          contacto.id === id ? actualizado : contacto
        )
      );

      setContactoEnEdicion(null);
    } catch (error) {
      console.error("Error al actualizar contacto:", error);

      setError(
        "No se pudo actualizar el contacto. Verifica el servidor e intenta nuevamente."
      );

      throw error;
    }
  };

  // DELETE: elimina el contacto de la API y de la lista
  const onEliminarContacto = async (id) => {
    try {
      setError("");

      await eliminarContactoPorId(id);

      setContactos((prev) =>
        prev.filter((contacto) => contacto.id !== id)
      );

      if (
        contactoEnEdicion &&
        contactoEnEdicion.id === id
      ) {
        setContactoEnEdicion(null);
      }
    } catch (error) {
      console.error("Error al eliminar contacto:", error);

      setError(
        "No se pudo eliminar el contacto. Vuelve a intentarlo o verifica el servidor."
      );
    }
  };

  // Filtra los contactos según el texto de búsqueda
  const contactosFiltrados = contactos.filter((c) => {
    const termino = busqueda.toLowerCase();

    const nombre = (c.nombre || "").toLowerCase();
    const correo = (c.correo || "").toLowerCase();
    const etiqueta = (c.etiqueta || "").toLowerCase();
    const telefono = (c.telefono || "").toLowerCase();

    return (
      nombre.includes(termino) ||
      correo.includes(termino) ||
      etiqueta.includes(termino) ||
      telefono.includes(termino)
    );
  });

  // Ordena los contactos alfabéticamente
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nombreA = (a.nombre || "").toLowerCase();
    const nombreB = (b.nombre || "").toLowerCase();

    if (nombreA < nombreB) return ordenAsc ? -1 : 1;
    if (nombreA > nombreB) return ordenAsc ? 1 : -1;

    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Encabezado de la agenda */}
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-white uppercase">
            Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
          </p>

          <h1 className="text-4xl font-extrabold text-white mt-2">
            {APP_INFO.titulo}
          </h1>

          <p className="text-sm text-white mt-1">
            {APP_INFO.subtitulo}
          </p>
        </header>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">
            Cargando contactos...
          </p>
        ) : (
          <>
            {/* Formulario para crear y editar */}
            <FormularioContacto
              onAgregar={onAgregarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onActualizar={onActualizarContacto}
              onCancelarEdicion={onCancelarEdicion}
            />

            {/* Búsqueda y ordenamiento */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm px-4 py-2 border"
                placeholder="Buscar por nombre, correo, etiqueta o teléfono..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>

            {/* Cantidad de contactos encontrados */}
            <div className="mb-4">
              <p className="text-xs text-white font-medium">
                Mostrando {contactosOrdenados.length}{" "}
                {contactosOrdenados.length === 1
                  ? "contacto"
                  : "contactos"}
              </p>
            </div>

            {/* Lista de contactos */}
            <section className="space-y-4">
              {contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No se encontraron contactos que coincidan con la búsqueda.
                </p>
              ) : (
                contactosOrdenados.map((c) => (
                  <ContactoCard
                    key={c.id}
                    id={c.id}
                    nombre={c.nombre}
                    telefono={c.telefono}
                    correo={c.correo}
                    etiqueta={c.etiqueta}
                    onEditar={() => onEditarClick(c)}
                    onEliminar={() => onEliminarContacto(c.id)}
                  />
                ))
              )}
            </section>
          </>
        )}

        {/* Pie de página */}
        <footer className="mt-8 text-xs text-gray-400">
          <p>
            Desarrollo Web – ReactJS | Proyecto Agenda ADSO
          </p>
          <p>
            Instructor: Gustavo Adolfo Bolaños Dorado
          </p>
        </footer>

      </div>
    </div>
  );
}

export default App;

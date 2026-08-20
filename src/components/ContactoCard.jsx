export default function ContactoCard({
  id,
  nombre,
  telefono,
  correo,
  empresa,
  etiqueta,
  onEliminar
}) {
  return (
    <article className="bg-gradient-to-br from-black via-blue-950 to-slate-950 border border-gray-200 rounded-xl shadow-sm p-8">

      <h3 className="text-xl font-bold text-white mb-3">
        {nombre}
      </h3>

      <p className="text-white mb-1">
        Teléfono: {telefono}
      </p>

      <p className="text-white mb-1">
        Correo: {correo}
      </p>

      <p className="text-white mb-1">
        Empresa: {empresa}
      </p>

      <p className="text-white mb-4">
        Etiqueta: {etiqueta}
      </p>

      <div className="flex justify-start">
        <button
          onClick={onEliminar}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Eliminar
        </button>
      </div>

    </article>
  );
}
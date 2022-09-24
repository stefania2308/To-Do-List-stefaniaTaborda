import { useEffect, useState } from "react";
import AlertError from "./AlertError";

const Form = ({ tareas, setTareas, tarea, setTarea }) => {
  const [titulo, setTitulo] = useState('');
  const [fecha, setFecha] = useState('');
  const [Descripcion, setDescripcion] = useState('');
  const [Error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(tarea.length > 0)) {
      setTitulo(tarea.titulo);
      setFecha(tarea.fecha);
      setDescripcion(tarea.Descripcion);

    }
  }, [tarea]);

  const generarId = () => {
    const id = Math.random(). toString(20). substring(0,2)
    return id
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //validacion del fomulario 
    if ([titulo, fecha, Descripcion].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    // creacion de un objeto de tareas 
    const objetoTareas = {
      titulo,
      fecha,
      Descripcion,
    }

     if (tarea.id){
      // editar la tarea 
      objetoTareas.id = tarea.id;
      const tareasActualizadas = tareas.map((tareaState) =>
      tareaState.id === tarea.id ? objetoTareas : tareaState);

      setTareas(tareasActualizadas);
      setTarea({});

      }else{

        // nueva tarea 
        objetoTareas.id = generarId();
        setTareas([...tareas, objetoTareas]);
      }

      //limpiar formulario 

      setTitulo("");
      setFecha("");
      setDescripcion("");
  };



  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center mb-10">
        Creación de Tareas
      </h2>

      <form onSubmit={handleSubmit} className="bg-blue shadow-md rounded-lg py-10 px-5 mb-10">

        {Error && (
          <AlertError>
            <p>todo los campos son obligatorios</p>
          </AlertError>
        )}


        <div className="mb-5">
          <label
            htmlFor="titulo"
            className="block text-gray-700 uppercase font-bold"
          >
            Titulo
          </label>
          <input
            id="titulo"
            type="text"
            placeholder="Titulo de la tarea"
            className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="fecha"
            className="block text-gray-700 uppercase font-bold"
          >
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="block text-gray-700 uppercase font-bold"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            type="text"
            placeholder="Descripción de la tarea"
            className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400"
            value={Descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        {!tarea.id ? (
          <input
            type="submit"
            className="bg-red-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-blue-700 transition-colors cursor-pointer mb-4"
            value="Crear Tarea"
          />) : (
          <input
            type="submit"
            className="bg-purple-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-purple-700 transition-colors cursor-pointer"
            value="Actualizar Tarea"
          />
        )}



      </form>
    </div>
  );
};

export default Form;

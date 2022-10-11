import React, { useEffect, useState } from "react";
import api from '../services/axios';
import Swal from 'sweetalert2';

const Form =({goBack, id})=>{
    const [nombre, setNombre ] = useState("")
    const [documento, setDocumento] = useState("")
    const [ genero, setGenero] = useState()


    const [ fechaN, setFechaN ] = useState("");
    const [ telefono, setTelefono] = useState("");

    const [ epsSelect, setEpsSelec ] = useState(null);
    const [ eps, setEps] = useState([]);

    const [ rolSelct, setRolSelec ] = useState(null)
    const [ rol, setRol] = useState([])

    useEffect(()=>{
        getEps()
        getRol()
    },[])

    useEffect(()=>{
        validar(id)
    },[id])

    const validar = async(id) =>{
    if(id> 0){
       let { data } = await  api.get("getUser");
       let filtro = data.filter(e=>e.id == id);
        setNombre(filtro[0].nombre)
        setDocumento(filtro[0].documento)
        setGenero(filtro[0].genero)
        setFechaN(filtro[0].fecha_nacimiento)
        setTelefono(filtro[0].telefono)
        setEpsSelec(filtro[0].eps_id)
        setRolSelec(filtro[0].rol_id)
    }
    }
    ///mensajes
    const MessageError = async (data) => {
        Swal.fire({
          title: 'Error',
          text: data,
          icon: 'warning',
        })
    }

    const MessageSuccess = async (data) => {
        Swal.fire({
          text: data,
          icon: 'success',
        })
    }


    const getEps = ()=>{
        api.get('getEps')
        .then(response=>{
            setEps(response.data);
        })
    }
    const getRol = () => {
        api.get("getRol").then((response) => {
            setRol(response.data)
        });
    };

    const save =()=>{
        var message = ''
        var error = false

        if(nombre == ""){
            error = true
            message = "Escribe el nombre "
        }
        else if(documento == ""){
            error = true
            message = "Escribe el numero de documento "
        }
        else if(fechaN == ""){
            error = true
            message = "Debes Escribir la fecha "
        }
        else if(telefono == ""){
            error = true
            message = "Debes Escribir el numero de telefono "
        }
        else if(telefono == ""){
            error = true
            message = "Debes Escribir el numero de telefono "
        }
        else if(epsSelect == null){
            error = true
            message = "Debes seleccionar Eps "
        }
        else if(rolSelct == null){
            error = true
            message = "Debes seleccionar Rol "
        }
        if(error){
            MessageError(message)
        }
        else{

        const data = new FormData()
          data.append('id', id)
          data.append('nombre', nombre)
          data.append('documento', documento)
          data.append('genero', genero)
          data.append('fecha_nacimiento', fechaN)
          data.append('telefono', telefono)
          data.append('eps_id', epsSelect)
          data.append('rol_id', rolSelct)
         api.post("registrar",data).then(response=>{
            if(response.success){
                if(id>0){
                    MessageSuccess("Editado correctamente")
                    goBack()
                }
                else{
                    MessageSuccess("Registrado con exito")
                    goBack()
                }

            }
            else{
                MessageError("error")
                goBack()
            }
         })
        }
    }


    return(

    <div className="fomulario" style={{margin:'30px'}}>
        <div class="mb-3">
            <label for="nom" class="form-label">Ingresar Nombre</label>
            <input type="text" value={nombre}
            onChange={(e)=>setNombre(e.target.value)} class="form-control"  />
        </div>
        <div class="mb-3">
            <label for="doc" class="form-label">Documento</label>
            <input type="number" value={documento}
             onChange={(e)=>setDocumento(e.target.value)} class="form-control" />
        </div>
        <div class="mb-3">
            <label for="doc" class="form-label">Genero</label>
            <select name="select" id="select" class="form-control" value={genero} onChange={(e)=>setGenero(e.target.value)}>
                            <option></option>
                            <option value={'F'}>Femenino</option>
                            <option value={'M'}>Masculino</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="doc" class="form-label">Fecha Nacimiento</label>
            <input type="date" value={fechaN}
             onChange={(e)=>setFechaN(e.target.value)} class="form-control" />
        </div>
        <div class="mb-3">
            <label for="doc" class="form-label">Telefono</label>
            <input type="text" value={telefono}
            onChange={(e)=>setTelefono(e.target.value)} class="form-control" />
        </div>
        <div class="mb-3">
            <label for="doc" class="form-label">Eps</label>
            <select className="form-control" value={epsSelect} onChange={(e)=>setEpsSelec(e.target.value)} >
                <option></option>
                {
                    eps.map((item,index)=>{
                        return(
                            <option value={item.id}>{item.nombre}</option>
                        )
                    })
                }
            </select>
        </div>
        <div class="mb-3">
            <label for="doc" class="form-label">Rol</label>
            <select className="form-control" value={rolSelct} onChange={(e)=>setRolSelec(e.target.value)}>
                <option></option>
                {
                     rol.map((item,index)=>{
                        return(
                            <option value={item.id}>{item.nombre}</option>
                        )
                    })
                }
            </select>
        </div>
        <div className="col-md-6" style={{    position: "relative",
                        left: "43%"}}>
        <button  class="btn btn-primary col-md-4" onClick={()=>save()} >Enviar</button>
        </div>

    </div>

    )
}
export default Form;

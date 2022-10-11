import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import api from "../services/axios";
import Form from "./form";
import Swal from 'sweetalert2';
import moment from "moment/moment";

const Index = () => {
    const [usuarios, setUsuario] = useState([]);
    const [ show, setShow ] = useState(true);
    const [ id, setId ] = useState(null)
    useEffect(() => {
        getUser();

    }, []);

    const getUser = () => {
        api.get("getUser").then((response) => {
            setUsuario(response.data);
            console.log(response.data);
        });
    };

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
    const goBack =()=>{
        setShow(true);
        getUser();
        setId(null)
    }
    const editar = (id)=>{
        setId(id)
        setShow(false)
    }

    const eliminar =(id)=>{
        Swal.fire({
            title: 'Estas seguro que deseas Eliminarlo?',
            text: "Recuerda que no podras revertir cambios",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                const data = new FormData()
                data.append('id', id)
                api.post('eliminar', data).then(response=>{
                    if(response.success){
                        MessageSuccess("eliminado con exito")
                        getUser()
                    }
                    else{
                        MessageError("ocurrio un error")
                    }
                })
            }
            else{
                MessageError("Accion Cancelada")
            }
          })


    }

    const fecha = (data)=>{
        let fecha1 = moment();
        let fecha2 = data;
        let anios = fecha1.diff(fecha2, 'years');

        return anios;
    }
    const vista = ()=>{
        setShow(!show)
        setId(null);
    }

    return (
      <>
        <div className="card">
            <div className="card-header d-flex">
                <h4 className="col-md-8"> {show ? "Lista de Usuarios" : "Formulario"}</h4>
                <button className="btn btn-primary col-md-4"
                onClick={()=>vista()}>{ show ? "Crear": "regresar"}</button>
            </div>

            <div className="card-dody">
            {
             show?
                <table class="table mt-5" >
                    <thead style={{backgroundColor:'#5DADE2', color:'white'}}>
                        <tr>
                            <th  scope="col">NOMBRE</th>
                            <th scope="col">DOCUMENTO</th>
                            <th scope="col">GENERO</th>
                            <th scope="col">EDAD </th>
                            <th scope="col">TELEFONO </th>
                            <th scope="col">EPS </th>
                            <th scope="col">ROL </th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((item, index) => {
                            let res  = fecha(item.fecha_nacimiento);
                            return (
                                <tr key={index} style={{backgroundColor:'#AED6F1'}} >
                                    <td style={{backgroundColor:'#5DADE2', color:'white'}}>{item.nombre}</td>
                                    <td>{item.documento}</td>
                                    <td>{item.genero}</td>
                                    {
                                        res < 18?
                                        <td style={{color:"green"}}>{res} años</td>
                                        :res >50 ?
                                        <td style={{color:"red"}}>{res} años</td>
                                        :
                                        <td >{res} años</td>

                                    }

                                    <td>{item.telefono}</td>
                                    <td>{item.eps.nombre}</td>
                                    <td>{item.rol.nombre}</td>
                                    <td ><span onClick={()=>eliminar(item.id)} class="material-symbols-outlined">
                                        delete
                                        </span>
                                        <span onClick={()=>editar(item.id)} class="material-symbols-outlined">
                                        edit
                                        </span>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                : show == false?
                <div className="card">
                    <Form goBack={goBack} id={id} />
                </div>
                :null
            }
            </div>

        </div>


    </>

    );
};
export default Index;
if (document.getElementById("index")) {
    ReactDOM.render(<Index />, document.getElementById("index"));
}

import queryServices from './../../../../services/query.services'
import { useState } from 'react';
const UpdateModule = ({token, displayModule, setDisplayModule, _id, title, description, img, renderMainPage, renderMainPageStatus}) => {

    const [newTittle, setNewTittle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newImg, setNewImg] = useState("")

    const handleOnChange = (e, save) => {
        save(e.target.value);
      };

      const onSubmitHandler = (e) => {
        e.preventDefault()
        try {
          queryServices.UpdatePost(token,_id,newTittle, newDescription, newImg ? newImg : img)
        } catch (error) {
          alert("Eror: No es posible realizar dicha acción **")
        }
        setDisplayModule(false);
        renderMainPage(!renderMainPageStatus);
      };
      
    return(
        <>  
            {                
                displayModule && 
                <div name="Overlay" className="w-screen h-screen fixed top-0 left-0 bg-gray-700 bg-opacity-60 z-10 flex items-center justify-center">
                    <form onSubmit={onSubmitHandler} className="p-20 shadow-lg relative bg-white top-0 left-0 w-2/4 h-3/4 z-20 rounded-3xl flex justify-center flex-col space-y-20">
                        <h2 className="text-3xl font-bold text-left">Editar Post</h2>
                        <div>
                            <ul className="flex flex-col space-y-10 ">
                                <li className=" space-y-5 flex flex-col flex-start justify-start pl-0"><label className="text-xl text-left">Titulo</label> <input onChange={(e) => {handleOnChange(e, setNewTittle)}} className="text-lg border-b-2 text-gray-400 w-100 focus:outline-none focus:text-black" type="text" defaultValue={title ? title : "Titulo"}/></li>
                                <li className=" space-y-5 flex flex-col flex-start justify-start pl-0"><label className="text-xl text-left">Descripcion</label> <input onChange={(e) => {handleOnChange(e, setNewDescription)}} className="text-lg border-b-2 text-gray-400 w-100 focus:outline-none focus:text-black" type="text" defaultValue={description ? description : "Descripcion"}/></li>
                                <li className=" space-y-5 flex flex-col flex-start justify-start pl-0"><label className="text-xl text-left">URL Imagen</label> <input onChange={(e) => {handleOnChange(e, setNewImg)}} className="text-lg border-b-2 text-gray-400 w-100 focus:outline-none focus:text-black" type="text" defaultValue={img ? img : "https://"}/></li>
                            </ul>
                        </div>
                        <div className="flex flex-row justify-between ">
                            <button onClick={() => setDisplayModule(false)} className="pr-20 pl-20 border-1 border-black bg-withe text-black hover:bg-blue-600 hover:text-white  text-center py-2 px-4 rounded-full shadow-lg">Cancelar</button>
                            <button type="submit" className="pr-20 pl-20 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-full shadow-lg">Confirmar</button>
                        </div>
                        
                    </form>
                </div>
            }
        </>
    )
}

export default UpdateModule;
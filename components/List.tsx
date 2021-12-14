import moment from "moment";
import { NextPage } from "next";


type ListProps = {
    tasks : any[]
}

export const List : NextPage<ListProps> = ({ tasks }) => {
    return (
        <div className={"container-list" + (tasks && tasks.length > 0 ? "" : " empty")}>
            { tasks && tasks.length > 0 
                ?  
                    tasks.map(task => <p>{task.name}</p>)
                :
                <>
                    <img src="/empty.svg" alt="Nenhuma tarefa encontrada"/>
                    <p>Você ainda não possui tarefas cadastradas!</p>
                </>
            }
        </div>
    );
}
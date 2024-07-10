import { TaskCard } from "@/app/components/Layout/Tasks/TaskCard";
import { useGetTask } from "@/hooks/tasks"

export default function Tasks() {
  const { data: Tasks, isPending } = useGetTask();
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 px-4">
          {isPending ? "laoding..." : Tasks && (
            Tasks.length === 0 
              ? <span>Nenhuma tarefa criada</span> 
              : Tasks.map(task => <TaskCard key={task.id} data={task} />)
          )}
      </div>
    </div>
  )
}

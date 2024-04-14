/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import api from "../../services/api";
import { MdCheckCircle, MdReplay, MdCreate, MdDelete } from "react-icons/md";
import {
  BoxDashboard,
  BoxTask,
  ContainerIcons,
  ContainerTasks,
  ActionsHeader,
  ModalContent,
  MainHeader,
  LogoutSpan,
  TitleTask,
} from "./styled";
import { Container, ContainerIcon } from "../../components/StyledShared";
import Modal from "../../components/Modal";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useSelector } from "react-redux";
import { useAuth } from "../../contexts/authContext";
import toast from "react-hot-toast";
import Select from "../../components/Select";
import { ITask, TypeStatusTask } from "../../interfaces/task";

const Dashboard = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<TypeStatusTask>("to-do");

  const [isModalCreateTaskOpen, setIsModalCreateTaskOpen] =
    useState<boolean>(false);
  const [titleCreateTask, setTitleCreateTask] = useState<string>("");

  const [isModalEditTaskOpen, setIsModalEditTaskOpen] =
    useState<boolean>(false);
  const [titleEditTask, setTitleEditTask] = useState<string>("");
  const [taskIdEditTask, setTaskIdEditTask] = useState<number>(0);

  const userName = useSelector((state: any) => state.user.userName);

  const { logout } = useAuth();

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks");
      setTasks([...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status: TypeStatusTask = event.target.value as TypeStatusTask;
    setSelectedStatus(status);
  };

  const handleChangeStatusTask = async (
    taskId: number,
    status: TypeStatusTask
  ) => {
    try {
      await api.patch("/tasks", { taskId, status: status });

      const updatedTasksList: ITask[] = tasks.map((task: ITask) =>
        task.id === taskId ? { ...task, status: status } : task
      );

      setTasks([...updatedTasksList]);

      if (status === "completed") {
        toast.success("Tarefa concluída, parabéns! 🎉");
      } else {
        toast("Tarefa retornada para To-do.", { icon: "🔵" });
      }
    } catch (error) {
      toast.error("Não foi possível concluir a tarefa.");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);

      const updatedTasksList: ITask[] = tasks.filter(
        (task) => task.id !== taskId
      );

      toast.success("Tarefa deletada.");

      setTasks([...updatedTasksList]);
    } catch (error) {
      toast.error("Não foi possível deletar a tarefa.");
    }
  };

  const handleCreateTask = async () => {
    try {
      const { data } = await api.post(`/tasks`, { title: titleCreateTask });

      setTasks([...tasks, data]);
      setIsModalCreateTaskOpen(false);
      setTitleCreateTask("");

      toast.success("Tarefa criada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível criar a tarefa.");
    }
  };

  const handleEditTask = async () => {
    try {
      await api.patch(`/tasks`, {
        title: titleEditTask,
        taskId: taskIdEditTask,
      });

      const updatedTasksList: ITask[] = tasks.map((task: ITask) =>
        task.id === taskIdEditTask ? { ...task, title: titleEditTask } : task
      );

      setTasks([...updatedTasksList]);
      setIsModalEditTaskOpen(false);
      setTitleEditTask("");
      setTaskIdEditTask(0);

      toast.success("Tarefa foi editada com sucesso!");
    } catch (error) {
      toast.error("Não foi possível editar a tarefa.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container>
      {/* Modal ADD TASK */}
      <Modal
        isOpen={isModalCreateTaskOpen}
        onClose={() => setIsModalCreateTaskOpen(false)}
        title="Adicionar Tarefa"
      >
        <ModalContent onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Título da tarefa"
            onChange={(e) => setTitleCreateTask(e.target.value)}
            autoFocus
            required
          />
          <Button fullWidth={true} onClick={handleCreateTask} type="submit">
            adicionar
          </Button>
        </ModalContent>
      </Modal>

      {/* Modal EDIT TASK */}
      <Modal
        isOpen={isModalEditTaskOpen}
        onClose={() => setIsModalEditTaskOpen(false)}
        title="Editar"
      >
        <ModalContent onSubmit={(e) => e.preventDefault()}>
          <Input
            type="text"
            placeholder="Título da tarefa"
            onChange={(e) => setTitleEditTask(e.target.value)}
            value={titleEditTask}
            autoFocus
            required
          />
          <Button fullWidth={true} onClick={handleEditTask} type="submit">
            Alterar
          </Button>
        </ModalContent>
      </Modal>

      <BoxDashboard>
        <MainHeader>
          <span>Bem vindo, {userName}!</span>
          <LogoutSpan onClick={logout}>Sair</LogoutSpan>
        </MainHeader>
        <ActionsHeader>
          <Button onClick={() => setIsModalCreateTaskOpen(true)}>
            ADICIONAR +
          </Button>
          <Select onChange={handleChangeStatus}>
            <option value={"to-do"}>To-do</option>
            <option value={"completed"}>Completas</option>
          </Select>
        </ActionsHeader>

        <ContainerTasks>
          {tasks
            .filter((task) => task.status === selectedStatus)
            .map((task: ITask) => (
              <BoxTask status={task.status}>
                <TitleTask status={task.status}>{task.title}</TitleTask>
                <ContainerIcons>
                  {selectedStatus === "to-do" ? (
                    <ContainerIcon
                      onClick={() =>
                        handleChangeStatusTask(task.id, "completed")
                      }
                    >
                      <MdCheckCircle color="#52AA49" />
                    </ContainerIcon>
                  ) : (
                    <ContainerIcon
                      onClick={() => handleChangeStatusTask(task.id, "to-do")}
                    >
                      <MdReplay color="#487EDC" />
                    </ContainerIcon>
                  )}
                  <ContainerIcon
                    onClick={() => {
                      setTaskIdEditTask(task.id);
                      setIsModalEditTaskOpen(true);
                      setTitleEditTask(task.title);
                    }}
                  >
                    <MdCreate color="#4F4E4E" />
                  </ContainerIcon>
                  <ContainerIcon onClick={() => handleDeleteTask(task.id)}>
                    <MdDelete color="#CD4B4B" />
                  </ContainerIcon>
                </ContainerIcons>
              </BoxTask>
            ))}
        </ContainerTasks>
      </BoxDashboard>
    </Container>
  );
};

export default Dashboard;

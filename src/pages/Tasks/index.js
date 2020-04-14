import React, { Component } from 'react';
import { startOfDay } from 'date-fns';
import moment from 'moment';

import api from '../../services/api';

import 'react-datepicker/dist/react-datepicker.css';

import {
  Form,
  Container,
  TaskBox,
  Description,
  Footer,
  SelectFilter,
  SelectDate,
  SearchBox,
  SearchContainer,
  CreateTaskButton,
  CreateTaskBox,
  ContainerBox,
  Error,
  Close,
} from './styles';

const options = [
  { value: 'all', label: 'Todos' },
  { value: 'description', label: 'Descrição' },
  { value: 'name', label: 'Usuário' },
  { value: 'finished_at', label: 'Finalizadas' },
];

class Tasks extends Component {
  state = {
    tasks: [],
    users: null,
    loading: false,
    selectedOption: options[0],
    descriptionTask: null,
    selectedUserTask: null,
    searchInput: '',
    error: null,
    startDate: startOfDay(new Date().setDate(new Date().getDate() - 30)),
    endDate: startOfDay(new Date().setDate(new Date().getDate() + 30)),
    createTask: false,
  };

  componentDidMount = async () => {
    this.loadTasks();
  };

  loadTasks = async () => {
    const { data: tasksData } = await api.get('/tasks');

    this.setState({ tasks: tasksData });
  };

  handleCreateTask = async () => {
    const { descriptionTask, selectedUserTask, tasks } = this.state;

    if (!descriptionTask || !selectedUserTask) {
      this.setState({ error: 'Por favor, preencha os campos' });
    } else {
      await api.post('/tasks', {
        user_id: selectedUserTask.value,
        started_at: `${new Date().toISOString().slice(0, 19)}-03:00`,
        description: descriptionTask,
      });

      this.setState({
        createTask: false,
        descriptionTask: null,
        selectedUserTask: null,
      });

      this.loadTasks();
    }
  };

  handleChangeFilter = (selectedOption) => {
    this.setState({ selectedOption });
  };

  handleChangeUser = (selectedUserTask) => {
    this.setState({ selectedUserTask });
  };

  formatDate = (dateInput) => {
    const date = new Date(dateInput);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const formatted = `${day}/${month}/${year}`;

    return formatted;
  };

  handleChangeDescription = (event) => {
    this.setState({ descriptionTask: event.target.value });
  };

  handleFinishTask = async (id) => {
    await api.put('/tasks', { id });

    this.loadTasks();
  };

  handleOpenCreateTaskBox = async () => {
    const { data } = await api.get('/users');

    const options = data.map((user) => {
      return { value: user.id, label: user.name };
    });

    this.setState({ createTask: true, users: options });
  };

  render() {
    const {
      tasks,
      users,
      error,
      selectedOption,
      selectedUserTask,
      descriptionTask,
      startDate,
      endDate,
      createTask,
      searchInput,
    } = this.state;

    const filteredTasks = tasks.filter((task) => {
      if (selectedOption.value == 'all') {
        return (
          (task.description.toLowerCase().indexOf(searchInput.toLowerCase()) !==
            -1 ||
            task.user.name.toLowerCase().indexOf(searchInput.toLowerCase()) !==
              -1) &&
          moment(task.started_at).isBetween(startDate, endDate)
        );
      }
      if (selectedOption.value === 'description') {
        return (
          task[selectedOption.value]
            .toLowerCase()
            .indexOf(searchInput.toLowerCase()) !== -1 &&
          moment(task.started_at).isBetween(startDate, endDate)
        );
      }
      if (selectedOption.value === 'name') {
        return (
          task.user[selectedOption.value]
            .toLowerCase()
            .indexOf(searchInput.toLowerCase()) !== -1 &&
          moment(task.started_at).isBetween(startDate, endDate)
        );
      }
      if (selectedOption.value === 'finished_at') {
        return (
          task[selectedOption.value] &&
          moment(task.started_at).isBetween(startDate, endDate)
        );
      }
    });

    return (
      <Container>
        <SearchContainer>
          <SearchBox
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => {
              this.setState({ searchInput: e.target.value });
            }}
          />
          <SelectDate
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => this.setState({ startDate: date })}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
          <span>até</span>
          <SelectDate
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={(date) => this.setState({ endDate: date })}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
          <SelectFilter
            value={selectedOption}
            onChange={this.handleChangeFilter}
            options={options}
            placeholder="Filtre por"
          />
          <CreateTaskButton onClick={this.handleOpenCreateTaskBox}>
            Criar Tarefa
          </CreateTaskButton>
        </SearchContainer>

        {createTask ? (
          <CreateTaskBox>
            <form>
              <h1>Criação de tarefa</h1>
              <Close onClick={() => this.setState({ createTask: false })}>
                x
              </Close>
              <span>Descrição</span>
              <textarea
                value={descriptionTask}
                onChange={this.handleChangeDescription}
              />
              <SelectFilter
                value={selectedUserTask}
                onChange={this.handleChangeUser}
                options={users}
                placeholder="Responsável"
              />
              {error ? <Error>{error}</Error> : null}
              <CreateTaskButton type="button" onClick={this.handleCreateTask}>
                Criar Tarefa
              </CreateTaskButton>
            </form>
          </CreateTaskBox>
        ) : null}

        {createTask ? null : (
          <ContainerBox>
            {filteredTasks.map((task) => (
              <TaskBox key={task.id}>
                <span>Criada em: {this.formatDate(task.started_at)}</span>
                <span>
                  {task.finished_at
                    ? `Finalizada em : ${this.formatDate(task.finished_at)}`
                    : null}
                </span>
                <Description>{task.description}</Description>
                <Footer>
                  <div>
                    Responsavel : <strong>{task.user.name}</strong>
                  </div>
                  <div>
                    Criado por : <strong>{task.creator.name}</strong>
                  </div>

                  {task.finished_at ? (
                    <div>
                      <strong>Tarefa finalizada </strong>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        this.handleFinishTask(task.id);
                      }}
                    >
                      Finalizar tarefa{' '}
                    </button>
                  )}
                </Footer>
              </TaskBox>
            ))}
          </ContainerBox>
        )}
      </Container>
    );
  }
}

export default Tasks;

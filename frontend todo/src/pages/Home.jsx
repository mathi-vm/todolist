import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "../Controller/axiosInstance";
import { BASE_URL } from "../Controller/constant";

import Navbar from "../Components/Navbar";

const Home = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("General");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axiosInstance.get(`${BASE_URL}/api/tasks`);
      setTasks(result.data);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (task.trim()) {
      const newTask = {
        text: task,
        category,
        priority,
        dueDate,
        completed: false,
      };

      try {
        const result = await axiosInstance.post(
          `${BASE_URL}/api/tasks/create`,
          newTask
        );
        setTasks([...tasks, result.data]);
        setTask("");
        setCategory("General");
        setPriority("Low");
        setDueDate(null);
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleDeleteTask = async (_id) => {
    try {
      await axiosInstance.delete(`${BASE_URL}/api/tasks/delete/${_id}`);
      // Remove the deleted note immediately
      setTasks((prevNotes) => prevNotes.filter((task) => task._id !== _id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      console.log("Tasks:", tasks);
      console.log("Task ID:", id);

      // Find the task to toggle
      const taskToToggle = tasks.find((task) => task._id === id);

      console.log("Task to Toggle:", taskToToggle);

      // If the task is not found, log an error and exit
      if (!taskToToggle) {
        console.error("Task not found");
        return;
      }

      // Create the updated task with the toggled completed status
      const updatedTask = {
        ...taskToToggle,
        completed: !taskToToggle.completed,
      };

      const result = await axiosInstance.put(
        `/api/tasks/update/${id}`,
        updatedTask
      );

      setTasks(tasks.map((task) => (task._id === id ? result.data : task)));
    } catch (error) {
      // Log error or show a message
      console.error("Error toggling task completion:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.category === filter;
  });

  return (
    <>
      <Navbar 
      />
      <Container className="mt-5 mb-3 shadow-lg opacity-100">
        <Row className="justify-content-md-center">
          <Col md={8}>
            <h1 className="text-center text-white fw-light">
              <span className="text-warning">ToDay </span>To-Do List
            </h1>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicTask">
                <Form.Control
                  type="text"
                  placeholder="Enter a task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3 text-light fw-light  fs-5"
                controlId="formBasicCategory"
              >
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>General</option>
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Shopping</option>
                  <option>Others</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3 text-light fw-light fs-5"
                controlId="formBasicPriority"
              >
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3 text-white fw-light fs-6 ms-1"
                controlId="formBasicDueDate"
              >
                <Form.Label>Due Date</Form.Label>
                <br />
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="form-control"
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddTask}>
                Add Task
              </Button>
            </Form>
            <Dropdown as={ButtonGroup} className="mt-3">
              <Button variant="secondary">Filter by Category</Button>
              <Dropdown.Toggle
                split
                variant="secondary"
                id="dropdown-split-basic"
              />
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilter("All")}>
                  All
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("General")}>
                  General
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("Work")}>
                  Work
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("Personal")}>
                  Personal
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("Shopping")}>
                  Shopping
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilter("Others")}>
                  Others
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ListGroup className="mt-3 background-image-container">
              {filteredTasks.map((task, index) => (
                <ListGroup.Item
                  key={index}
                  className="background-image-container text-white mt-1 mb-2 ms-2 me-2"
                  style={{ overflowWrap: "break-word" }}
                >
                  <Row>
                    <Col md={1}>
                      <Form.Check
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task._id)}
                      />
                    </Col>
                    <Col md={7}>
                      <span
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.text} - <strong>{task.category}</strong> -{" "}
                        <em>{task.priority}</em>
                      </span>
                      {task.dueDate && (
                        <span className="d-block text-white">
                          Due by: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </Col>
                    <Col md={2}>
                      <Button
                        className="ms-5 mt-2"
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;

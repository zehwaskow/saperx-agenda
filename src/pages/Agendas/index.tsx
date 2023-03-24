import moment from "moment";
import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import "./index.css";

interface Iagenda {
  id: number;
  name: string;
  email: string;
  date_born: Date;
  cpf: string;
  numbers: [
    {
      id: number;
      id_schedule: number;
      number: number;
    }
  ];
}

const Agendas: React.FC = () => {
  const [agendas, setAgendas] = useState<Iagenda[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAgendas();
  }, []);

  async function loadAgendas() {
    const response = await api.get("/schedule");
    setAgendas(response.data.data);
  }

  async function deletePhonebook(id: number) {
    await api.delete(`/schedule/${id}`);
  }

  const formatDate = (date: Date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const newRegister = () => {
    navigate("/agenda_cadastro");
  };

  const editPhoneBook = (id: number) => {
    navigate(`/agenda_cadastro/${id}`);
  };

  return (
    <div className="container">
      <div>
        <h1>Agendas</h1>
        <Button size="sm" className="agendas-button" onClick={newRegister}>
          + Novo Contato
        </Button>
      </div>
      <br />
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendas.map((agenda) => (
            <tr key={agenda.id}>
              <td>{agenda.name}</td>
              <td>{agenda.email}</td>
              <td>{formatDate(agenda.date_born)}</td>
              <td>{agenda.cpf}</td>
              {agenda.numbers.map((num, j) => (
                <td key={num.id}>{num.number}</td>
              ))}
              <td>
                <Button size="sm" onClick={() => editPhoneBook(agenda.id)}>
                  Editar
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deletePhonebook(agenda.id)}
                >
                  Excluir
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Agendas;

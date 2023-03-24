import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

import "./index.css";

type phoneNumber = {
  id: number;
  number: string;
};

interface  Iagenda {
  name: string;
  email: string;
  date_born: Date;
  cpf: string;
  numbers: phoneNumber[];
}

const Agendas: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [agenda, setAgenda] = useState<Iagenda>({
    name: "",
    email: "",
    date_born: new Date(),
    cpf: "",
    numbers: [
      {
        id: 0,
        number: "",
      },
    ],
  });

  useEffect(() => {
    findPhoneBook(id as string);
  }, [id]);

  const addFormFields = () => {
    setAgenda((current) => ({
      ...current,
      numbers: [
        ...current.numbers,
        { id: +current.numbers.length + 1, number: "" },
      ],
    }));
  };

  const removeFormFields = (id: number) => {
    setAgenda((current) => ({
      ...current,
      numbers: current.numbers.filter((phone) => phone.id !== id),
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgenda({
      ...agenda,
      [e.target.name]: e.target.value,
    });
  };

  async function findPhoneBook(id: string) {
    if (id !== undefined) {
      const { data } = await api.get(`/schedule/${id}`);

      setAgenda({ ...(data?.data?.[0] ?? {}) });
    }
  }

  const handleChangePhone = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setAgenda((current) => ({
      ...current,
      numbers: current.numbers.map((phone) =>
        phone.id === id ? { ...phone, number: e.target.value } : phone
      ),
    }));
  };

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (id !== undefined) {
      const response = await  
        api.put(`/schedule/${id}`, {
          ...agenda,
          numbers: agenda.numbers.map(({ number }) => number),
        });
    } else {
      const response = await
        api.post("/schedule", {
          ...agenda,
          numbers: agenda.numbers.map(({ number }) => number),
        });
    }
    back();
  }

  const back = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div>
        <h3>Novo Contato</h3>
        <Button size="sm" className="agendas-button" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={agenda.name}
              placeholder="Insira o nome"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={agenda.email}
              placeholder="Insira o e-mail"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              type="Date"
              name="date_born"
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="number"
              name="cpf"
              placeholder="Insira o CPF"
              value={agenda.cpf}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
          </Form.Group>
          {agenda.numbers.map(({ id, number }) => (
            <Form.Group key={id} className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="string"
                name="telephone"
                placeholder="Insira o Telefone"
                value={number || ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangePhone(e, id)
                }
              />
              {/* {number ? ( */}
              <div>
                <br />
                <Button
                  className="button add"
                  variant="danger"
                  onClick={() => removeFormFields(id)}
                >
                  Excluir Telefone
                </Button>
              </div>
              {/* ) : null} */}
            </Form.Group>
          ))}
          <Button className="button add" onClick={() => addFormFields()}>
            + Telefone
          </Button>
          {"  "}
          <Button variant="success" className="salvar" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Agendas;
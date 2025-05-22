"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Pacientes.module.css";


axios.get("http://localhost:4000/api/pacientes", {
  headers: {
    "x-api-key": "iX4O72aCwd5rd2OsH5dP"
  }
})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Erro:", error.response?.data || error.message);
  });


export default function Pacientes() {
  const [data, setData] = useState({
    pacientes: [],
    loading: true,
    current: 1,
    pageSize: 5,
  });

  const [modalInfo, setModalInfo] = useState({
    visible: false,
    paciente: null,
    exames: [],
    loading: false,
  });

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const { data: pacientes } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/pacientes`,
          { headers: HEADERS }
        );
        setData((d) => ({ ...d, pacientes, loading: false }));
      } catch {
        toast.error("Erro ao carregar pacientes");
        setData((d) => ({ ...d, loading: false }));
      }
    };

    fetchPacientes();
  }, []);

  const openModal = async (paciente) => {
    setModalInfo({
      visible: true,
      paciente,
      exames: [],
      loading: true,
    });

    try {
      const { data: exames } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pacientes/${paciente.id}/exames`,
        { headers: HEADERS }
      );
      setModalInfo((m) => ({ ...m, exames, loading: false }));
    } catch {
      toast.error("Erro ao carregar exames do paciente.");
      setModalInfo((m) => ({ ...m, loading: false }));
    }
  };

  const paginatedPacientes = () => {
    const start = (data.current - 1) * data.pageSize;
    return data.pacientes.slice(start, start + data.pageSize);
  };

  return (
    <div>
      <h1>Lista de Pacientes</h1>

      <Pagination
        current={data.current}
        pageSize={data.pageSize}
        total={data.pacientes.length}
        onChange={(page, size) =>
          setData((d) => ({ ...d, current: page, pageSize: size }))
        }
        showSizeChanger
        pageSizeOptions={["5", "10", "100"]}
      />
      
      {data.loading ? (
        <Image
          src="/images/doctor.gif"
          width={300}
          height={200}
          alt="Loading"
        />
      ) : (
        <div className={styles.cardsContainer}>
          {paginatedPacientes().map((paciente) => (
            <Card
              key={paciente.id}
              className={styles.card}
              hoverable
              onClick={() => openModal(paciente)}
              cover={
                <Image
                  alt={paciente.nome}
                  src={paciente.foto || "/images/220.svg"}
                  width={220}
                  height={220}
                />
              }
            >
              <Card.Meta title={paciente.nome} />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title={`Exames de ${modalInfo.paciente?.nome}`}
        open={modalInfo.visible}
        onCancel={() =>
          setModalInfo({
            visible: false,
            paciente: null,
            exames: [],
            loading: false,
          })
        }
        onOk={() =>
          setModalInfo({
            visible: false,
            paciente: null,
            exames: [],
            loading: false,
          })
        }
        width={600}
      >
        {modalInfo.loading ? (
          <Skeleton active />
        ) : modalInfo.exames.length > 0 ? (
          <div className={styles.avaliacaoInfo}>
            {modalInfo.exames.map((exame, idx) => (
              <div key={idx} className={styles.exameItem}>
                <p>
                  <span className={styles.label}>Nome:</span> {exame.nome}
                </p>
                <p>
                  <span className={styles.label}>Data:</span> {exame.data}
                </p>
                <p>
                  <span className={styles.label}>Tipo:</span> {exame.tipo}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>
            Nenhum exame encontrado para este paciente.
          </p>
        )}
      </Modal>

      <ToastContainer position="top-right" autoClose={4500} />
    </div>
  );
}





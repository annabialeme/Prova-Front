"use client";
import styles from "./Home.module.css";
import {Button, Card, Flex, Typography} from "antd"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
    <Card hoverable className={styles.card}>
        <Flex justify="space-between">
            <div className={styles.imageContainer}>
                <Image src="/images/eu.jpg" alt="Meu nome" fill className={styles.image} />
            </div>
            <Flex vertical align="flex-end" justify="space-around">
                <div>
                    <Typography.Title level={5} type="sucess"></Typography.Title>
                    <ul className={styles.list}>
                    <h1>Anna Beatriz Leme Alves</h1>
                        <li>Turma: 2TDS1</li>
                        <li>Docentes: Thiago e Marcelo</li>
                        <li>NEXT.JS FRONT-END 1</li>
                        <p > Essa é uma atividade de Front-End, com o propósito de consumir uma API de Exames e Pacientes, fazendo com que Pacientes tenha relacionamento com Exames. Aqui eu uso as melhores práticas de desenvolvimento web.
                        </p>     
                    </ul>
                    </div>
                    <Link href="/pacientes" prefetch>
                    <Button type="primary">Acessar minha Tabela Principal</Button>
                    </Link>
                </Flex>
                </Flex>
                </Card>
    )
}
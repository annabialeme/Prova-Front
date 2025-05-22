'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [pacientes, setExames] = useState([]);
  const apiKey = 'i604eo3hJFpG';
  const headers = { 'x-api-key': apiKey };

  useEffect(() => {
    const fetchComCache = async () => {
      const cacheKey = 'pacientesData';
      const cache = sessionStorage.getItem(cacheKey);

      if (cache) {
        setPacientes(JSON.parse(cache));
        return;
      }

      try {
        const resposta = await axios.get('http://localhost:3000/api/pacientes', { headers });
        setPacientes(resposta.data);
        sessionStorage.setItem(cacheKey, JSON.stringify(resposta.data));
      } catch (erro) {
        alert('Erro ao buscar pacientes');
      }
    };

    fetchComCache();
  }, []);

}
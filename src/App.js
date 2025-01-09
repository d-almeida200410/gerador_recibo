import React, { useState } from 'react';
import './App.css';
import corujaImage from './assets/sabedoria.png';
import jsPDF from 'jspdf';

function ContactForm() {
  const [formData, setFormData] = useState({
    aluno: '',
    mes: '',
    vencimento: '',
    pagamento: '',
    vezesSemana: '',
    diasSemana: '',
    valorPagamento: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateFormat = (e) => {
    const { name, value } = e.target;
    let formattedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
    if (formattedValue.length > 10) {
      formattedValue = formattedValue.slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handlePaymentFormat = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2);
    value = value.replace('.', ',');
    setFormData((prev) => ({ ...prev, valorPagamento: `R$ ${value}` }));
  };

  const clearFields = () => {
    setFormData({
      aluno: '',
      mes: '',
      vencimento: '',
      pagamento: '',
      vezesSemana: '',
      diasSemana: '',
      valorPagamento: '',
    });
  };

  const generatePDF = () => {
    // Verificar se todos os campos estão preenchidos
    const requiredFields = [
      formData.aluno,
      formData.mes,
      formData.vencimento,
      formData.pagamento,
      formData.vezesSemana,
      formData.diasSemana,
      formData.valorPagamento,
    ];
  
    // Verificar se algum campo está vazio
    const isFormComplete = requiredFields.every(field => field !== '');
  
    if (!isFormComplete) {
      alert('Por favor, preencha todos os campos antes de gerar o PDF.');
      return;
    }
  
    const doc = new jsPDF();
    doc.setFont('helvetica', 'normal');
  
    // Adicionando a imagem
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(corujaImage, 'PNG', 80, 10, imgWidth, imgHeight);
  
    // Título
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255);
    doc.text('Recibo de Pagamento \n Rever e Aprender', 105, 70, { align: 'center' });
  
    // Conteúdo
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.text(`____________________________________________________________________________________________________`, 20, 80);
    doc.text(`Aluno: ${formData.aluno}`, 20, 90);
    doc.text(`Mês: ${formData.mes}`, 20, 100);
    doc.text(`Data de Vencimento: ${formData.vencimento}`, 20, 110);
    doc.text(`Data de Pagamento: ${formData.pagamento}`, 20, 120);
    doc.text(`Vezes na Semana: ${formData.vezesSemana}`, 20, 130);
    doc.text(`Dias da Semana: ${formData.diasSemana}`, 20, 140);
    doc.text(`Valor do Pagamento: ${formData.valorPagamento}`, 20, 150);
    doc.text(`__________________________________________________________________________________________________`, 20, 160);
  
    // CNPJ da empresa
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('CNPJ: 19.848.909/0001-22', 20, 170);
  
    doc.save('recibo_pagamento.pdf');
  };

  return (
    <div className="container">
      <div className="text">
        <div className="coruja">
          <img
            src={corujaImage}
            alt="Coruja"
            style={{ width: '150px', height: '150px', marginBottom: '10px' }}
          />
        </div>
      </div>

      <div className="text">Recibo de Pagamento</div>
      <form>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="aluno"
              value={formData.aluno}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            <label>Nome Aluno(a):</label>
          </div>
          <div className="input-data">
            <select
              name="mes"
              value={formData.mes}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              {[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ].map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <div className="underline"></div>
            <label>Mês:</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="vencimento"
              value={formData.vencimento}
              onChange={handleDateFormat}
              required
            />
            <div className="underline"></div>
            <label>Data de Vencimento:</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="pagamento"
              value={formData.pagamento}
              onChange={handleDateFormat}
              required
            />
            <div className="underline"></div>
            <label>Data de Pagamento:</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              type="number"
              name="vezesSemana"
              value={formData.vezesSemana}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            <label>Vezes na Semana:</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="diasSemana"
              value={formData.diasSemana}
              onChange={handleChange}
              required
            />
            <div className="underline"></div>
            <label>Dias da Semana:</label>
          </div>
          <div className="input-data">
            <input
              type="text"
              name="valorPagamento"
              value={formData.valorPagamento}
              onChange={handlePaymentFormat}
              required
            />
            <div className="underline"></div>
            <label>Valor do Pagamento:</label>
          </div>
        </div>
        <div className="gerar">
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <button type="button" onClick={generatePDF}>
                Gerar PDF
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="input-data">
              <button type="button" onClick={clearFields}>
                Limpar Campos
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;

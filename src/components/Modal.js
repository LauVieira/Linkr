import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

ReactModal.setAppElement("body");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#333333",
    borderRadius: "20px",
    margin: "20px 50px",
    margin: "0 auto",
    padding: "20px 50px",
  },
};

export default function Modal({
  modalIsOpen,
  setModalIsOpen,
  Delete,
  isLoading,
}) {

  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel='Delete Modal'
    >
      {isLoading 
        ? <h1>Loading...</h1> 
        : <>
            <Title>
              Tem certeza que deseja excluir essa publicação?
            </Title>

            <ButtonsContainer>
              <BackButton onClick={() => setModalIsOpen(!modalIsOpen)}>
                Não, voltar
              </BackButton>

              <DeleteButton onClick={Delete}>
                Sim, excluir
              </DeleteButton>
            </ButtonsContainer>
          </>
      }
    </ReactModal>
  );
}

const Title = styled.h1`
  color: white;
  font: 700 34px 'Lato', sans-serif;
`;

const ButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-evenly;
  margin: 30px;
`;

const BackButton = styled.button`
  background: white;
  border: none;
  border-radius: 5px;
  color: #1877F2;
  cursor: pointer;
  outline: none;
  padding: 5px 20px;

`;

const DeleteButton = styled.button`
  background: #1877F2;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  outline: none;
  padding: 5px 20px;
`;

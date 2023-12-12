import styled from "styled-components";

export const InputContainer = styled.div`
  background: var(--primary-light-bg);
  text-align: left;
  padding: 20px 10px;
  border-radius: 4px;
`;
export const LabelInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const Select = styled.select`
  border-radius: 4px;
  border: 1px solid var(--primary);
  width: 70%;
  display: inline-block;
  padding: 0px 8px;
`;
export const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: 1px solid grey;
  background: transparent;
  align-items: flex-end;
  width: 70%;
  &:focus {
    border-bottom-color: var(--primary);
  }
`;
export const ButtonCancel = styled.button`
  border: none;
  color: var(--primary);
  background: transparent;
  font-weight: 700;
  border-radius: 4px;
  padding: 8px 12px;
  width: 80px;
  margin-right: 6px;
`;
export const ButtonSave = styled.button`
  border: none;
  color: var(--white);
  background: var(--primary);
  font-weight: 700;
  border-radius: 4px;
  padding: 8px 12px;
  width: 80px;
  margin-right: 6px;
`;
export const ButtonDelete = styled.button`
  border: none;
  color: var(--primary);
  background: transparent;
  font-weight: 700;
  border-radius: 4px;
  padding: 8px 12px;
  width: 80px;
  margin-right: 6px;
`;
export const Title = styled.h2`
  color: var(--primary);
  text-align: center;
`;

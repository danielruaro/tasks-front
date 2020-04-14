import styled from 'styled-components';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

export const SelectFilter = styled(Select)`
  display: inline-block;
  width: 200px;
  margin-bottom: 15px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 3px;
  padding-left: 10px;
  height: 46px;
`;

export const SearchContainer = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;

  span {
    margin: 0 5px;
    font-size: 20px;
    color: white;
  }
`;

export const SelectDate = styled(DatePicker)`
  width: 100px;
  margin-bottom: 15px;
  height: 40px;
  margin-left: 5px;
  font-size: 18px;
  border-radius: 5px;
`;

export const SearchBox = styled.input`
  flex: 1;
  height: 40px;
  margin-bottom: 15px;
  padding: 15px 20px;
  color: #777;
  font-size: 15px;
  width: 500px;
  border: 1px solid #ddd;
  &::placeholder {
    color: #999;
  }
`;

export const Container = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const ContainerBox = styled.div`
  flex-wrap: wrap;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Error = styled.div`
  color: red;
`;

export const TaskBox = styled.div`
  display: flex;
  margin-left: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  flex-direction: column;
  border-radius: 20px;
  width: 400px;
  padding: 20px;
  height: 200px;
  font-size: 10px;
  border: 2px solid black;

  div {
    strong {
      text-align: center;
      font-size: 15px;
    }
  }
`;

export const Title = styled.h1`
  display: flex;
  font-size: 25px;
  border-bottom-width: 1px;
  border-color: #eee;
  margin-bottom: 5px;
`;

export const Close = styled.button`
  position: absolute;
  margin-left: 29%;
  width: 25px;
  color: black;
  border: none;
  background-color: white;
  font-weight: 300;
`;
export const Description = styled.span`
  display: flex;
  border-bottom-width: 1px;
  border-color: #eee;
  margin-bottom: auto;
  font-size: 20px;
`;

export const CreateTaskBox = styled.div`
  width: 600px;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 5px;

  h1 {
    padding-top: 3px;
    padding-bottom: 3px;
  }

  span {
    padding-left: 4px;
  }

  form {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 6px;
    padding: 5px;

    label {
      margin: 10px;
    }
    textarea {
      width: 400px;
      margin: 4px;
      height: 200px;
    }
  }
`;

export const CreateTaskButton = styled.button`
  justify-content: flex-end;
  align-self: flex-end;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  margin-left: 40px;
  font-size: 16px;
  background: #02ba7d;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 8px;
`;

export const Footer = styled.span`
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  border-bottom-width: 1px;
  border-color: #eee;

  div {
    display: block !important;
    vertical-align: middle;
    margin: 2px 10px;
  }

  button {
    justify-content: flex-end;
    align-self: flex-end;
    padding: 10px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border: none;
    color: white;
    border-radius: 8px;
    float: right;
    background-color: #02ba7d;
    margin-left: auto;
  }
`;

import { useState } from "react";
import { Paper, Button, TextField } from "@mui/material";
import { EmployeeRegisterContainerProps } from "./EmployeeRegisterContainer";
import { EmployeeRegister } from "@/models/Employee";

interface EmployeeRegisterProps {
  onSubmit: (props: EmployeeRegisterContainerProps) => Promise<void>;
}

export function EmployeeRegisterItem({ onSubmit }: EmployeeRegisterProps) {
  const [nameValue, setNameValue] = useState("");
  const [ageValue, setAgeValue] = useState(0);
  const [affiliationValue, setAffiliationValue] = useState("");
  const [positionValue, setPositionValue] = useState("");

  const handleSubmit = async () => {
    if (!nameValue || ageValue <= 0 || !affiliationValue || !positionValue) {
      alert("すべての項目を入力してください。年齢は1以上で入力してください。");
      return;
    }

    const employeeDataToRegister: EmployeeRegister = {
      name: nameValue,
      age: ageValue,
      affiliation: affiliationValue,
      position: positionValue,
      skills: [],
    };

    onSubmit({
      employeeRegister: employeeDataToRegister,
    });
  };

  return (
    <Paper sx={{ p: 4, mx: "auto", mt: 4 }}>
      <h2>社員登録</h2>
      <TextField
        fullWidth
        label="名前"
        name="name"
        placeholder="名前を入力してください"
        type="text"
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="年齢"
        name="age"
        type="number"
        value={ageValue === 0 ? "" : ageValue}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setAgeValue(isNaN(value) ? 0 : value);
        }}
        margin="normal"
      />
      <TextField
        fullWidth
        label="所属"
        name="affiliation"
        placeholder="所属部署を入力してください"
        type="text"
        value={affiliationValue}
        onChange={(e) => setAffiliationValue(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="役職"
        name="position"
        placeholder="役職を入力してください"
        type="text"
        value={positionValue}
        onChange={(e) => setPositionValue(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        登録
      </Button>
    </Paper>
  );
}

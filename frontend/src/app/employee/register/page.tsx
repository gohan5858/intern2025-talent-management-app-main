import { EmployeeRegisterContainer } from "@/components/EmployeeRegisterContainer";
import { GlobalContainer } from "@/components/GlobalContainer";

export default function EmployeeRegisterPage() {
  return (
    <GlobalContainer pageName={"社員登録"}>
      <EmployeeRegisterContainer />
    </GlobalContainer>
  );
}

import { BackButton } from "@/components/BackButton";
import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from "react";

export default function EmployeePage() {
  return (
      <GlobalContainer pageName={"社員詳細"}>
        {/* Mark EmployeeDetailsContainer as CSR */}
        <Suspense>
          <EmployeeDetailsContainer />
        </Suspense>
        <BackButton text={"検索画面に戻る"} />
      </GlobalContainer>
  );
}

import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from 'react';

export default function EmployeePage() {
  return (
    <GlobalContainer pageName={"社員検索"}>
      { /* Mark EmployeeDetailsContainer as CSR */ }
      <Suspense>
        <EmployeeDetailsContainer />
      </Suspense>
    </GlobalContainer>
  );
}

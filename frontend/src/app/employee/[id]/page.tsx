import { BackButton } from "@/components/BackButton";
import { EmployeeDetailsContainer } from "@/components/EmployeeDetailsContainer";
import { GlobalContainer } from "@/components/GlobalContainer";
import { Suspense } from "react";

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>; // 非同期で取得する
}) {
  const { id } = await params;

  return (
    <GlobalContainer pageName={"社員詳細"}>
      {/* Mark EmployeeDetailsContainer as CSR */}
      <Suspense>
        <EmployeeDetailsContainer id={id} />
      </Suspense>
      <BackButton text={"検索画面に戻る"} />
    </GlobalContainer>
  );
}

import { SearchEmployees } from "../components/SearchEmployees";
import { GlobalContainer } from "@/components/GlobalContainer";

export default function Home() {
  return (
    <GlobalContainer pageName={"社員詳細"}>
      <SearchEmployees />
    </GlobalContainer>
  );
}

import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Employee } from "@/models/Employee";
import { EmployeeDetails } from "@/components/EmployeeDetails";

describe("EmployeeDetails", () => {
  beforeEach(() => {
    const employee = {
      id: "3",
      name: "山田 太郎",
      age: 27,
      affiliation: "開発",
      position: "一般",
    } as Employee;

    render(<EmployeeDetails employee={employee} />);
  });

  it("従業員名が表示されているか", () => {
    expect(screen.getByText("山田 太郎")).toBeVisible();
  });

  it("年齢が表示されているか", () => {
    expect(screen.getByText(/27歳/)).toBeVisible();
  });

  it("所属，役職が表示されているか", () => {
    expect(screen.getByText(/開発/)).toBeVisible();
    expect(screen.getByText(/一般/)).toBeVisible();
  });

  it("タブの切り替えができるか", () => {
    const button = screen.getByRole("tab", { name: /その他/ });
    expect(button).toBeVisible();

    fireEvent.click(button);

    expect(screen.getByText(/27歳/)).not.toBeVisible();
  });
});

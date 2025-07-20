import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { EmployeeListItem } from "@/components/EmployeeListItem";
import { Employee } from "@/models/Employee";

type ViewModeType = "list" | "card";

describe.each([["list" as ViewModeType], ["card" as ViewModeType]])(
  "EmployeeListItem",
  (viewMode: ViewModeType) => {
    beforeEach(() => {
      const employee = {
        id: "3",
        name: "山田 太郎",
        age: 27,
        affiliation: "開発",
        position: "一般",
      } as Employee;

      render(<EmployeeListItem employee={employee} viewMode={viewMode} />);
    });

    it(`従業員名が表示されているか (${viewMode})`, () => {
      expect(screen.getByText("山田 太郎")).toBeVisible();
    });

    it(`年齢が表示されているか (${viewMode})`, () => {
      expect(screen.getByText(/27歳/)).toBeVisible();
    });

    it(`所属，役職が表示されているか (${viewMode})`, () => {
      expect(screen.getByText(/開発/)).toBeVisible();
      expect(screen.getByText(/一般/)).toBeVisible();
    });

    it(`従業員詳細ページへのリンクが設定されているか (${viewMode})`, () => {
      const linkElement = screen.getByRole("link");
      expect(linkElement).toBeVisible();

      const url = linkElement.getAttribute("href");
      expect(url).toBe("/employee?id=3");
    });
  }
);

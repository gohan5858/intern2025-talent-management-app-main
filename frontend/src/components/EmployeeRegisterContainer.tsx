"use client"
import { EmployeeRegister, EmployeeRegisterT, EmployeeT } from "@/models/Employee";
import { isLeft } from "fp-ts/Either";
import { EmployeeRegisterItem } from "./EmployeeRegisterItem";
import { Box } from "@mui/material";

export interface EmployeeRegisterContainerProps {
  employeeRegister: EmployeeRegister
}

async function calculateSha256HashBrowser(data: string): Promise<string> {
  const textEncoder = new TextEncoder();
  const dataBuffer = textEncoder.encode(data); // 文字列をUint8Arrayにエンコード

  // crypto.subtle.digest でSHA-256ハッシュを計算
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);

  // ArrayBufferを16進数文字列に変換
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hexHash;
}

const employeeRegisterFetcher = async (props: EmployeeRegisterContainerProps): Promise<void> => {
  const result = EmployeeRegisterT.decode(props.employeeRegister);
  if (isLeft(result)) {
    throw new Error(`Failed to decode employee register ${JSON.stringify(props)}`);
  }
  const reqBody = JSON.stringify(result.right);
  const hashedBody = await calculateSha256HashBrowser(reqBody);
  const request = new Request("/api/employees/register", {
    method: "POST",
    body: reqBody,
    headers: {
      "Content-Type": "application/json",
      "x-amz-content-sha256": hashedBody,
    },
  });

  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(`Failed to register employee at ${request.url}`);
  }

  const body = await response.json();
  const decoded = EmployeeT.decode(body);
  if (isLeft(decoded)) {
    throw new Error(`Failed to decode registered employee ${JSON.stringify(body)}`);
  }
  alert("登録が完了しました");
  window.location.href = `/`
}

export function EmployeeRegisterContainer() {

  return (
    <Box>
      <EmployeeRegisterItem onSubmit={employeeRegisterFetcher}/>
    </Box>
  )
}
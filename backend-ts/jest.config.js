import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export const testEnvironment = "node";
export const transform = {
  ...tsJestTransformCfg,
};

export const testPathIgnorePatterns = [
  "<rootDir>/node_modules/",
  "<rootDir>/out/",
];

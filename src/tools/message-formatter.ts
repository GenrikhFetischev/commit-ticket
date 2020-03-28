import getBranchName from "current-git-branch";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

import { configReader } from "./config-reader";

type MessageFormatterTool = (pathToCommitMessage: string) => void;

type MessageFormatter = (
  success: () => never,
  fail: (e: Error) => never
) => MessageFormatterTool;

const getCommitMessage = (pathToCommitMessage: string): string => {
  const messagePath: string = resolve(pathToCommitMessage);
  return readFileSync(messagePath, "utf-8");
};

const processCommitMessage = (
  pathToCommitMessage: string,
  success: () => never,
  fail: (e: Error) => never
): void => {
  const {
    branchPattern: branchPatternString,
  } = configReader(fail);
  const message = getCommitMessage(pathToCommitMessage);
  const branchName = getBranchName();

  const branchPattern = new RegExp(branchPatternString);

  const branch = String(branchName).match(branchPattern);

  console.log('!!!!!!!!!!!');

  console.log(branchName);
  console.log(branchPattern);
  console.log(branch);

  if (branch === null) {
    success();
  }

  const [, ticket] = branch;

  console.log(ticket);

  if (message.includes(ticket)) {
    success();
  }

  const commitMessage = `[${ticket}] ${message.replace(/\n$/g, "")}`;
  writeFileSync(pathToCommitMessage, commitMessage, "utf-8");
  success();
};

const messageFormatter: MessageFormatter = (success, fail) => (
  pathToCommitMessage
) => {
  try {
    processCommitMessage(pathToCommitMessage, success, fail);
  } catch (e) {
    fail(e);
  }
};

export default messageFormatter;

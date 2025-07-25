import { useState } from "react";
import React from "react";
import './styles.css';

export type FileData = Readonly<{
  id: number;
  name: string;
  children?: ReadonlyArray<FileData>;
}>;

export default function FileExplorer({
  data,
}: Readonly<{ data: ReadonlyArray<FileData> }>) {
  return (
    <div>
      <FileList fileList={data} level={1} />
    </div>
  );
}

export function FileObject({
  file,
  level,
}: Readonly<{ file: FileData; level: number }>) {
  const [expanded, setExpanded] = useState(false);
  const { children: fileChildren, name: fileName } = file;
  // If the children field is present, the item is a directory.
  const isDirectory = Boolean(fileChildren);

  return (
    <li className="file-item">
      <button
        className={[
          "file-item-button",
          isDirectory && "file-item-button--directory",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => {
          if (!isDirectory) {
            return;
          }

          setExpanded(!expanded);
        }}
      >
        <span>{fileName}</span> {isDirectory && <>[{expanded ? "-" : "+"}]</>}
      </button>
      {fileChildren && fileChildren.length > 0 && expanded && (
        <FileList fileList={fileChildren} level={level + 1} />
      )}
    </li>
  );
}

function FileList({
  fileList,
  level,
}: Readonly<{
  fileList: ReadonlyArray<FileData>;
  level: number;
}>) {
  const directories = fileList.filter(
    (fileItem) => fileItem.children,
  );
  directories.sort((a, b) => a.name.localeCompare(b.name));

  const nonDirectories = fileList.filter(
    (fileItem) => !fileItem.children,
  );
  nonDirectories.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const items = [...directories, ...nonDirectories];

  return (
    <ul className="file-list">
      {items.map((file) => (
        <FileObject
          key={file.id}
          file={file}
          level={level}
        />
      ))}
    </ul>
  );
}
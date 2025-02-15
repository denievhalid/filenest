import { FileList } from "@/features/File";
import { Page } from "@/components/Page";
import { useSetFolder } from "@/hooks";

export const FileView = () => {
  useSetFolder("file");

  return (
    <FileList.Wrapper>
      <FileList.Header>
        <Page.Title>Файлы</Page.Title>
        <FileList.Toolbar />
      </FileList.Header>
      <FileList.Table
        emptyDescription="Вы не добавили ни одного элемента"
        emptyTitle="Эта папка пуста"
      />
    </FileList.Wrapper>
  );
};

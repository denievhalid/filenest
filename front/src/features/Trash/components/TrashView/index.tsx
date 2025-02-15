import { FileList } from "@/features/File";
import { Page } from "@/components/Page";
import { useSetFolder } from "@/hooks";

export const TrashView = () => {
  useSetFolder("trash");

  return (
    <FileList.Wrapper>
      <FileList.Header>
        <Page.Title>Корзина</Page.Title>
        <FileList.TrashClear />
      </FileList.Header>
      <FileList.Table
        emptyDescription="Переместите ненужные файлы в Корзину"
        emptyTitle="Корзина пуста"
        showActions={false}
      />
    </FileList.Wrapper>
  );
};

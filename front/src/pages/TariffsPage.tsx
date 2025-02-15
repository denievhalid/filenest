import { Button } from "@/components/ui/button.tsx";

export const TariffsPage = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-semibold">Тарифы</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="border border-[#f6f6f6] p-4 rounded-xl col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl">+100 ГБ</h2>
            <p className="text-xs text-[#3D9951]">79 ₽ / месяц</p>
          </div>
          <Button variant="outline">Подключить</Button>
        </div>
        <div className="border border-[#f6f6f6] p-4 rounded-xl col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl">+1 ТБ</h2>
            <p className="text-xs text-[#3D9951]">229 ₽ / месяц</p>
          </div>
          <Button variant="outline">Подключить</Button>
        </div>
        <div className="border border-[#f6f6f6] p-4 rounded-xl col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl">+2 ТБ</h2>
            <p className="text-xs text-[#3D9951]">499 ₽ / месяц</p>
          </div>
          <Button variant="outline">Подключить</Button>
        </div>
      </div>
    </div>
  );
};
